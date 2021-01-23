import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
})

const User = model('User', userSchema)

export { User }
