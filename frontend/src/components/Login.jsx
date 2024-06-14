import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (token) {
      // Redirect based on isAdmin
      if (isAdmin) {
        window.location.href = "/adminDashboard";
      } else {
        window.location.href = "/userdashboard";
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post(
        "http://localhost:8000/api/accounts/login/",
        {
          username: username,
          password: password,
        }
      );

      console.log(response);
      const token = response.data.access;
      const isAdmin = username === "admin";

      // Save token and isAdmin to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);

      // Redirect based on isAdmin
      if (isAdmin) {
        window.location.href = "/adminDashboard"; // Redirect to admin dashboard
      } else {
        window.location.href = "/userdashboard"; // Redirect to user dashboard
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      <p style={{ marginTop: "10px" }}>
        New user?{" "}
        <a
          href="/register"
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
