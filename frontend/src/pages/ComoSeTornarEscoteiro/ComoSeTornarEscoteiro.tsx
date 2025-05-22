import { Box, Button, Container, Typography, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.custom?.lightGray || '#f5f5f5',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
}))

const ComoSeTornarEscoteiro = () => {
  const navigate = useNavigate()
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Section elevation={3}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#BC884F', fontWeight: 'bold', textAlign: 'center' }}>
          Como Se Tornar um Escoteiro
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
          Passos para Ingressar:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          1. <b>Entre em contato</b> com nosso grupo para agendar uma visita.<br/>
          2. <b>Participe de uma reunião</b> para conhecer nossas atividades e valores.<br/>
          3. <b>Preencha a ficha de inscrição</b> e traga os documentos necessários.<br/>
          4. <b>Venha com vontade de aprender, servir e fazer novos amigos!</b>
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
          Requisitos:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          - Ter entre 6,5 e 21 anos (há ramos para todas as idades!)<br/>
          - Ter interesse em aprender, colaborar e participar de atividades ao ar livre<br/>
          - Respeitar os valores do Movimento Escoteiro
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
          Benefícios de ser Escoteiro:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          - Desenvolvimento de liderança, trabalho em equipe e autonomia<br/>
          - Novas amizades e experiências inesquecíveis<br/>
          - Contato com a natureza e aventuras ao ar livre<br/>
          - Participação em eventos, acampamentos e projetos sociais
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Button variant="contained" color="primary" size="large" sx={{ px: 5, fontWeight: 'bold' }} onClick={() => navigate('/contato')}>
            Quero ser Escoteiro!
          </Button>
        </Box>
      </Section>
    </Container>
  )
}

export default ComoSeTornarEscoteiro