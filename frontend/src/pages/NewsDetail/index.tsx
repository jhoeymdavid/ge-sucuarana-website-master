import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip, Divider, CircularProgress, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image?: string;
  publishDate: string;
  author: {
    _id: string;
    name: string;
  };
  tags: string[];
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:5000/api/news/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setNews(data);
        } else {
          setError(data.message || 'Erro ao carregar notícia');
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const handleBack = () => {
    navigate('/noticias');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !news) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
          Voltar para notícias
        </Button>
        <Typography color="error">{error || 'Notícia não encontrada'}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
        Voltar para notícias
      </Button>

      <Paper elevation={2} sx={{ p: 3 }}>
        {news.image && (
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <img 
              src={news.image} 
              alt={news.title} 
              style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }} 
            />
          </Box>
        )}

        <Typography variant="h4" component="h1" gutterBottom>
          {news.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
          <Typography variant="body2">
            {format(new Date(news.publishDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </Typography>
          {news.author && (
            <Typography variant="body2" sx={{ ml: 1 }}>
              • Por {news.author.name}
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          {news.tags && news.tags.map((tag) => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small" 
              sx={{ mr: 0.5, mb: 0.5 }} 
            />
          ))}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box 
          sx={{ typography: 'body1' }} 
          dangerouslySetInnerHTML={{ __html: news.content }} 
        />
      </Paper>
    </Container>
  );
};

export default NewsDetail;