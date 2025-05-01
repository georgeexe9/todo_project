import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MainApp from "./MainApp";

function App() {
  const [user, setUser] = useState(null);

  function handleLogin(user) {
    return fetch(`http://localhost:8000/users/${user.id}`)
      .then(res => res.json())
      .then(fullUser => {
        setUser(fullUser);
        localStorage.setItem('currentUser', JSON.stringify(fullUser));
      });
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage />} />
     
      <Route
        path="/*"
        element={
          user ? (
            <MainApp user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      
    </Routes>
  );
}

export default App;
