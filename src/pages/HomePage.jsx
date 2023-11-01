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
      <div className="homeText">
     <h1 style={{ fontSize: 120 }}>Meet your next favorite book</h1>
     <h2 style={{ fontSize: 30 }}>A warm and welcoming community of nearly 2.5 million book lovers</h2>
     </div>
      <div>
      <button
        
        onClick={navigateSignup}
        className="homeBtn"
      >
        Sign up
      </button>
      <button onClick={navigateLogin} className="homeBtn">Login</button>
      </div>
    </div>
  );
};

export default HomePage;
