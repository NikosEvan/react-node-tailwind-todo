const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 1234;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173' // επετρεψε μονο requests απο αυτη τη διευθυνση
    })
);

app.use(express.json());

let tasks = []

// get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});
  
// post new task
app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Task text is required' });
  }
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/api/tasks`);
});