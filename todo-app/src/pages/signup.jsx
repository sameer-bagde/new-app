// src/pages/login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUserName] = useState('');
  const [cnfPassword, setcnfPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate to a different route

  const [message, setMessage] = useState(''); // For displaying login message
  const handleCnfPassword = (e) => setcnfPassword(e.target.value);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handelUserNameChange = (e) => setUserName(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password,
        cnfPassword
      });

      if (response.data.message === 'Register successful.') {
        setMessage('Register successful!');
        navigate('./')
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
      <h2>SignUp Form</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Username: </label>
          <input
            type="text"
            value={name}
            onChange={handelUserNameChange}
            required
          />
        </div>
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
        <div>
          <label>Conform Password: </label>
          <input
            type="password"
            value={cnfPassword}
            onChange={handleCnfPassword}
            required
          />
        </div>

        <button type="submit">SignUp</button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default SignUp;
