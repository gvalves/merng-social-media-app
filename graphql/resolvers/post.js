import { AuthenticationError } from 'apollo-server'
import { Post } from '../../models/Post'
import { checkAuth } from '../../util/check-auth'

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
    async post(_, { postId }) {
      try {
        const post = await Post.findById(postId)

        if (post) return post

        throw new Error('Post not found')
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context)

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      })

      const post = await newPost.save()
      return post
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)
      const post = await Post.findById(postId)

      try {
        if (user.username === post.username) {
          await post.delete()
          return post
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async deletePosts(_, __, context) {
      const user = checkAuth(context)
      const posts = await Post.find({ username: user.username })

      for (const post of posts) {
        await post.delete()
      }
      return posts
    },
  },
}

export { postResolvers }
