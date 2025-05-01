import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function RegisterPage() {
  //НЕЩО КАТО ПРОМЕНЛИВИ
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      setErrorMessage('Please, enter your name!');
      return;
    }
    if (username.trim().length === 0) {
      setErrorMessage('Please, enter username!');
      return;
    }
    if(password.length === 0) {
      setErrorMessage('Please, enter password!');
      return;
    }
    if(confirmPassword.length === 0) {
      setErrorMessage('Confirm your password');
      return;
    }
    if(password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
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
        name
        
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
        <h2>Sign up &#128221;</h2>
        <div className='info'>
        <p>To start your notes with To Do, please create account below:</p>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <br></br>
          <div className='div-register'>
          <p>Enter name:</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </div>
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
