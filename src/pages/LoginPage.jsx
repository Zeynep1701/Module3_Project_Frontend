import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { email, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 400) {
        const parsed = await response.json();
        throw new Error(parsed.message);
      }
      if (response.status === 200) {
        const parsed = await response.json();
        handleLogin(parsed.token);
        navigate("/books");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className="updateForm">
        <table>
          <tr>
            <td>Email:</td>
            <td>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="inputLoninSignin"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="inputLoninSignin"
                required
                type="password"
              />
            </td>
          </tr>
        </table>
        <button className="btn button-74" type="submit">
          Log In
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <p>By signing in, you agree to the Book Lovers Terms of Service and Privacy Policy</p>

      <p>New to Book Lovers? <Link to="/signup">Sign up!</Link></p>
    </>
  );
};

export default LoginPage;
