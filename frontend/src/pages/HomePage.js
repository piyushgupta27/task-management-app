import React, { useEffect, useState } from "react";
import { login } from "../services/api/apiClient";

const HomePage = () => {
  // Example usage: login and fetch tasks
  const username = "john_doe";
  const password = "securepassword";
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch tasks on component mount
    const loginUser = async () => {
      try {
        await login(username, password);
      } catch (err) {
        console.error("Error logging in user:", err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    loginUser();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <h2>Welcome to the Task Management App</h2>;
};

export default HomePage;
