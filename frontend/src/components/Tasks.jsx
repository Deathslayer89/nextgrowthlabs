import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

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

      const response = await axios.get('https://nextlabs-8fsb.onrender.com/api/main/tasks/completed/', config);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error.response);
      setError('Failed to fetch completed tasks. Please try again.');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Completed Tasks</h2>
      {tasks.length === 0 && <p className="text-center">No completed tasks.</p>}
      {tasks.map(task => (
        <div key={task.id} className="border-b border-gray-200 pb-2 mb-4">
          <p className="font-semibold">{task.taskname}</p>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
