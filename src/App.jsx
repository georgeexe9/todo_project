import { useState } from 'react'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TaskForm from './TaskForm';
import "./App.css";

function App() {

  const [setTasks] = useState([]);
  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  return (
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="task-wrapper">
          <TaskForm addTask={addTask} />
          </div>
        </div>
      </Router>
    );
  
}

export default App
