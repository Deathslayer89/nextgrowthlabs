import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.get('https://nextlabs-8fsb.onrender.com/api/accounts/me/', config);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error.response);
      setError('Failed to fetch profile data. Please try again.');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
      {profile.username ? (
        <div className="text-center">
          <p className="mb-2"><strong>Username:</strong> {profile.username}</p>
          <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
          {/* Add more profile information as needed */}
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
      <div className="text-center mt-4">
        <Link to="/userdashboard" className="text-blue-600">Return to Dashboard</Link>
      </div>
    </div>
  );
};

export default Profile;
