import { useNavigate } from "react-router-dom";
import React from "react";
import AppCss from "../App.css";
import booksImageHomepage from '../assets/bookloversHomeBackground.jpg'


const HomePage = () => {
  const navigate = useNavigate();

  const navigateSignup = () => {
    navigate("/signup");
  };

  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <div className="homeBackground">
     <h1>Meet your next favorite book</h1>
     <p>A warm and welcoming community of nearly three million book lovers</p>
      <button
        
        onClick={navigateSignup}
        className="btn"
      >
        Sign up
      </button>
      <button onClick={navigateLogin} className="btn">Log in</button>
      <footer />
    </div>
  );
};

export default HomePage;
