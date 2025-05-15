import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.custom.lightGray,
  padding: theme.spacing(3),
}))

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '400px',
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
    // TODO: Implement login logic with backend
    console.log('Login attempt:', formData)
    // Temporary navigation for development
    navigate('/admin/dashboard')
  }

  return (
    <LoginContainer>
      <Container maxWidth="sm">
        <LoginForm elevation={3} component="form" onSubmit={handleSubmit}>
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
          />
          <TextField
            fullWidth
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
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
      </Container>
    </LoginContainer>
  )
}

export default AdminLogin