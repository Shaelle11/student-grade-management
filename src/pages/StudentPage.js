import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Dashboard.css'

const StudentPage = () => {
  return (
    <div className="page-container">
      <div className="sidebar">
        <h2>Student Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/student/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/student/register-courses">Register Courses</Link>
            </li>
            <li>
              <Link to="/student/course-overview">Course Overview</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <Outlet /> {/* This will render the child route components */}
      </div>
    </div>
  );
};

export default StudentPage;
