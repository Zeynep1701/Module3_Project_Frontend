import AppCss from "../App.css";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { token, userId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchWithToken = async (endpoint, callback, method = "GET", body) => {
    console.log(endpoint);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    fetchWithToken(`/users/data`, (data) => {
      setUser(data);
      // setUserName(data.userName);
      // setEmail(data.email);
      // setImage(data.image);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="half-circle-spinner">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>
    );
  }

  return (
    <div>
      <h1>My Profile</h1>
      <img src={user.image} style={{ width: "100px", height: "100px" }} />
      <p>UserName: {user.userName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
