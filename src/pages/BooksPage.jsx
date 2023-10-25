import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function BooksPage() {
  const [books, setBooks] = useState([]);

  const fetchAllBooks = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/books`);
    if (response.ok) {
      const allBooks = await response.json();
      setBooks(allBooks);
      console.log(allBooks);
    }
  };
  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <>
      <ul
        style={{
          listStyle: "none",
          display: "grid",
          gridTemplate: "auto / repeat(4, 1fr)",
          gap: "1rem",
          padding: "0 1rem",
        }}
      >
        {books.map((book) => (
          <li
            key={book._id}
            style={{
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "1px 2px 7px 2px #BC9B6A",
            }}
          >
            <Link to={`/books/${book._id}`}>
              <img src={book.image} style={{ height: "200px" }} />
              <h3>Title: {book.title}</h3>
              <p>Author: {book.authorId.name}</p>
              <p>Publisher: {book.publisher}</p>
              <p>Publishing date: {book.publishingDate}</p>
              <p>Description: {book.description}</p>
              <p>
                {book.categories.map((category) => (
                  <li>
                    <p>Categories:{category}</p>
                  </li>
                ))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default BooksPage;
