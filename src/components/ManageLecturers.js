import React, { useState, useEffect } from 'react';

const ManageLecturers = () => {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  
    // Fetching from "loggedInStaff" instead of "loggedInLecturers"
    const storedLecturers = JSON.parse(localStorage.getItem("loggedInStaff")) || [];
    setLecturers(storedLecturers.filter(user => user.role === "Lecturer"));
  
    const storedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(storedAssignments);
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
      <h3>Assign Lecturers to Courses</h3>

      <label>Select Lecturer:</label>
      <select value={selectedLecturer} onChange={(e) => setSelectedLecturer(e.target.value)}>
        <option value="">Select Lecturer</option>
        {lecturers.length > 0 ? (
          lecturers.map((lecturer, index) => (
            <option key={index} value={lecturer.name}>{lecturer.name}</option>
          ))
        ) : (
          <option>No lecturers available</option>
        )}
      </select>

      <label>Select Course:</label>
      <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Select Course</option>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <option key={index} value={course.name}>{course.name} ({course.code})</option>
          ))
        ) : (
          <option>No courses available</option>
        )}
      </select>

      {error && <p className="error-message">{error}</p>}

      <button onClick={handleAssignCourse}>Assign Lecturer</button>

      <h3>Current Assignments</h3>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index}>{assignment.lecturer} is assigned to {assignment.course}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLecturers;
