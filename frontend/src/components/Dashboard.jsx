import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login"); // Redirect to login if token doesn't exist
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/dashboard", {
          headers: {
            Authorization: token,
          },
        });
        setMessage(response.data);
      } catch (err) {
        // If token is invalid or expired, remove it from localStorage and navigate to login
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return <h1>{message}</h1>;
};

export default Dashboard;
