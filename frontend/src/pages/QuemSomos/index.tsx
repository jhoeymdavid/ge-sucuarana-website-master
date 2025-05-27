import React from 'react';
import { Box, Typography, styled, Container, Card, CardContent, Grid } from '@mui/material';

const QuemSomosContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  textAlign: 'center',
}));

const QuemSomos: React.FC = () => {
  return (
    <QuemSomosContainer>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Quem Somos
          </Typography>
          <Typography variant="h5" component="h2" sx={{ opacity: 0.9 }}>
            Grupo Escoteiro Sucuarana
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <SectionTitle variant="h4" component="h2">
                  Nossa História
                </SectionTitle>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Fundado em 06/06/2011 pelo chefe Renato Breneizer, seguimos as missões do escotismo 
                  deixadas por Baden-Powell (fundador do escotismo). Nosso grupo tem como objetivo 
                  formar jovens cidadãos conscientes, responsáveis e comprometidos com a sociedade.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <SectionTitle variant="h5" component="h3">
                  Missão do Escotismo
                </SectionTitle>
                <Typography variant="body1" paragraph>
                  A missão do Movimento Escoteiro é contribuir para a educação dos jovens, 
                  por meio de um sistema de valores baseado na Promessa e na Lei Escoteira, 
                  para ajudar a construir um mundo melhor, onde as pessoas se realizem como 
                  indivíduos e desempenhem um papel construtivo na sociedade.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <SectionTitle variant="h5" component="h3">
                  Valores Escoteiros
                </SectionTitle>
                <Typography variant="body1" component="div">
                  <strong>Lei Escoteira:</strong>
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    <li>O escoteiro tem uma só palavra; sua honra vale mais que a própria vida</li>
                    <li>O escoteiro é leal</li>
                    <li>O escoteiro está sempre alerta para ajudar o próximo</li>
                    <li>O escoteiro é amigo de todos e irmão dos demais escoteiros</li>
                    <li>O escoteiro é cortês</li>
                    <li>O escoteiro é bom para os animais e as plantas</li>
                    <li>O escoteiro é obediente e disciplinado</li>
                    <li>O escoteiro é alegre e sorri nas dificuldades</li>
                    <li>O escoteiro é econômico e respeita o bem alheio</li>
                    <li>O escoteiro é limpo de corpo e alma</li>
                  </ul>
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12}>
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <SectionTitle variant="h5" component="h3">
                  Método Escoteiro
                </SectionTitle>
                <Typography variant="body1" paragraph>
                  O Método Escoteiro é um sistema de autoeducação progressiva baseado em:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      • Promessa e Lei Escoteira
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      • Aprender fazendo
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      • Sistema de equipes
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      • Atividades progressivas
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </QuemSomosContainer>
  );
};

export default QuemSomos;