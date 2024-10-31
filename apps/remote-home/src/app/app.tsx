import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useReactiveVar,
} from '@apollo/client';
import { Books } from './books';
import { UpdatedBooks } from './books-updated';
import { userVar } from '@fdc-frontend/state';
import { StateWrapper } from '@fdc-frontend/ui';

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
        <h1>Home Microfrontend 👋</h1>

        <p>
          <h2>Books Component</h2>
          <StateWrapper state="Home">
            <Books />
          </StateWrapper>
        </p>
        <h2>Updated Books Component</h2>
        <StateWrapper state="Home">
          <UpdatedBooks />
        </StateWrapper>

        <p style={{ width: 200 }}>
          <StateWrapper state="Shared">
            <p>User: {user?.name}</p>
          </StateWrapper>
        </p>
        <button onClick={handleChangeUser}>Change User</button>
      </div>
    </ApolloProvider>
  );
}

export default App;
