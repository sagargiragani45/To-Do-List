const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Middleware
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // Allow requests from Live Server

app.use(express.json());

// In-memory task list
let tasks = [];

// Routes
app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
    const { name, dueDate } = req.body;
    const newTask = { id: Date.now(), name, dueDate, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) task.completed = !task.completed;
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.status(204).send();
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
