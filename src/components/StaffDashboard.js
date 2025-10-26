import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Staff.css";

const StaffDashboard = () => {
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear stored user ID
    localStorage.removeItem("userRole"); // Clear stored user role
    navigate("/"); // Redirect to the homepage or login page
  };

  return (
    <div className="staff-dashboard">
      {/* Dashboard Header Section */}
      <div className="dashboard-header">
        <h1>Lecturer Dashboard</h1>
        <p className="message_p">Welcome back! Manage your courses and students efficiently.</p>
      </div>

      {/* Navigation Links for Lecturer Actions */}
      <div className="dashboard-actions">
        <Link to="/lecturer/course-list" className="dashboard-button">
          📚 View Courses
        </Link>
        <Link to="/lecturer/add-result" className="dashboard-button">
          📝 Add Results
        </Link>
        <Link to="/lecturer/manage-students" className="dashboard-button">
          👥 Manage Students
        </Link>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        🚪 Logout
      </button>
    </div>
  );
};

export default StaffDashboard;
