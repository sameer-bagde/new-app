// src/pages/login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For displaying login message
  const navigate = useNavigate(); // Hook to navigate to a different route

  // Handle email input change
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle password input change
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (response.data.message === 'Login successful.') {
        setMessage('Login successful!');
        navigate('./');

      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login Form</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Login;
 