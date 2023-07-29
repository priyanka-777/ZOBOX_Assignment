
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;
const routes = require("./routes/ToDoRoute");

app.use(bodyParser.json());
app.use(cors());

const tasksFilePath = './tasks.json';

function readTasksFile() {
  try {
    const data = fs.readFileSync(tasksFilePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeTasksFile(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Routes
app.use(routes); 
/*
app.get('/tasks', (req, res) => {
  const tasks = readTasksFile();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const tasks = readTasksFile();
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  writeTasksFile(tasks);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const tasks = readTasksFile();
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].title = req.body.title;
    writeTasksFile(tasks);
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found.' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const tasks = readTasksFile();
  const taskId = parseInt(req.params.id);
  const updatedTasks = tasks.filter((task) => task.id !== taskId);

  if (tasks.length === updatedTasks.length) {
    res.status(404).json({ message: 'Task not found.' });
  } else {
    writeTasksFile(updatedTasks);
    res.json({ message: 'Task deleted successfully.' });
  }
});*/

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




