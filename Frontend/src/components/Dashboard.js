import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [totalCars, setTotalCars] = useState(0);
  const [error, setError] = useState(null);
  
  const { isAuthenticated, role, token } = useAuth();  
  console.log("Is Authenticated:", isAuthenticated);  
  console.log("User Role:", role);  
  console.log("Token in Dashboard:", token);  

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('https://internsala-1.onrender.com/api/cars/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCars(res.data);
        setTotalCars(res.data.length);
      } catch (err) {
        setError(err);
      }
    };

    fetchCars();
  }, [token]);

  return (
    <div className="dashboard-container"> {/* Apply the CSS class */}
      <h2>Dashboard</h2>
      {error ? (
        <p>Error fetching cars: {error.message}</p>
      ) : (
        <>
          <p>Total Cars: {totalCars}</p>
          <ul>
            {cars.map(car => (
              <li key={car._id}>{car.name} - {car.year} - ${car.price}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Dashboard;
