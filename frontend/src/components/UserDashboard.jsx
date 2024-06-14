import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

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

      const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/main/tasks/pending/', config);
      console.log(response);
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

      const response = await axios.put(`{process.env.REACT_APP_BACKEND_URL}/api/main/tasks/${currentTaskId}/complete/`, formData, config);
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
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Welcome to your Dashboard</h2>
          <p className="text-gray-600 text-sm">Manage your tasks and activities here.</p>
        </div>
      </div>
      
      <div className="mb-4 flex flex-col">
        <Link to="/profile" className="text-blue-600 mb-2">Profile</Link>
        <Link to="/points" className="text-blue-600 mb-2">Points</Link>
        <Link to="/completed-tasks" className="text-blue-600 mb-2">Completed Tasks</Link>
        <button onClick={handleLogout} className="btn btn-blue self-end">Logout</button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pending Tasks</h3>
        {pendingTasks.length === 0 && <p className="text-gray-600">No pending tasks.</p>}
        {pendingTasks.map(task => (
          <div key={task.id} className="border-b border-gray-200 pb-2 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {task.app_image && (
                  <img src={task.app_image} alt="App Logo" className="w-8 h-8 mr-2" />
                )}
                <div>
                  <p className="font-semibold">{task.taskname}</p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              </div>
              <button onClick={() => setCurrentTaskId(task.id)} className="btn btn-sm">Complete Task</button>
            </div>
            {currentTaskId === task.id && (
              <div className="border border-gray-300 p-4 mt-2 rounded">
                <div 
                  onDrop={handleFileDrop} 
                  onDragOver={(e) => e.preventDefault()} 
                  className="mb-2 text-center"
                >
                  Drag & Drop Screenshot Here to Complete Task or 
                  <input type="file" onChange={handleFileSelect} className="mt-2"/>
                </div>
                {screenshotFile && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">File selected: {screenshotFile.name}</p>
                    <button onClick={handleCompleteTask} className="btn btn-green mt-2">Submit</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default UserDashboard;
