import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppCss from "../App.css";
import ReviewForm from "../components/ReviewForm.jsx";

function BookDetailsPage() {
  const [book, setBook] = useState(null);
  //   const navigate = useNavigate();
  const { bookId } = useParams();

  const fetchBook = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/books/${bookId}`
      );

      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        setBook(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  if (book === null) {
    return (
      <div className="half-circle-spinner">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
    );
  }

  return (
    <>
      <div>
        <img src={book.book.image} style={{ height: "200px" }} />
        <h2>{book.book.title}</h2>
        <h3>{book.book.authorId.name}</h3>
        <p>Publisher: {book.book.publisher}</p>
        <p>Publishing date: {book.book.publishingDate}</p>
        <p>Description: {book.book.description}</p>

        {book.book.categories &&
          book.book.categories.map((category) => (
            <li key={book.book._id}>
              <p>Categories:{category}</p>
            </li>
          ))}
      </div>
      <ReviewForm bookId={book.book._id} fetchBook={fetchBook} />
    </>
  );
}

export default BookDetailsPage;
