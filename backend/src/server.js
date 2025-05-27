import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.routes.js'
import newsRoutes from './routes/news.routes.js'
import eventsRoutes from './routes/events.routes.js'
import galleryRoutes from './routes/gallery.routes.js'

dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error))


app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/gallery', galleryRoutes)


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})