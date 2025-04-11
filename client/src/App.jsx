import { useState, useEffect } from 'react';
import './App.css';
// import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Fetch tasks from server on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:1234/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    try {
      const res = await fetch('http://localhost:1234/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTaskText.trim() }),
      });
      const createdTask = await res.json();
      setTasks([...tasks, createdTask]);
      setNewTaskText('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:1234/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:1234/api/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">My To-Do List</h1>

        {/* New Task Form */}
        <form onSubmit={addTask} className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-2 py-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded p-2"
            >
              <div
                className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => toggleTask(task.id, task.completed)}
              >
                {task.text}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;