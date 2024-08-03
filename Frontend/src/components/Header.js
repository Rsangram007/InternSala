import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './Header.css'; // Import the CSS file

function Header() {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="nav">
        {isAuthenticated ? (
          <>
            {role === 'admin' && <Link className="nav-link" to="/dashboard">Dashboard</Link>}
            {role === 'admin' && <Link className="nav-link" to="/add-car">Add Car</Link>}
            <Link className="nav-link" to="/cars">Cars</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

