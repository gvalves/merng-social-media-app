import { ApolloServer } from 'apollo-server'
import gql from 'graphql-tag'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import PostModel from './models/Post'

const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
`
const resolvers = {
  Query: {
    async posts() {
      try {
        const posts = await PostModel.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

config()

const server = new ApolloServer({ typeDefs, resolvers })

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected!')
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
