import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { gql } from '../__generated__';
import { User } from '../__generated__/graphql';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const GET_USER = gql(`
  query GetUser {
    user {
      id
      name
    }
  }
`);

export const userVar = makeVar<User | null>(null);

export const login = () => {
  // Make a server side call and set user object
  client.query({ query: GET_USER }).then(({ data }) => {
    userVar(data.user);
  });
};

client.query({ query: GET_USER }).then(({ data }) => {
  userVar(data.user);
});

export const logout = () => {
  // Make a server side call and reset user object
  userVar(null);
};
