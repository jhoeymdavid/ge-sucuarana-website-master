import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import News from '../models/News.js';
import auth from '../middleware/auth.js';

const newsRouter = Router();
const upload = multer();


newsRouter.post('/upload-image', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    res.json({ 
      url: base64Image,
      location: `http://localhost:5000/api/news/upload-image/${req.file.originalname}`,
      meta: {
        title: req.file.originalname,
        alt: req.file.originalname,
        dimensions: {
          width: '800',
          height: '450'
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
  }
});


newsRouter.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    

    const news = new News({
      title,
      content,
      author: req.user.id,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status: status || 'draft',
    });
    

    if (req.file) {

      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      news.image = base64Image;
      news.imageDimensions = { width: 800, height: 450 };
    }
    
    await news.save();
    res.status(201).json({ message: 'Notícia criada com sucesso!', news });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar notícia.' });
  }
});


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


newsRouter.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name');
    if (!news) return res.status(404).json({ message: 'Notícia não encontrada.' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar notícia.' });
  }
});


newsRouter.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    

    const existingNews = await News.findById(req.params.id);
    if (!existingNews) return res.status(404).json({ message: 'Notícia não encontrada.' });
    

    existingNews.title = title || existingNews.title;
    existingNews.content = content || existingNews.content;
    existingNews.tags = tags ? tags.split(',').map(tag => tag.trim()) : existingNews.tags;
    existingNews.status = status || existingNews.status;
    

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      existingNews.image = base64Image;
      existingNews.imageDimensions = { width: 800, height: 450 };
    }
    

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