import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

      const response = await axios.get('http://localhost:8000/api/accounts/me/', config);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error.response);
      setError('Failed to fetch profile data. Please try again.');
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '50px' }}>
      <h2>Profile</h2>
      {profile.username ? (
        <div>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {/* Add more profile information as needed */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
