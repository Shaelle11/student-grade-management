import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Dashboard.css'; // Add your custom styles here

const HODPage = () => {
  return (
    <div className="page-container">
      <div className="sidebar">
        <h2>HOD Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/hod/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/hod/manage-lecturers">Manage Lecturers</Link>
            </li>
            <li>
              <Link to="/hod/manage-courses">Manage Courses</Link>
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

export default HODPage;
