import React from 'react';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="lecturer-dashboard">
      <h1>Lecturer Dashboard</h1>
      <p>Welcome to your lecturer dashboard!</p>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default StaffDashboard;
