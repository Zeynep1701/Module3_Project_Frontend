import AppCss from "../App.css";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UpdateUserForm from "../components/UpdateUserForm";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { token, userId, logOutUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);

  const fetchWithToken = async (endpoint, callback, method = "GET", body) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const parsed = await response.json();
        callback(parsed);
      } else {
        setIsLoading(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    fetchWithToken(`/users/data`, (data) => {
      setUser(data);
      setIsLoading(false);
    });
  };

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUser(null);
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openUpdateForm = (user) => {
    setUserToUpdate(user);
    setIsUpdateFormOpen(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateFormOpen(false);
    setUserToUpdate(null);
  };

  const handleUpdateSuccess = (updatedUser) => {
    setUser(updatedUser);
    closeUpdateForm();
  };

  if (isLoading) {
    return (
      <div className="half-circle-spinner">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
    );
  }

  return (
    <div className="profileContainer">
      <h1>My Profile</h1>
      <div className="profileCard">
        <img
          src={user.user.image}
          style={{ width: "100px", height: "100px" }}
        />
        <h4>User Name: {user.user.userName}</h4>
        <h4>Email: {user.user.email}</h4>
        <button className="btn button-74" onClick={handleLogout}>
          Log Out
        </button>
        <button className="btn button-74" onClick={() => openUpdateForm(user)}>
          Update
        </button>
        <button className="btn button-74" onClick={handleDelete}>
          Delete
        </button>

        {isUpdateFormOpen && userToUpdate && (
          <UpdateUserForm
            userToUpdate={userToUpdate}
            user={user}
            onUpdateSuccess={handleUpdateSuccess}
            onClose={closeUpdateForm}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
