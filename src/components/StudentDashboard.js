import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user data from localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <p>Welcome to your student dashboard!</p>
      
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default StudentDashboard;
