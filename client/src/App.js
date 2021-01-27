import React from 'react'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

const link = new HttpLink({ uri: 'http://localhost:5000' })
const cache = new InMemoryCache()

const client = new ApolloClient({ cache, link })

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Hello World!</h1>
      </div>
    </ApolloProvider>
  )
}

export default App
