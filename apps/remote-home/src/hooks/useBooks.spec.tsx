import { MockedProvider } from '@apollo/client/testing';
import { GET_BOOKS, useBooks } from './useBooks';
import { renderHook, act, waitFor } from '@testing-library/react';
import { emitter } from '@fdc-frontend/event-bus';

import { ReactNode } from 'react';

const mocks = [
  {
    request: {
      query: GET_BOOKS,
    },
    result: {
      data: {
        books: [
          { title: 'Book 1', author: 'Author 1' },
          { title: 'Book 2', author: 'Author 2' },
        ],
      },
    },
  },
];

describe('useBooks', () => {
  test('should return books data', async () => {
    const { result } = renderHook(() => useBooks(), {
      wrapper: ({ children }: { children: ReactNode }) => {
        return (
          <MockedProvider mocks={mocks} addTypename={false}>
            {children}
          </MockedProvider>
        );
      },
    });
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    expect(result.current.data).toEqual({
      books: [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
      ],
    });
  });

  test('should handle adding a new book', async () => {
    const { result } = renderHook(() => useBooks(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    await act(async () => {
      await result.current.handleAddBook();
    });

    expect(result?.current?.data?.books).toEqual([
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
      { title: 'New Book', author: 'New Author' },
    ]);
  });

  test('should emit event when books data is loaded', async () => {
    const emitSpy = jest.spyOn(emitter, 'emit');

    const { result } = renderHook(() => useBooks(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    expect(emitSpy).toHaveBeenCalledWith('REMOTE_HOME_GET_BOOKS', [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ]);
  });
});
