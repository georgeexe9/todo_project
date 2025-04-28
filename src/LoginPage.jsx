import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./LoginPage.css";

import axios from 'axios'; 


function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.trim === 0 || password.length === 0) 
      {
        setErrorMessage('Please, enter username and password!')
      }
      
    else {
    
    try {
      const response = await axios.get(`http://localhost:8000/users?username=${username}&password=${password}`);
      
      if (response.data.length > 0) {
  
        onLogin(response.data[0]); 
        navigate('/');
        
      } else {
        setErrorMessage('->Invalid credentials. Try again.<-');  
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

  }
  }

  return (
    <div className="app-container">
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
        <p className='p2-text'>Still don't have account? Register below!</p>
        <div className='buttons'>
        <button type="submit">Login</button>
        <button type="submit" className='register-button'>Register</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default LoginPage;
