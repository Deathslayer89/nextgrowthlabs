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
        "https://nextlabs-8fsb.onrender.com/api/accounts/login/",
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block mb-1">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <p className="mt-4">
        New user?{" "}
        <a
          href="/register"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
