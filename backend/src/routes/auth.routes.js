import { Router } from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const authRouter = Router()

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user) return res.status(401).json({ message: 'Usuário ou senha inválidos.' })

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(401).json({ message: 'Usuário ou senha inválidos.' })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: 'Erro ao realizar login.' })
  }
})

export default authRouter