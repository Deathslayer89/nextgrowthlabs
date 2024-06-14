import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingTasks();
  }, []);

  const fetchPendingTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.get('http://localhost:8000/api/main/tasks/pending/', config);
      setPendingTasks(response.data);
    } catch (error) {
      console.error('Error fetching pending tasks:', error.response);
      setError('Failed to fetch pending tasks. Please try again.');
    }
  };

  const handleCompleteTask = async () => {
    if (!screenshotFile || !currentTaskId) return;

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('screenshot', screenshotFile);
      formData.append('status', 'Completed'); // Ensure the status is updated

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.put(`http://localhost:8000/api/main/tasks/${currentTaskId}/complete/`, formData, config);
      console.log('Task completed successfully:', response.data);

      // Refresh user data after completing task
      fetchPendingTasks();
      setCurrentTaskId(null); // Reset current task
      setScreenshotFile(null); // Reset file input
    } catch (error) {
      console.error('Error completing task:', error.response);
      setError('Failed to complete task. Please try again.');
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setScreenshotFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshotFile(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '50px' }}>
      <h2>Welcome to your Dashboard</h2>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
        <Link to="/points" style={{ marginRight: '10px' }}>Points</Link>
        <Link to="/completed-tasks" style={{ marginRight: '10px' }}>Completed Tasks</Link>
        <button onClick={handleLogout} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div>
        <h3>Pending Tasks</h3>
        {pendingTasks.length === 0 && <p>No pending tasks.</p>}
        {pendingTasks.map(task => (
          <div key={task.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <p>{task.taskname}</p>
            <p>{task.description}</p>
            <button onClick={() => setCurrentTaskId(task.id)}>Complete Task</button>
            {currentTaskId === task.id && (
              <div 
                onDrop={handleFileDrop} 
                onDragOver={(e) => e.preventDefault()} 
                style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}
              >
                Drag & Drop Screenshot Here to Complete Task or 
                <input type="file" onChange={handleFileSelect} />
                {screenshotFile && (
                  <div style={{ marginTop: '10px' }}>
                    <p>File selected: {screenshotFile.name}</p>
                    <button onClick={handleCompleteTask} style={{ padding: '5px 10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Submit</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UserDashboard;
