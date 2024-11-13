import { useBooks } from '../hooks/useBooks';

type BooksProps = {
  hideButton?: boolean;
};

export const Books: React.FC<BooksProps> = ({ hideButton }) => {
  const { loading, error, data, handleAddBook } = useBooks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <ul>
              {data?.books?.map((book, index) => (
                <li key={index}>
                  <span>{book?.title}</span> by <span>{book?.author}</span>
                </li>
              ))}
            </ul>
            {!hideButton && (
              <button type="button" onClick={handleAddBook}>
                Add book
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
