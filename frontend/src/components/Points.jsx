import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Points = () => {
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPointsData();
  }, []);

  const fetchPointsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.get('https://nextlabs-8fsb.onrender.com/api/main/user-points/', config);
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
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Points</h2>
      <p className="text-center mb-4">You have {points} points.</p>
      {/* Add more points related information as needed */}
      <div className="text-center">
        <Link to="/userdashboard" className="text-blue-600">Return to Dashboard</Link>
      </div>
    </div>
  );
};

export default Points;
