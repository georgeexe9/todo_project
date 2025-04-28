import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from './LoginPage';
import MainApp from './MainApp';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  function handleLogin(user) {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  return (
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/*" element={
          currentUser ? (
            <MainApp onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
  );
}

export default App;
