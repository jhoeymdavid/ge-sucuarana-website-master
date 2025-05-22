import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Chip,
  OutlinedInput,
  SelectChangeEvent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Editor } from '@tinymce/tinymce-react';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const ImagePreview = styled('img')({
  width: '100%',
  maxHeight: '300px',
  objectFit: 'contain',
  marginTop: '10px',
  marginBottom: '10px',
});

interface NewsFormProps {
  onSuccess?: () => void;
  newsToEdit?: {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    status: string;
    image?: string;
  } | null;
}

const NewsForm = ({ onSuccess, newsToEdit }: NewsFormProps) => {
  const [title, setTitle] = useState(newsToEdit?.title || '');
  const [content, setContent] = useState(newsToEdit?.content || '');
  const [tags, setTags] = useState<string[]>(newsToEdit?.tags || []);
  const [status, setStatus] = useState(newsToEdit?.status || 'draft');
  const [imagePreview, setImagePreview] = useState<string | null>(newsToEdit?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Atualizar o formulário quando newsToEdit mudar
  useEffect(() => {
    if (newsToEdit) {
      setTitle(newsToEdit.title);
      setContent(newsToEdit.content);
      setTags(newsToEdit.tags);
      setStatus(newsToEdit.status);
      setImagePreview(newsToEdit.image || null);
    } else {
      // Limpar o formulário se não houver notícia para editar
      setTitle('');
      setContent('');
      setTags([]);
      setStatus('draft');
      setImagePreview(null);
    }
  }, [newsToEdit]);

  const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
    const { target: { value } } = event;
    setTags(typeof value === 'string' ? value.split(',') : value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Título e conteúdo são obrigatórios');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('status', status);
    
    if (tags.length > 0) {
      formData.append('tags', tags.join(','));
    }

    if (fileInputRef.current?.files?.[0]) {
      formData.append('image', fileInputRef.current.files[0]);
    }

    try {
      const token = localStorage.getItem('token');
      
      // Determinar se estamos criando ou atualizando
      const isEditing = !!newsToEdit;
      const url = isEditing 
        ? `http://localhost:5000/api/news/${newsToEdit?._id}` 
        : 'http://localhost:5000/api/news';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        // Limpar formulário se não estiver editando
        if (!isEditing) {
          setTitle('');
          setContent('');
          setTags([]);
          setStatus('draft');
          setImagePreview(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
        
        // Notificar sucesso
        alert(isEditing ? 'Notícia atualizada com sucesso!' : 'Notícia criada com sucesso!');
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || `Erro ao ${isEditing ? 'atualizar' : 'criar'} notícia`);
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormPaper>
      <Typography variant="h6" gutterBottom>
        {newsToEdit ? 'Editar Notícia' : 'Nova Notícia'}
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Título da Notícia"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Conteúdo
        </Typography>
        <Editor
          apiKey="your-api-key-here" // Você precisará obter uma chave API gratuita em https://www.tiny.cloud/
          value={content}
          onEditorChange={(newCont ent) => setContent(newContent)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="tags-label">Tags</InputLabel>
          <Select
            labelId="tags-label"
            id="tags"
            multiple
            value={tags}
            onChange={handleTagsChange}
            input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {['Escoteiros', 'Eventos', 'Atividades', 'Comunicados', 'Geral'].map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="draft">Rascunho</MenuItem>
            <MenuItem value="published">Publicado</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ mt: 2 }}
        >
          Anexar Imagem
          <input
            type="file"
            hidden
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </Button>

        {imagePreview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Pré-visualização da imagem:
            </Typography>
            <ImagePreview src={imagePreview} alt="Preview" />
          </Box>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : newsToEdit ? 'Atualizar Notícia' : 'Salvar Notícia'}
        </Button>
      </Box>
    </FormPaper>
  );
};

export default NewsForm;