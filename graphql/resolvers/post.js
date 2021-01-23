import { Post } from '../../models/Post'

const postResolvers = {
  Query: {
    async posts() {
      try {
        const posts = Post.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

export { postResolvers }
