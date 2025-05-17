import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../src/models/User.js'

dotenv.config() 

mongoose.connect(process.env.MONGODB_URI)

const run = async () => {
  const user = new User({
    name: 'Admin',
    email: 'admin@sucuarana.org.br',
    password: 'adminsucuarana', // será criptografada automaticamente
    role: 'admin'
  })
  await user.save()
  console.log('Usuário admin criado!')
  mongoose.disconnect()
}

run()