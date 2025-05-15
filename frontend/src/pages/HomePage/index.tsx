import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.custom.lightGray,
  padding: theme.spacing(4, 0),
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
}))

const HomePage = () => {
  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    '& .highlight': {
                      color: 'primary.main',
                      borderBottom: '4px solid',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  Bem Vindo ao<br />
                  Grupo Escoteiro<br />
                  <span className="highlight">Suçuarana</span>
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: '600px' }}
                >
                  Venha fazer parte desse Grupo Escoteiro com 10 anos de tradição,
                  oferecendo educação e qualidade de vida aos jovens de sua região.
                </Typography>
                <StyledButton
                  variant="contained"
                  color="primary"
                  size="large"
                  href="/como-se-tornar-escoteiro"
                >
                  Clique aqui para conhecer mais
                </StyledButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                  },
                }}
              >
                <img
                  src="/images/hero-image.jpg"
                  alt="Grupo Escoteiro em atividade"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>
    </Box>
  )
}

export default HomePage