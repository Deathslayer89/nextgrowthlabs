import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AppForm = () => {
  const [appname, setAppName] = useState("");
  const [appcategory, setAppCategory] = useState("");
  const [applink, setAppLink] = useState("");
  const [points, setPoints] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("appname", appname);
      formData.append("appcategory", appcategory);
      formData.append("applink", applink);
      formData.append("points", points);
      formData.append("image", image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post("http://localhost:8000/api/main/apps/create/", formData, config);
      setSuccess(true);
      setAppName("");
      setAppCategory("");
      setAppLink("");
      setPoints(0);
      setImage(null);
    } catch (error) {
      console.error("Add App Error:", error);
      setError("Failed to add app. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  if (success) {
    return <p>App added successfully!</p>;
  }

  return (
    <div>
      <h2>Add New App</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>App Name:</label>
          <input
            type="text"
            value={appname}
            onChange={(e) => setAppName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>App Category:</label>
          <input
            type="text"
            value={appcategory}
            onChange={(e) => setAppCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>App Link:</label>
          <input
            type="url"
            value={applink}
            onChange={(e) => setAppLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Points:</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            required
          />
        </div>
        <div>
          <label>App Image:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <div>
          <button type="submit">Add App</button>
        </div>
      </form>
    </div>
  );
};

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  if (!token || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <AppForm />
    </div>
  );
};

export default AdminDashboard;
