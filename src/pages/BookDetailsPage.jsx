import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppCss from "../App.css";
import ReviewForm from "../components/ReviewForm.jsx";
import UpdateReviewForm from "../components/UpdateReviewForm";
import { AuthContext } from "../contexts/AuthContext";

function BookDetailsPage() {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { bookId } = useParams();
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [reviewToUpdate, setReviewToUpdate] = useState(null);
  const { userId } = useContext(AuthContext);

  const openUpdateForm = (review) => {
    setReviewToUpdate(review);
    setIsUpdateFormOpen(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateFormOpen(false);
    setReviewToUpdate(null);
  };

  const handleUpdateSuccess = (updatedReview) => {
    const updatedReviews = reviews.map((review) =>
      review._id === updatedReview._id ? updatedReview : review
    );
    setReviews(updatedReviews);
    closeUpdateForm();
  };

  let token = localStorage.getItem("authToken");

  const fetchBook = async () => {
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
        setBook(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
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
        setReviews(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${bookId}/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const currentReview = await response.json();
        const filteredReview = reviews.filter((oneReview) => {
          return oneReview._id !== reviewId;
        });
        setReviews(filteredReview);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [bookId]);

  if (book === null) {
    return (
      <div className="half-circle-spinner">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
    );
  }

  const formattedPublishingDate = () => {
    let publishingDate = book.book.publishingDate;
    let stringDate = publishingDate.toString();
    let formattedDate = stringDate.slice(0, 10).split("-");
    if (formattedDate.length === 3) {
      return `${formattedDate[2]}-${formattedDate[1]}-${formattedDate[0]}`;
    }
  };

  const formattedReviewDate = (review) => {
    let reviewDate = review.reviewDate;
    let stringDate = reviewDate.toString();
    let formattedDate = stringDate.slice(0, 10).split("-");
    if (formattedDate.length === 3) {
      return `${formattedDate[2]}-${formattedDate[1]}-${formattedDate[0]}`;
    }
  };

  return (
    <>
      <div>
        <img src={book.book.image} style={{ height: "200px" }} />
        <h2>{book.book.title}</h2>
        <h3>{book.book.authorId.name}</h3>
        <p>Publisher: {book.book.publisher}</p>
        <p>Publishing date: {formattedPublishingDate()}</p>
        <p>Description: {book.book.description}</p>

        {book.book.categories &&
          book.book.categories.map((category, index) => (
            <li key={index}>
              <p>Categories:{category}</p>
            </li>
          ))}

        {userId &&
          reviews.map((review) => (
            <li key={review._id}>
              <img src={review.user?.image} style={{ height: "50px" }} />
              <p>User: {review.user?.userName}</p>
              <p>Date: {formattedReviewDate(review)}</p>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>

              {userId === review.user._id && (
                <button
                  className="btn button-74"
                  onClick={() => openUpdateForm(review)}
                >
                  Update
                </button>
              )}

              {userId === review.user._id ? (
                <button
                  className="btn button-74"
                  onClick={() => {
                    handleDelete(review._id);
                  }}
                >
                  Delete
                </button>
              ) : null}
            </li>
          ))}
      </div>
      <ReviewForm
        bookId={book.book._id}
        fetchBook={fetchBook}
        setReviews={setReviews}
        reviews={reviews}
      />
      {isUpdateFormOpen && reviewToUpdate && (
        <UpdateReviewForm
          review={reviewToUpdate}
          onUpdateSuccess={handleUpdateSuccess}
          onClose={closeUpdateForm}
        />
      )}
    </>
  );
}
export default BookDetailsPage;
