import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BooksPage() {
  const [originalBooks, setOriginalBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

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
        setOriginalBooks(allBooks);
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

  //sorting functions to filter books 

  const handleSortByAuthors = () => {
    const copyBooks = [...books];
    copyBooks.sort((book1, book2) => book1.authorId.name > book2.authorId.name ? 1 : -1)
    setBooks(copyBooks);
  }

  const handleSortByBooks = () => {
    const copyBooks = [...books];
    copyBooks.sort((book1, book2) => book1.title > book2.title ? 1 : -1)
    setBooks(copyBooks);
  }

  const handleSortByCategories = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    const filteredBooks = selectedCategory === "all" ? originalBooks : originalBooks.filter(book => book.categories.includes(selectedCategory));
    setBooks(filteredBooks);
  };

  return (
    <>
      <button type='button' className="button-74" onClick={() => handleSortByBooks()}>Sort by Titles (A-Z)</button>
      <button type='button' className="button-74" onClick={() => handleSortByAuthors()}>Sort by Authors (A-Z)</button>
      <select className="button-74" value={selectedCategory} onChange={(e) => handleSortByCategories(e.target.value)}>
        <option value="all">Category: All</option>
        <option value="Romance">Category: Romance</option>
        <option value="Fantasy">Category: Fantasy</option> 
        <option value="Drama">Category: Drama</option>
        <option value="Fiction">Category: Fiction</option>
        <option value="Horror">Category: Horror</option>
        <option value="Mystery">Category: Mystery</option>
        <option value="Self-help">Category: Self-help</option>
      </select>
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
              <p>Category: {book.categories}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default BooksPage;
