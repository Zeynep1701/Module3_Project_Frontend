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
      <form className="updateForm" onSubmit={handleUpdate}>
        <table className="updateTable">
          <tr>
            <td>
              <label for="userName">User Name:</label>
            </td>
            <td>
              <input
                className="input"
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="email">Email:</label>
            </td>
            <td>
              <input
                className="input"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </td>
          </tr>
        </table>
        <div>
          <button className="btn button-74" type="submit">
            Update user
          </button>
          <button className="btn button-74" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReviewForm;
