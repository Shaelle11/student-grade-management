import React from 'react';
import { useNavigate } from 'react-router-dom';

const HODDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="hod-dashboard">
      <h1>HOD (Admin) Dashboard</h1>
      <p>Welcome to the HOD dashboard!</p>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default HODDashboard;
