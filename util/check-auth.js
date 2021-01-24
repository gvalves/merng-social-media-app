import { AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config'

const checkAuth = ({ req }) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new AuthenticationError('Authorization header must be provided')
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    throw new AuthenticationError('Token cannot be empty')
  }

  const user = jwt.verify(token, SECRET_KEY)
  if (!user) {
    throw new AuthenticationError('Token expired or invalid')
  }
  return user
}

export { checkAuth }
