import { useState } from "react";

const reviewForm = ({ bookId, fetchBook }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { rating, comment, book: bookId };
    let token = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        fetchBook();
        setRating("");
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "1rem" }}>
      <label>
        <strong>Rating: </strong>
        <input
          value={rating}
          onChange={(event) => setRating(event.target.value)}
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
