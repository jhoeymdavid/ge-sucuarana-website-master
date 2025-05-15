import { Box, Container, Grid, Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000',
        color: '#BC884F',
        py: 4,
        height: { xs: '500px', md: '300px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={4} sx={{ flex: 1 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#BC884F' }}>
              Grupo Escoteiro Suçuarana
            </Typography>
            <Typography variant="body2" sx={{ color: '#BC884F' }}>
              Rua dos Escoteiros, 123<br />
              Bairro Centro<br />
              São Paulo - SP<br />
              CEP: 01234-567
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#BC884F' }}>
              Links Úteis
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                component={RouterLink}
                to="/quem-somos"
                sx={{ mb: 1, color: '#BC884F' }}
              >
                Quem Somos
              </Link>
              <Link
                component={RouterLink}
                to="/noticias"
                sx={{ mb: 1, color: '#BC884F' }}
              >
                Notícias
              </Link>
              <Link
                component={RouterLink}
                to="/como-se-tornar-escoteiro"
                sx={{ mb: 1, color: '#BC884F' }}
              >
                Como Se Tornar um Escoteiro
              </Link>
              <Link
                component={RouterLink}
                to="/contato"
                sx={{ color: '#BC884F' }}
              >
                Contato
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#BC884F' }}>
              Contato
            </Typography>
            <Typography variant="body2" paragraph sx={{ color: '#BC884F' }}>
              Telefone: (11) 1234-5678
            </Typography>
            <Typography variant="body2" paragraph sx={{ color: '#BC884F' }}>
              Email: contato@sucuarana.org.br
            </Typography>
            <Typography variant="body2" sx={{ color: '#BC884F' }}>
              Horário de Funcionamento:<br />
              Sábados: 14h às 17h30
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ 
          borderTop: '1px solid #BC884F',
          py: 2,
          mt: 2
        }}>
          <Typography variant="body2" align="center" sx={{ color: '#BC884F' }}>
            © {new Date().getFullYear()} Grupo Escoteiro Suçuarana. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer