import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

      const response = await axios.get('http://localhost:8000/api/main/user-points/', config);
      setPoints(response.data.total_points);
      console.log(response);
    } catch (error) {
      console.error('Error fetching points data:', error.response);
      setError('Failed to fetch points data. Please try again.');
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '50px' }}>
      <h2>Points</h2>
      <p>You have {points} points.</p>
      {/* Add more points related information as needed */}
    </div>
  );
};

export default Points;
