import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [Tasks, setTasks] = useState([]);
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

      const response = await axios.get('http://localhost:8000/api/main/tasks/completed/', config);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error.response);
      setError('Failed to fetch completed tasks. Please try again.');
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '50px' }}>
      <h2>Completed Tasks</h2>
      {Tasks.length === 0 && <p>No completed tasks.</p>}
      {Tasks.map(task => (
        <div key={task.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <p>{task.taskname}</p>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
