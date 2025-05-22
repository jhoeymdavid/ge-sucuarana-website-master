import { useState, useRef, useEffect } from 'react'
import { Box, Container, Typography, Paper, Tabs, Tab, Button, Grid, Card, CardMedia, CardContent, CardActions, IconButton, CircularProgress, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TextField } from '@mui/material';
import NewsForm from '../NewsForm'

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.custom.lightGray,
  minHeight: '100vh',
}))

const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
}))

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<{ _id: string, filename: string, name: string }[]>([])
  const [loadingImages, setLoadingImages] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageName, setImageName] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', imageName);

    try {
        const response = await fetch('http://localhost:5000/api/gallery/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const data = await response.json();
        if (response.ok) {
            alert('Imagem enviada com sucesso!');
            setImageName(''); 
            fetchImages();
        } else {
            alert(data.message || 'Erro ao enviar imagem.');
        }
    } catch (err) {
        alert('Erro ao conectar com o servidor.');
    } finally {
        setUploading(false);
    }
}

  const fetchImages = async () => {
    setLoadingImages(true)
    try {
      const response = await fetch('http://localhost:5000/api/gallery/')
      const data = await response.json()
      if (response.ok) {
        setImages(data.images)
      } else {
        alert(data.message || 'Erro ao buscar imagens.')
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.')
    } finally {
      setLoadingImages(false)
    }
  }

  const handleDeleteImage = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover esta imagem?')) return
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        setImages(prev => prev.filter(img => img._id !== id))
      } else {
        const data = await response.json()
        alert(data.message || 'Erro ao remover imagem.')
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.')
    }
  }

  useEffect(() => {
    if (currentTab === 2) {
      fetchImages()
    }
    // eslint-disable-next-line
  }, [currentTab])

  // Estado e funções para gerenciar notícias
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const fetchNewsList = async () => {
    setLoadingNews(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/news', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setNewsList(data);
      } else {
        alert(data.message || 'Erro ao buscar notícias.');
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    } finally {
      setLoadingNews(false);
    }
  };
  
  const handleEditNews = (news: any) => {
    setSelectedNews(news);
    setIsEditing(true);
  };
  
  const handleDeleteNews = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta notícia?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        alert('Notícia excluída com sucesso!');
        fetchNewsList();
      } else {
        const data = await response.json();
        alert(data.message || 'Erro ao excluir notícia.');
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    }
  };
  
  // Componente para listar notícias
  const NewsList = () => {
    useEffect(() => {
      fetchNewsList();
    }, []);
    
    if (loadingNews) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      );
    }
    
    if (newsList.length === 0) {
      return <Typography>Nenhuma notícia encontrada.</Typography>;
    }
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Notícias Existentes
        </Typography>
        <Grid container spacing={2}>
          {newsList.map((news) => (
            <Grid item xs={12} sm={6} md={4} key={news._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {news.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={news.image}
                    alt={news.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" noWrap>
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {news.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton 
                    aria-label="editar" 
                    onClick={() => handleEditNews(news)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    aria-label="excluir" 
                    onClick={() => handleDeleteNews(news._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Painel Administrativo
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Notícias" />
            <Tab label="Eventos" />
            <Tab label="Galeria" />
            <Tab label="Configurações" />
          </Tabs>
        </Paper>

        <ContentPaper>
          {currentTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">Gerenciar Notícias</Typography>
              </Box>
              
              {/* Lista de notícias existentes */}
              {!isEditing && <NewsList />}
              
              {isEditing ? (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">Editar Notícia</Typography>
                    <Button 
                      variant="outlined" 
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedNews(null);
                      }}
                    >
                      Cancelar Edição
                    </Button>
                  </Box>
                  <NewsForm 
                    newsToEdit={selectedNews} 
                    onSuccess={() => {
                      fetchNewsList();
                      setIsEditing(false);
                      setSelectedNews(null);
                    }} 
                  />
                </Box>
              ) : (
                <>
                  <Divider sx={{ my: 4 }} />
                  
                  <Typography variant="h6" gutterBottom>
                    Adicionar Nova Notícia
                  </Typography>
                  <NewsForm onSuccess={() => fetchNewsList()} />
                </>
              )}
            </Box>
          )}

          {currentTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">Gerenciar Eventos</Typography>
                <Button variant="contained" color="primary">
                  Novo Evento
                </Button>
              </Box>
              {/* TODO: Implementar lista de eventos e formulário de edição */}
            </Box>
          )}

          {currentTab === 2 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">Gerenciar Galeria</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleButtonClick}
                  disabled={uploading || imageName === ''}
                >
                  {uploading ? 'Enviando...' : 'Upload de Imagem'}
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </Box>
              <TextField
                fullWidth
                label="Nome da imagem"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                sx={{ mb: 3 }}
              />
              {/* Grid de imagens */}
              {loadingImages ? (
                <Typography>Carregando imagens...</Typography>
              ) : (
                <Grid container spacing={2}>
                  {images.map(img => (
                    <Grid item xs={12} sm={6} md={3} key={img._id}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`http://localhost:5000/api/gallery/${img._id}`}
                          alt={img.filename}
                        />
                        <CardActions>
                          <IconButton
                            aria-label="remover"
                            onClick={() => handleDeleteImage(img._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {img.name} 
                          </Typography>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {currentTab === 3 && (
            <Box>
              <Typography variant="h5" gutterBottom>Configurações do Site</Typography>
              {/* TODO: Implementar formulário de configurações */}
            </Box>
          )}
        </ContentPaper>
      </Container>
    </DashboardContainer>
  )
}

export default AdminDashboard