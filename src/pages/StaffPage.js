import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Dashboard.css'; 

const StaffPage = () => {
  return (
    <div className="page-container">
      <div className="sidebar">
        <h2>Staff Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/lecturer/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/lecturer/course-list">Course List</Link>
            </li>
            <li>
              <Link to="/lecturer/add-result">Add Result</Link>
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

export default StaffPage;
