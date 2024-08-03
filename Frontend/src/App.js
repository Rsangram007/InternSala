import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import EditCar from './components/EditCar';
import Header from './components/Header';
import AuthProvider, { useAuth } from './components/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute role="admin"><Dashboard /></PrivateRoute>} />
          <Route path="/cars" element={<PrivateRoute><CarList /></PrivateRoute>} />
          <Route path="/add-car" element={<PrivateRoute role="admin"><AddCar /></PrivateRoute>} />
          <Route path="/edit-car/:id" element={<PrivateRoute role="admin"><EditCar /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function PrivateRoute({ children, role }) {
  const { isAuthenticated, role: userRole } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }
  return children;
}

export default App;
