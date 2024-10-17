import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useReactiveVar,
} from '@apollo/client';
import { Books } from './books';
import { UpdatedBooks } from './books-updated';
import { userVar } from '@fdc-frontend/state';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export function App() {
  const user = useReactiveVar(userVar);

  const handleChangeUser = () => {
    userVar({
      id: 1,
      name: 'Changed User',
    });
  };
  return (
    <ApolloProvider client={client}>
      <div>
        <Books title="Remote Home" />
        <UpdatedBooks />
        <button onClick={handleChangeUser}>Change User</button>
        <p>User: {user?.name}</p>
      </div>
    </ApolloProvider>
  );
}

export default App;
