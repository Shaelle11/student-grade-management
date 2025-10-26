import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Student.css';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate('/');
  };

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>🎓 Student Dashboard</h1>
        <p className="welcome-message">Welcome! Access your courses, results, and profile here.</p>
      </div>

      <div className="dashboard-actions">
        <Link to="/student/register-courses" className="dashboard-button">
          📚 View or Register Courses
        </Link>
        <Link to="/student/course-overview" className="dashboard-button">
          📊 View Results
        </Link>
        <Link to="/student/profile" className="dashboard-button">
          🏷️ View Profile
        </Link>
      </div>

      <button onClick={handleLogout} className="logout-button">
        🚪 Logout
      </button>
    </div>
  );
};

export default StudentDashboard;
