import React, { useState, useEffect } from "react";
import '../styles/ManageLecturers.css'

const ManageLecturers = () => {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem("courses")) || []);
    setLecturers(
      (JSON.parse(localStorage.getItem("loggedInStaff")) || []).filter(
        (user) => user.role === "Lecturer"
      )
    );
    setAssignments(JSON.parse(localStorage.getItem("assignments")) || []);
  }, []);

  const handleAssignCourse = () => {
    if (!selectedLecturer || !selectedCourse) {
      setError("Both lecturer and course need to be selected!");
      return;
    }

    const newAssignment = { lecturer: selectedLecturer, course: selectedCourse };
    const updatedAssignments = [...assignments, newAssignment];

    setAssignments(updatedAssignments);
    localStorage.setItem("assignments", JSON.stringify(updatedAssignments));

    setSelectedLecturer("");
    setSelectedCourse("");
    setError("");
  };

  return (
    <div className="manage-lecturers">
      <h1>Manage Lecturers</h1>

      {error && (
        <div className="error-message">
          {error}
          <button className="dismiss-btn" onClick={() => setError("")}>
            ×
          </button>
        </div>
      )}

      <div className="form-group">
        <label>Select Lecturer:</label>
        <select value={selectedLecturer} onChange={(e) => setSelectedLecturer(e.target.value)}>
          <option value="">Select Lecturer</option>
          {lecturers.map((lecturer, index) => (
            <option key={index} value={lecturer.name}>
              {lecturer.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Select Course:</label>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course.name}>
              {course.name} ({course.code})
            </option>
          ))}
        </select>
      </div>

      <button className="assign-btn" onClick={handleAssignCourse}>
        Assign Lecturer
      </button>

      <h3>Current Assignments</h3>
      <ul className="assignment-list">
        {assignments.slice(-50).map((assignment, index) => (
          <li key={index}>
            <span className="lecturer">{assignment.lecturer}</span> →{" "}
            <span className="course">{assignment.course}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLecturers;
