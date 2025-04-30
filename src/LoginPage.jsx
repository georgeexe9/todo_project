import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (username.trim().length === 0 || password.length === 0) {
      setErrorMessage('Please, enter username and password!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/users');
      const users = await response.json();
  
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
  
      if (user) {
        await onLogin(user); 
        navigate('/');
      } else {
        setErrorMessage('-> Invalid credentials. Try again. <-');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong, please try again later.');
    }
  };
  

  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  return (
    <div className="app-container">
      <div className="login-page">
        <h2>Login</h2>
        <p className="information-p1">Welcome! To Do helps you takes great notes! Please, log in!📝</p>
        <form onSubmit={handleSubmit} className="login-form">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="p2-text">Still don't have an account? Register below!</p>
          <div className="buttons">
            <button type="submit">Login</button>
            <button type="button" className="register-button" onClick={handleRegisterRedirect}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default LoginPage;
