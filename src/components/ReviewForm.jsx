import { useState } from "react";

const reviewForm = ({ bookId, fetchBook, setReviews, reviews }) => {
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
      if (response.ok) {
        const parsed = await response.json();
        setReviews([...reviews, parsed.review]);
        fetchBook();
        setRating("");
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="updateForm">
        <form onSubmit={handleSubmit} style={{ margin: "1rem" }}>
          <table className="updateTable">
            <tr>
              <td>
                <strong>Rating:</strong>
              </td>
              <td>
                <label>
                  <select
                    className="input"
                    id="dropdown"
                    name="dropdown"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Comment:</strong>
              </td>
              <td>
                <label>
                  <textarea
                    className="input"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                </label>
              </td>
            </tr>
          </table>

          <button className="btn button-74" type="submit">
            Add your review
          </button>
        </form>
      </div>
    </>
  );
};

export default reviewForm;
