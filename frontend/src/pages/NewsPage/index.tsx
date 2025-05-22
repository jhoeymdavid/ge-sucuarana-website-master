import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Box, Chip, CircularProgress, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image?: string;
  publishDate: string;
  author: {
    _id: string;
    name: string;
  };
  tags: string[];
}

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news');
        const data = await response.json();
        
        if (response.ok) {
          setNews(data);
        } else {
          setError('Erro ao carregar notícias');
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = (id: string) => {
    navigate(`/noticias/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notícias
        </Typography>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Notícias
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {news.length === 0 ? (
        <Typography>Nenhuma notícia disponível no momento.</Typography>
      ) : (
        <Grid container spacing={3}>
          {news.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea onClick={() => handleNewsClick(item._id)}>
                  {item.image && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {format(new Date(item.publishDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      {item.author && ` • ${item.author.name}`}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {item.tags.map((tag) => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }} 
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default NewsPage;