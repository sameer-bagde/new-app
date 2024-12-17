// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the route for the login page */}
          <Route path="/" element={<Navigate to="/signup" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* You can add other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
