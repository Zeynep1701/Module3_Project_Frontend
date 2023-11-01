import { useNavigate } from "react-router-dom";
import AppCss from "../App.css";
import booksImageHomepage from '../assets/booklovers_home_background.jpg'


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
      <button
        onClick={navigateSignup}
        className="bg-customBlue text-customOrange font-roboto p-4 rounded"
      >
        Sign up
      </button>
      <button onClick={navigateLogin}>Log in</button>
    </div>
  );
};

export default HomePage;
