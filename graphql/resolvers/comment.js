import { AuthenticationError, UserInputError } from 'apollo-server'
import { Post } from '../../models/Post'
import { checkAuth } from '../../util/check-auth'

const commentResolvers = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context)

      if (!body.trim()) {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty',
          },
        })
      }

      const post = await Post.findById(postId)

      if (!post) {
        throw new UserInputError('Post not found')
      }
      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString(),
      })

      post.save()

      return post
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context)
      const post = await Post.findById(postId)

      if (!post) {
        throw new UserInputError('Post not found')
      }

      const commentIndex = post.comments.findIndex((c) => c.id === commentId)

      if (post.comments[commentIndex].username === username) {
        post.comments.splice(commentIndex, 1)
        await post.save()
        return post
      }
      throw new AuthenticationError('Action not allowed')
    },
  },
}

export { commentResolvers }
