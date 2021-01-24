import { postResolvers } from './post'
import { userResolvers } from './user'

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
}

export { resolvers }
