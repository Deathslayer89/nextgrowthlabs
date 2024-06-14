import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Points = () => {
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchPointsData();
    }
  }, [navigate]);

  const fetchPointsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/main/user-points/', config);
      setPoints(response.data.total_points);
    } catch (error) {
      console.error('Error fetching points data:', error.response);
      setError('Failed to fetch points data. Please try again.');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Points</h2>
        <p className="text-xl text-center text-gray-700 mb-4">You have <span className="font-bold text-blue-600">{points}</span> points.</p>
        <div className="text-center">
          <Link to="/userdashboard" className="text-blue-600 hover:text-blue-800 transition duration-300">Return to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Points;
