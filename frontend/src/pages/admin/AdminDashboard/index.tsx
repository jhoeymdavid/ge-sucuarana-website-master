import { useState, useRef } from 'react'
import { Box, Container, Typography, Paper, Tabs, Tab, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect } from 'react'
import { Grid, Card, CardMedia, CardActions, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

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
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://localhost:5000/api/gallery/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      const data = await response.json()
      if (response.ok) {
        alert('Imagem enviada com sucesso!')
        // Aqui você pode atualizar a lista de imagens, se desejar
      } else {
        alert(data.message || 'Erro ao enviar imagem.')
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.')
    } finally {
      setUploading(false)
    }
  }

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
                  disabled={uploading}
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
                            {img.filename}
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

const handleUpload = async (file: File) => {
  const token = localStorage.getItem('token')
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch('http://localhost:5000/api/gallery/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
      // Não inclua 'Content-Type' ao usar FormData!
    },
    body: formData
  })

  const data = await response.json()
  if (response.ok) {
    alert('Imagem enviada com sucesso!')
  } else {
    alert(data.message || 'Erro ao enviar imagem.')
  }
}

const [images, setImages] = useState<{_id: string, filename: string}[]>([])
const [loadingImages, setLoadingImages] = useState(false)

// Buscar imagens ao abrir a aba Galeria
useEffect(() => {
  if (currentTab === 2) {
    fetchImages()
  }
  // eslint-disable-next-line
}, [currentTab])

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
  const token = localStorage.getItem('token')
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