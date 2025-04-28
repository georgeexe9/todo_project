import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useState } from "react";
import './MainApp.css'

function MainApp({ onLogout }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Welcome, first note!", completed: false },
    { id: 2, text: "Finish all your projects", completed: false },
    { id: 3, text: "Buy a new phone", completed: false }
  ]);

  function addTask(text) {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks(prev => [newTask, ...prev]);
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  return (
    <>
    <div className="app-container">
      <Navbar onLogout={onLogout} />
      <div className="task-wrapper">
        <Header />
        <TaskForm addTask={addTask} />
        <Routes>
          <Route path="/" element={<TaskList view="todo" tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />} />
          <Route path="/completed" element={<TaskList view="completed" tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />} />
          <Route path="/uncompleted" element={<TaskList view="uncompleted" tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />} />
        </Routes>
      </div>
      </div>
    </>
  );
}

export default MainApp;
