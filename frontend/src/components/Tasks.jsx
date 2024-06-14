import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/main/tasks/completed/', config);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching completed tasks:', error.response);
      setError('Failed to fetch completed tasks. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Completed Tasks</h2>
        <Link to="/userdashboard" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200">
          Go back to dashboard
        </Link>
      </div>
      {tasks.length === 0 && <p className="text-center">No completed tasks.</p>}
      {tasks.map(task => (
        <div key={task.id} className="border-b border-gray-200 pb-2 mb-4">
          <div className="flex items-center mb-2">
            <img src={task.app_image} alt="App Logo" className="h-10 w-10 rounded-full mr-2" />
            <p className="font-semibold">{task.taskname}</p>
          </div>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          {task.screenshot && (
            <div className="flex items-center">
              <p className="mr-2">Screenshot:</p>
              <img src={task.screenshot} alt="Task Screenshot" className="h-20 w-20 rounded-lg border border-gray-300" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tasks;
