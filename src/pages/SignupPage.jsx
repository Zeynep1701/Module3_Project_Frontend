import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const myImage = event.target.image.files[0];
    const myFormData = new FormData();
    myFormData.append("image", myImage);
    myFormData.append("userName", userName);
    myFormData.append("email", email);
    myFormData.append("password", password);

    const payload = myFormData;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          body: payload,
        }
      );
      if (response.status === 201) {
        const parsed = await response.json();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input
            name="userName"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
          />
        </label>
        <label>
          Image:
          <input type="file" name="image" />
        </label>
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default SignupPage;
