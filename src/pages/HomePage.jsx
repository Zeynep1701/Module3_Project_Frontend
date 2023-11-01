import { useNavigate } from "react-router-dom";

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
      <button onClick={navigateSignup}>Sign up</button>
      <button onClick={navigateLogin}>Log in</button>
    </>
  );
};

export default HomePage;
