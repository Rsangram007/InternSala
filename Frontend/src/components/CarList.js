import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import { Link } from 'react-router-dom';
import './CarList.css'; // Import the CSS file

function CarList() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const { token, role } = useAuth(); // Get role from Auth context

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('https://internsala-1.onrender.com/api/cars/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(res.data);
      } catch (err) {
        setError(err);
      }
    };

    if (token) {
      fetchCars();
    }
  }, [token]);

  return (
    <div className="car-list-container"> {/* Apply the CSS class */}
      <h2>Car List</h2>
      {error && <p className="error-message">Error fetching cars: {error.message}</p>}
      <ul>
        {cars.map(car => (
          <li key={car._id} className="car-list-item"> {/* Add class for styling */}
            <span>{car.name} - {car.year} - ${car.price}</span>
            {/* Conditionally render the edit link based on user role */}
            {role === 'admin' && (
              <Link to={`/edit-car/${car._id}`} className="edit-link">Edit</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
