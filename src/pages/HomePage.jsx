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
     <h1 style={{ fontSize: 100 }}>Meet your next</h1>
    <h1 style={{ fontSize: 100 }}>favorite book</h1>
     <h2>A warm and welcoming community of nearly three million book lovers</h2>
      <button
        
        onClick={navigateSignup}
        className="btn"
      >
        <h2>Sign up</h2>
      </button>
      <button onClick={navigateLogin} className="btn"><h2>Login</h2></button>
      <footer />
    </div>
  );
};

export default HomePage;
