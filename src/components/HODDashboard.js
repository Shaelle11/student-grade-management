import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HODDashboard.css";

const HODDashboard = () => {
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalLecturers, setTotalLecturers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedStudents = JSON.parse(localStorage.getItem("loggedInStaff")) || [];
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const storedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];

    // Filter data
    const students = storedStudents.filter(user => user.role === "Student");
    const lecturers = storedStudents.filter(user => user.role === "Lecturer");

    // Set state with actual values
    setTotalStudents(students.length);
    setTotalLecturers(lecturers.length);
    setTotalCourses(storedCourses.length);
    setRecentActivities(storedAssignments.slice(-10)); // Show the last 5 assignments
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="hod-dashboard">
      {/* Top Header */}
      <header className="dashboard-header">
        <h1>HOD Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      {/* Overview Cards */}
      <div className="dashboard-overview">
        <div className="overview-card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div className="overview-card">
          <h3>Total Lecturers</h3>
          <p>{totalLecturers}</p>
        </div>
        <div className="overview-card">
          <h3>Total Courses</h3>
          <p>{totalCourses}</p>
        </div>
      </div>
      <section className="manage-section">
      <h2>Manage</h2>
        <div className="manage-buttons">
          <button className="manage-btn" onClick={() => navigate("/manage-students")}>
            Manage Students
          </button>
          <button className="manage-btn" onClick={() => navigate("/hod/manage-lecturers")}>
            Manage Lecturers
          </button>
          <button className="manage-btn" onClick={() => navigate("/hod/manage-courses")}>
            Manage Courses
          </button>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="recent-activities">
        <h2>Recent Activities</h2>
        {recentActivities.length > 0 ? (
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>
                {activity.lecturer} was assigned to {activity.course}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activities.</p>
        )}
      </section>
    </div>
  );
};

export default HODDashboard;
