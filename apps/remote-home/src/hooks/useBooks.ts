import { useQuery } from '@apollo/client';
import { gql } from '../__generated__';
import { useEffect } from 'react';
import { Book } from '../__generated__/graphql';

const GET_BOOKS = gql(`
  query GetBooks {
    books {
      title
      author
    }
  }
`);

export const useBooks = () => {
  const result = useQuery(GET_BOOKS);

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
  useEffect(() => {}, [result]);

  return { ...result, handleAddBook };
};
