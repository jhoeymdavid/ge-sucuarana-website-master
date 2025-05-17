import { useState, useRef, useEffect } from 'react'
import { Box, Container, Typography, Paper, Tabs, Tab, Button, Grid, Card, CardMedia, CardActions, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import { TextField } from '@mui/material';

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
                <Button variant="contained" color="primary">
                  Nova Notícia
                </Button>
              </Box>
              {/* TODO: Implementar lista de notícias e formulário de edição */}
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