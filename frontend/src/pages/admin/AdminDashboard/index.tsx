import { useState } from 'react'
import { Box, Container, Typography, Paper, Tabs, Tab, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
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
                <Button variant="contained" color="primary">
                  Adicionar Imagens
                </Button>
              </Box>
              {/* TODO: Implementar grid de imagens e upload */}
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