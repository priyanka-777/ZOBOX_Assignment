// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(API_BASE_URL, { title: newTaskTitle });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (taskId, newTitle) => {
    try {
      await axios.put(`${API_BASE_URL}/${taskId}`, { title: newTitle });
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div class="App">
    <div class="container">
      <h1>TODO App</h1>
      <div className='top'>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button className="add" onClick={handleAddTask}>Add Task</button>
      </div>
      
      <div className='list'>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) => handleEditTask(task.id, e.target.value)}
            />
            <button className='delete' onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </div>
  );
}

export default App;




