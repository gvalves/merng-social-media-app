import { postResolvers } from './post'
import { userResolvers } from './user'

const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
}

export { resolvers }
