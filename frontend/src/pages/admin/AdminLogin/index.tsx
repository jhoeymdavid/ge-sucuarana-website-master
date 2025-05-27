import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 72px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.custom.lightGray,
  padding: theme.spacing(0),
  [theme.breakpoints.down('sm')]: {
    minHeight: 'calc(100vh - 56px)', 
    paddingTop: theme.spacing(2),    
  },
}))

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}))

const AdminLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('token', data.token)
        sessionStorage.setItem('token', data.token)
        navigate('/admin/dashboard')
      } else {
        alert(data.message || 'Falha no login')
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor')
    }
  }

  return (
    <LoginContainer>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
          <LoginForm elevation={3}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Área Administrativa
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" gutterBottom>
              Faça login para acessar o painel administrativo
            </Typography>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Entrar
            </Button>
          </LoginForm>
        </form>
      </Container>
    </LoginContainer>
  )
}

export default AdminLogin