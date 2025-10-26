import React, { useState, useEffect } from "react";
import "../styles/CourseList.css"; // Ensure you have appropriate styles

const CourseList = () => {
  const [assignedCourses, setAssignedCourses] = useState([]);
  const lecturerId = localStorage.getItem("userId");

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const storedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];

    const lecturerCourses = storedAssignments
      .filter((assignment) => assignment.lecturer === lecturerId)
      .map((assignment) => storedCourses.find((course) => course.name === assignment.course))
      .filter(Boolean);

    setAssignedCourses(lecturerCourses);
  }, []);

  return (
    <div className="course-list-container">
      <h1 className="course-list-title">Lecturer's Course List</h1>
      {assignedCourses.length === 0 ? (
        <p className="no-courses">No courses assigned to you.</p>
      ) : (
        <ul className="course-list">
          {assignedCourses.map((course) => (
            <li key={course.code} className="course-item">
              <span className="course-name">{course.name}</span>
              <span className="course-code">({course.code})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;
