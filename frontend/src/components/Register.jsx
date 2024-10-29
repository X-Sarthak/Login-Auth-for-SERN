import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Assuming you're using react-router for navigation();  // Assuming you're using react-router for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      alert("User registered successfully");
    } catch (err) {
      alert("Error registering user");
    }
  };

 const handleLoginClick = () => {
    navigate("/login"); // Navigate to the /register route
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <button type="button" onClick={handleLoginClick}>
        Login
      </button>
    </>
  );
};

export default Register;
