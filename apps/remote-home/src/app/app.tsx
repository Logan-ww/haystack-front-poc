import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useReactiveVar,
} from '@apollo/client';
import { Books } from './books';
import { UpdatedBooks } from './books-updated';
import { userVar } from '@fdc-frontend/state';
import {Helmet} from "react-helmet";

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
      <Helmet>
          <meta charSet="utf-8" />
          <title>remote home page title</title>
          <meta name="description" content="remote home page description" />
          <meta name="keywords" content="remote, home" />
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </ApolloProvider>
  );
}

export default App;
