import { Box, Container, Grid, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'custom.darkBlue',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Grupo Escoteiro Suçuarana
            </Typography>
            <Typography variant="body2">
              Rua dos Escoteiros, 123<br />
              Bairro Centro<br />
              São Paulo - SP<br />
              CEP: 01234-567
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Links Úteis
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                component={RouterLink}
                to="/quem-somos"
                color="inherit"
                sx={{ mb: 1 }}
              >
                Quem Somos
              </Link>
              <Link
                component={RouterLink}
                to="/noticias"
                color="inherit"
                sx={{ mb: 1 }}
              >
                Notícias
              </Link>
              <Link
                component={RouterLink}
                to="/como-se-tornar-escoteiro"
                color="inherit"
                sx={{ mb: 1 }}
              >
                Como Se Tornar um Escoteiro
              </Link>
              <Link
                component={RouterLink}
                to="/contato"
                color="inherit"
              >
                Contato
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Typography variant="body2" paragraph>
              Telefone: (11) 1234-5678
            </Typography>
            <Typography variant="body2" paragraph>
              Email: contato@sucuarana.org.br
            </Typography>
            <Typography variant="body2">
              Horário de Funcionamento:<br />
              Sábados: 14h às 17h30
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Grupo Escoteiro Suçuarana. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer