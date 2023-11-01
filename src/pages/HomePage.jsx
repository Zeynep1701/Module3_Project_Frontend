import { useNavigate } from "react-router-dom";
import AppCss from "../App.css";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateSignup = () => {
    navigate("/signup");
  };

  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={navigateSignup}
        className="bg-customBlue text-customOrange font-roboto p-4 rounded"
      >
        Sign up
      </button>
      <button onClick={navigateLogin}>Log in</button>
    </>
  );
};

export default HomePage;
