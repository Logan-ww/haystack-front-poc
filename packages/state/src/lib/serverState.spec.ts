import { User } from '../__generated__/graphql';
import { login, logout, userVar } from './serverState';

const mockUser: User = { id: 1, name: 'John Doe' };
jest.mock('@apollo/client', () => {
  const originalModule = jest.requireActual('@apollo/client');
  return {
    ...originalModule,
    ApolloClient: jest.fn().mockImplementation(() => ({
      query: jest.fn(() => Promise.resolve({ data: { user: mockUser } })),
    })),
  };
});

describe('serverState', () => {
  it('should set userVar on login', async () => {
    await login();
    expect(userVar()).toEqual(mockUser);
  });

  it('should reset userVar on logout', () => {
    userVar(mockUser);
    expect(userVar()).toEqual(mockUser);
    logout();
    expect(userVar()).toBeNull();
  });
});
