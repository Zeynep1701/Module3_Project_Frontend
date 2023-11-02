import { useState } from "react";

const UpdateReviewForm = ({ review, onUpdateSuccess, onClose }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const payload = { rating, comment };
    let token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${review._id}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const parsed = await response.json();
        onUpdateSuccess(parsed.review);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal reviewForm">
      <form onSubmit={handleUpdate}>
        <table className="reviewFormTable">
          <tr>
            <td>
              <strong>Rating:</strong>
            </td>
            <td>
              <label>
                <select
                  className="input"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
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
                  onChange={(e) => setComment(e.target.value)}
                />
              </label>
            </td>
          </tr>
        </table>
        <button className="btn button-74" type="submit">
          Update Review
        </button>
        <button className="btn button-74" type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateReviewForm;
