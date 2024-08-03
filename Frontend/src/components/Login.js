import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://internsala-1.onrender.com/api/users/login', { username, password });
      const { token } = res.data;
      login(token);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userRole = decodedToken.role;
      if (userRole === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/cars');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Assignment for Quadiro Technologies</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
