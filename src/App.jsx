import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Header from './Header';
import LoginPage from './LoginPage';
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { "id": 1, "text": "Welcome, first note!", "completed": false },
    { "id": 2, "text": "Finish all your projects", "completed": false },
    { "id": 3, "text": "Buy new a phone", "completed": false }
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedOff, setIsLoggedOff] = useState(false);
  
//add logoff func later maybe
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

  function handleLogin(user) {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setIsLoggedOff(false);
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
    
  }, []);

  if (isLoggedOff) {
    return <LoginPage />;
  }
  

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Navbar onLogout={handleLogout} />
        <div className="task-wrapper">
          <Header />
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

export default App;
