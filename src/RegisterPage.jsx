import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim().length === 0 || password.length === 0) {
      setErrorMessage('Please, enter a username and password!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setErrorMessage('Something went wrong, please try again later.');
      });
  };
  function goTologin() {
    navigate('/login');
  }

  return (
    <div className="app-container">
      <div className="register-page">
        <h2>Sign up</h2>
        <div className='info'>
        <p>To start your notes with To Do, please create account below:</p>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br></br>
          <div className='div-register'>
          <p>Enter username:</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <br></br>
          <div className='div-register'>
          <p>Password:</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <br></br>
          <div className='div-register'>
          <p>Confirm Password:</p>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </div>
          <br></br>
          <br></br>
          <div className='buttons-register'>
          <button type="submit">Register</button>
          <button type="submit" onClick={goTologin}>Have an account?</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
