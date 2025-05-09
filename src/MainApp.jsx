import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import AboutPage from "./AboutPage";
import { useState, useEffect } from "react";
import './Mainapp.css';

function MainApp({user}) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const toggleAbout = () => setShowAbout(!showAbout);
  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then(res => res.json())
      .then(data => {
        //филтриране
        const userTasks = data.filter(task => task.userId === user.id);
        setTasks(userTasks);
      })
      .catch(err => console.error("Error loading tasks:", err));
  }, [user.id]);
  

  

  function addTask(text) {
    const newTask = { text, completed: false, userId: user.id};

    fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(prev => [data, ...prev]);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function toggleTask(id) {
    const taskToUpdate = tasks.find(task => task.id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(prev => prev.map(task =>
          task.id === id ? data : task
        ));
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function deleteTask(id) {
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(prev => prev.filter(task => task.id !== id));
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  const onLogout = () => {
    setUser(null);
  };


  return (
    <div className="app-container">
      <Navbar onLogout={onLogout} />
      <div className="task-wrapper">
        <Header currentUser={user}/>
        <TaskForm addTask={addTask} />
        <Routes>
          <Route
            path="/"
            element={<TaskList view="todo" tasks={tasks.filter(task => !task.completed)} toggleTask={toggleTask} deleteTask={deleteTask} />}
          />
          <Route
            path="/completed"
            element={<TaskList view="completed" tasks={tasks.filter(task => task.completed)} toggleTask={toggleTask} deleteTask={deleteTask} />}
          />
          <Route
            path="/uncompleted"
            element={<TaskList view="uncompleted" tasks={tasks.filter(task => !task.completed)} toggleTask={toggleTask} deleteTask={deleteTask} />}
          />
          <Route path="/about" onClick={toggleAbout} element={<AboutPage />} />
        </Routes>
        {showAbout && <AboutPage />}
      </div>
    </div>
  );
}

export default MainApp;wqfqewgeaw
