import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import './EditCar.css'; // Import the CSS file

function EditCar() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`https://internsala-1.onrender.com/api/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setName(res.data.name);
        setYear(res.data.year);
        setPrice(res.data.price);
      } catch (err) {
        console.error(err);
        setError('Error fetching car data'); // Set error message if fetching fails
      }
    };

    fetchCar();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://internsala-1.onrender.com/api/cars/${id}`, { name, year, price }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Error updating car data'); // Set error message if updating fails
    }
  };

  return (
    <div className="edit-car-container"> {/* Apply the CSS class */}
      <h2>Edit Car</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Car Name"
          required
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Manufacturing Year"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
}

export default EditCar;
