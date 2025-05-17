import mongoose from 'mongoose'

const galleryImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  data: { type: Buffer, required: true },
  uploadedAt: { type: Date, default: Date.now }
})

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema)

export default GalleryImage