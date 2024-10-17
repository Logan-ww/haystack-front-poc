import { useQuery } from '@apollo/client';
import { gql } from '@fdc-frontend/state';
import { useEffect } from 'react';

import { emitter } from '@fdc-frontend/event-bus';

const GET_BOOKS = gql(`
  query GetBooks {
    books {
      title
      author
    }
  }
`);

export const useBooks = () => {
  const result = useQuery<{ books: Book[] }>(GET_BOOKS);

  const handleAddBook = () => {
    result.client.writeQuery({
      query: GET_BOOKS,
      data: {
        books: [
          ...(result?.data?.books || []),
          {
            title: 'New Book',
            author: 'New Author',
          },
        ],
      },
    });
  };
  useEffect(() => {
    if (result.data && !result.loading) {
      emitter.emit('REMOTE_HOME_GET_BOOKS', result.data.books);
    }
  }, [result]);

  return { ...result, handleAddBook };
};
