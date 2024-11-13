import { GET_BOOKS } from '../hooks/useBooks';

export const bookMocks = [
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
