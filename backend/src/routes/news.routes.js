import { Router } from 'express';
import multer from 'multer';
import News from '../models/News.js';
import auth from '../middleware/auth.js';

const newsRouter = Router();
const upload = multer();

// Criar notícia (POST)
newsRouter.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    
    // Criar nova notícia
    const news = new News({
      title,
      content,
      author: req.user.id,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status: status || 'draft',
    });
    
    // Se houver imagem, salvar os dados da imagem
    if (req.file) {
      // Aqui você pode implementar o upload para um serviço de armazenamento
      // ou salvar diretamente no banco como base64
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      news.image = base64Image;
    }
    
    await news.save();
    res.status(201).json({ message: 'Notícia criada com sucesso!', news });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar notícia.' });
  }
});

// Listar todas as notícias
newsRouter.get('/', async (req, res) => {
  try {
    const news = await News.find({ status: 'published' })
      .sort({ publishDate: -1 })
      .populate('author', 'name');
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar notícias.' });
  }
});

// Obter notícia por ID
newsRouter.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name');
    if (!news) return res.status(404).json({ message: 'Notícia não encontrada.' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar notícia.' });
  }
});

// Atualizar notícia (PUT)
newsRouter.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    
    // Verificar se a notícia existe
    const existingNews = await News.findById(req.params.id);
    if (!existingNews) return res.status(404).json({ message: 'Notícia não encontrada.' });
    
    // Atualizar campos
    existingNews.title = title || existingNews.title;
    existingNews.content = content || existingNews.content;
    existingNews.tags = tags ? tags.split(',').map(tag => tag.trim()) : existingNews.tags;
    existingNews.status = status || existingNews.status;
    
    // Se houver uma nova imagem, atualizar
    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      existingNews.image = base64Image;
    }
    
    // Se o status mudar para 'published', atualizar a data de publicação
    if (status === 'published' && existingNews.status !== 'published') {
      existingNews.publishDate = new Date();
    }
    
    await existingNews.save();
    res.json({ message: 'Notícia atualizada com sucesso!', news: existingNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar notícia.' });
  }
});

// Excluir notícia (DELETE)
newsRouter.delete('/:id', auth, async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'Notícia não encontrada.' });
    res.json({ message: 'Notícia excluída com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao excluir notícia.' });
  }
});

export default newsRouter;