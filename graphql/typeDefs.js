import { gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(username: String!, password: String!): User!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
`

export { typeDefs }
