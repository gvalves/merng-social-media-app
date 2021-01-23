import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server'

import { SECRET_KEY } from '../../config'
import {
  validateRegisterInput,
  validateLoginInput,
} from '../../util/validators'
import { User } from '../../models/User'

const generateToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  )

const userResolvers = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validade user data
      const { errors, valid } = validateRegisterInput({
        username,
        email,
        password,
        confirmPassword,
      })
      if (!valid) {
        throw new UserInputError('Validate errors', { errors })
      }
      // Make sure doesnt already exists
      if (await User.findOne({ username })) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        })
      }
      // Hash password and create an auth token
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      })

      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput({ username, password })

      if (!valid) {
        throw new UserInputError('Validate errors', { errors })
      }

      const user = await User.findOne({ username })

      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }

      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        errors.general = 'Wrong password'
        throw new UserInputError('Wrong password', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
  },
}

export { userResolvers }
