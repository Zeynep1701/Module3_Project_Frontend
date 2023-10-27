import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppCss from "../App.css";
import ReviewForm from "../components/ReviewForm.jsx";

function BookDetailsPage() {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  //   const navigate = useNavigate();
  const { bookId } = useParams();

  const fetchBook = async () => {
    let token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/books/${bookId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
    fetchReviews();
  }, [bookId]);

  const fetchReviews = async () => {
    let token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${bookId}/reviews`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        setReviews(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          book.book.categories.map((category, index) => (
            <li key={index}>
              <p>Categories:{category}</p>
            </li>
          ))}

        {reviews.map((review) => (
          <li key={review._id}>
            <img src={review.user?.image} style={{ height: "200px" }} />
            <p>User: {review.user?.userName}</p>
            <p>Date: {review.reviewDate}</p>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </li>
        ))}
      </div>
      <ReviewForm
        bookId={book.book._id}
        fetchBook={fetchBook}
        setReviews={setReviews}
        reviews={reviews}
      />
    </>
  );
}

export default BookDetailsPage;
