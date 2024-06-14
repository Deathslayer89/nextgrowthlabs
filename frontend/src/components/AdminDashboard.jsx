import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AppForm = ({ onSuccess }) => {
  const [appname, setAppName] = useState("");
  const [appcategory, setAppCategory] = useState("");
  const [applink, setAppLink] = useState("");
  const [points, setPoints] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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

      await axios.post("https://nextlabs-8fsb.onrender.com/api/main/apps/create/", formData, config);
      setSuccess(true);
      setAppName("");
      setAppCategory("");
      setAppLink("");
      setPoints(0);
      setImage(null);
      onSuccess(); // Call parent component's onSuccess function to reset form visibility
    } catch (error) {
      console.error("Add App Error:", error);
      setError("Failed to add app. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  if (success) {
    return (
      <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md mb-4">
        App added successfully!
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New App</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">App Name:</label>
          <input
            type="text"
            value={appname}
            onChange={(e) => setAppName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">App Category:</label>
          <input
            type="text"
            value={appcategory}
            onChange={(e) => setAppCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">App Link:</label>
          <input
            type="url"
            value={applink}
            onChange={(e) => setAppLink(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Points:</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1">App Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Add App
          </button>
        </div>
      </form>
    </div>
  );
};

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === 'true';
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  if (!token || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Welcome to Admin Dashboard</h2>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
          Logout
        </button>
        <button onClick={toggleFormVisibility} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200">
          {showForm ? "Hide Add Apps" : "Add Apps"}
        </button>
      </div>
      {showForm && <AppForm onSuccess={() => setShowForm(false)} />}
    </div>
  );
};

export default AdminDashboard;
