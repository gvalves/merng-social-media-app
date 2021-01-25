import { ApolloServer, PubSub } from 'apollo-server'
import mongoose from 'mongoose'

import { MONGODB } from './config'

import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
})
const port = 5000

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected!')
    return server.listen({ port })
  })
  .then(({ url }) => {
    console.log(`Apollo server running at ${url}`)
  })
