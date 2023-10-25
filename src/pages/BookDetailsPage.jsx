import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppCss from "../App.css";

function BookDetailsPage() {
  const [book, setBook] = useState();
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
      <div clasName="half-circle-spinner">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
    );
  }

  return (
    <>
      <div>
        <img src={book.image} style={{ height: "200px" }} />
        <h2>{book.title}</h2>
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
      </div>
    </>
  );
}

export default BookDetailsPage;
