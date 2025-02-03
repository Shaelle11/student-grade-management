import React, { useState, useEffect } from 'react';

const CourseList = () => {
  const [assignedCourses, setAssignedCourses] = useState([]);
  const lecturerId = localStorage.getItem("userId"); // Keep it as a constant

  useEffect(() => {
    // Get the list of courses and assignments from localStorage
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const storedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];

    // Filter courses assigned to this lecturer (matching by name)
    const lecturerCourses = storedAssignments
      .filter(assignment => assignment.lecturer === lecturerId) // Ensure matching format
      .map(assignment => storedCourses.find(course => course.name === assignment.course)) // Match course details
      .filter(course => course); // Remove undefined values

    setAssignedCourses(lecturerCourses);
  }, []);

  return (
    <div>
      <h1>Lecturer's Course List</h1>
      <ul>
        {assignedCourses.length === 0 ? (
          <p>No courses assigned to you.</p>
        ) : (
          assignedCourses.map((course, index) => (
            <li key={index}>
              {course.name} ({course.code})
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CourseList;
