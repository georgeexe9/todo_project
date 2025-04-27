import { useState } from 'react'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import "./App.css";

function App() {

  const [tasks,setTasks] = useState([]);
  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  }
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="task-wrapper">
        <TaskForm addTask={addTask} />
        <Routes>
            <Route
              path="/"
              element={<TaskList view="todo" tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />}
            />
            <Route
              path="/completed"
              element={<TaskList view="completed" tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />}
            />
            <Route
              path="/uncompleted"
              element={<TaskList view="uncompleted" tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
