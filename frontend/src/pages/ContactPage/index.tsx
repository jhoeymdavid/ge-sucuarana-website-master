import { Box, Container, Typography, Link, Paper } from '@mui/material'

const endereco = "R. Antônio João de Medeiros, 170 - Jardim Tua, São Paulo - SP, 08140-060"
const telefone = "(11) 2561-8791"
const horario = "Sabado: 13h às 16h"
const mapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.7837307918535!2d-46.400429125424346!3d-23.504298059496804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce6481d7a3b427%3A0x1d4339abf42ca051!2sGrupo%20Escoteiro%20Su%C3%A7uarana!5e0!3m2!1spt-BR!2sbr!4v1747697905483!5m2!1spt-BR!2sbr"

const ContactPage = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Typography variant="h3" gutterBottom>
      Contato
    </Typography>
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6">Endereço:</Typography>
      <Typography>{endereco}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Telefone:</Typography>
      <Typography>
        <Link href={`tel:${telefone.replace(/\D/g, '')}`}>{telefone}</Link>
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Horário de Funcionamento:</Typography>
      <Typography>
        {horario}
      </Typography>
    </Paper>
    <Typography variant="h6" gutterBottom>
      Como chegar até nós:
    </Typography>
    <Box sx={{ width: '100%', height: 400, mb: 2 }}>
      <iframe
        title="Localização Grupo Escoteiro Suçuarana"
        src={mapsEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  </Container>
)

export default ContactPage