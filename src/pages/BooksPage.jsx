import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BooksPage() {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const fetchAllBooks = async () => {
    try {
      let token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const allBooks = await response.json();
        setBooks(allBooks);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
              <h3>{book.title}</h3>
              <p>Author: {book.authorId.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default BooksPage;
