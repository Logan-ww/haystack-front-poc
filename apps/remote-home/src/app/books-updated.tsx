import { useBooks } from '../hooks/useBooks';

export const UpdatedBooks = () => {
  const { loading, error, data } = useBooks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <style />
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>Updated Books</h1>
            <ul>
              {data?.books?.map((book, index) => (
                <li key={index}>
                  <span>{book?.title}</span> by <span>{book?.author}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
