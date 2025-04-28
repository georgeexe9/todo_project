import { useState } from 'react';
import "./LoginPage.css";
import axios from 'axios'; 


function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage,setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (password.length && username.trim() === '') {
      setErrorMessage('Please, username and password are required!');
      return;
    }
    if(username.trim() === '') {
      setErrorMessage('Username is required!');
      return;
    }
    if (password.trim() ==='') {
      setErrorMessage('Password is required!');
    }
    if(password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long!');
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:8000/users?username=${username}&password=${password}`);
      
      if (response.data.length > 0) {
  
        onLogin(response.data[0]); 
      } else {
        alert('Invalid credentials. Try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <div className="login-page">
      <h2>Login to To Do</h2>
      <p className="information-p1">Welcome! Please, enter your username and password to log in.📝</p>
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
        <button type="submit">Login</button>
        
      </form>
    </div>
  );
}

export default LoginPage;
