import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token on load and get user role
      axios.get('https://internsala-1.onrender.com/api/cars/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setIsAuthenticated(true);
        // Assuming the role is part of the response. Adjust accordingly.
        setRole(response.data.role);
      })
      .catch(() => {
        // If the token is invalid or expired, clear it
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setRole('');
      });
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   console.log("Token on load:", token); // Log the token retrieved on load
  //   if (token) {
  //     const decodedToken = JSON.parse(atob(token.split('.')[1]));
  //     setIsAuthenticated(true);
  //     setRole(decodedToken.role); // Set role from decoded token
  //   } else {
  //     setIsAuthenticated(false);
  //     setRole('');
  //   }
  // }, []);
  

  const login = (token) => {
    console.log("Setting token:", token);
    localStorage.setItem('token', token);
    setToken(token); // Store the token in state
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setIsAuthenticated(true);
    setRole(decodedToken.role);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null); // Clear token on logout
    setIsAuthenticated(false);
    setRole('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
