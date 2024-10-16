import { useBooks } from '../hooks/useBooks';

export const Books = ({ title }: { title: string }) => {
  const { loading, error, data, handleAddBook } = useBooks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <style />
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome to {title} 👋
            </h1>
            <p>Here are some books:</p>
            <ul>
              {data?.books?.map((book, index) => (
                <li key={index}>
                  <span>{book?.title}</span> by <span>{book?.author}</span>
                </li>
              ))}
            </ul>
            <button onClick={handleAddBook}>Add book</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
