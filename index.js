import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import config from "./config";

import Post from "./models/Post";

const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
`;

const resolvers = {
  Query: {
    async posts() {
      try {
        const posts = Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const port = 5000;

mongoose
  .connect(config.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
    return server.listen({ port });
  })
  .then(({ url }) => {
    console.log(`Apollo server running at ${url}`);
  });
