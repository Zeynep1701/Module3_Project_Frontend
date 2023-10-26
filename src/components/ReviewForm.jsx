import { useState } from "react";

const reviewForm = ({ bookId, fetchBook }) => {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewDate, setReviewDate] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { userName, image, rating, reviewDate, comment };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        fetchBook();
        setUserName("");
        setImage("");
        setRating("");
        setReviewDate("");
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem" }}>
      <label>
        <strong>User Name: </strong>
        <input
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </label>
      <label>
        <strong>Image: </strong>
        <input
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
      </label>
      <label>
        <strong>Rating: </strong>
        <input
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        />
      </label>
      <label>
        <strong>Date of the review: </strong>
        <input
          value={reviewDate}
          onChange={(event) => setReviewDate(event.target.value)}
        />
      </label>
      <label>
        <strong>Comment: </strong>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </label>
      <button type="submit">Add your review</button>
    </form>
  );
};

export default reviewForm;
