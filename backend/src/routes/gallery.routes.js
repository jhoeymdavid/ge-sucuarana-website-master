import { Router } from 'express'
import multer from 'multer'
import GalleryImage from '../models/GalleryImage.js'
import auth from '../middleware/auth.js'

const galleryRouter = Router()
const upload = multer()

// Upload de imagem protegido
galleryRouter.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file
    const image = new GalleryImage({
      filename: originalname,
      mimetype,
      data: buffer
    })
    await image.save()
    res.status(201).json({ message: 'Imagem enviada com sucesso!' })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar imagem.' })
  }
})

// Listar imagens (retorna apenas id e nome)
galleryRouter.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find({}, '_id filename')
    res.json({ images })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar imagens.' })
  }
})

// Obter imagem binária por id
galleryRouter.get('/:id', async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id)
    if (!image) return res.status(404).json({ message: 'Imagem não encontrada.' })
    res.set('Content-Type', image.mimetype)
    res.send(image.data)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar imagem.' })
  }
})

export default galleryRouter