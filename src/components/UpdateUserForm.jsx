import { useState } from "react";

const UpdateReviewForm = ({ user, userToUpdate, onUpdateSuccess, onClose }) => {
  const [userName, setUserName] = useState(user.user.userName);
  const [email, setEmail] = useState(user.user.email);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const payload = { userName, email };
    let token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.user._id}`,
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
        onUpdateSuccess(parsed);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleUpdate}>
        <label>
          User Name:
          <input
            name="userName"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button type="submit">Update user</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateReviewForm;
