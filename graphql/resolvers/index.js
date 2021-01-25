import { postResolvers } from './post'
import { userResolvers } from './user'
import { commentResolvers } from './comment'

const resolvers = {
  Post: {
    likeCount(parent) {
      return parent.likes.length
    },
    commentCount(parent) {
      return parent.comments.length
    },
  },
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
}

export { resolvers }
