import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Books } from './books';
import { UpdatedBooks } from './books-updated';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Books title="Remote Home" />
        <UpdatedBooks />
      </div>
    </ApolloProvider>
  );
}

export default App;
