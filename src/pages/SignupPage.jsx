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
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} className="updateForm">
        <table>
          <tr>
            <td>User Name:</td>
            <td>
              <label>
                <input
                  name="userName"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  className="inputLoninSignin"
                  required
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <label>
                <input
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="inputLoninSignin"
                  required
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>
              <label>
                <input
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  className="inputLoninSignin"
                />
              </label>
            </td>
          </tr>
          <tr>
            <td>Image:</td>
            <td>
              <label>
                <input type="file" name="image" className="inputLoninSignin" />
              </label>
            </td>
          </tr>
        </table>

        <button className="btn button-74" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default SignupPage;
