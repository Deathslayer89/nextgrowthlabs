import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/accounts/register/", {
        username: username,
        password: password,
        email: email,
      });
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Register error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  if (registrationSuccess) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Registration Successful!</h2>
        <p>
          You can now{" "}
          <Link to="/login" style={{ color: "#007BFF", textDecoration: "none" }}>
            login here
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Username
          </label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              boxSizing: "border-box",
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              boxSizing: "border-box",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Password
          </label>
          <input
            type="password"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              boxSizing: "border-box",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
      <div style={{ marginTop: "10px", textAlign: "center", fontSize: "14px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#007BFF", textDecoration: "none" }}>
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
