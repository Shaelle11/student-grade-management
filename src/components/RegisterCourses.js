import React, { useState, useEffect, useRef } from "react";
import "../styles/CourseList.css"

const RegisterCourses = () => {
  const [courses, setCourses] = useState([]); // Available courses
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const tableRef = useRef(null);
  const studentId = localStorage.getItem("userId");

  // ✅ Load available & registered courses when component mounts
  useEffect(() => {
    const allCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    // Fetch assigned courses
    const assignedCourses = allCourses.filter(course =>
      assignments.some(assign => assign.course === course.name)
    );
    setCourses(assignedCourses);

    // Fetch registered courses for this student
    const storedRegistered = JSON.parse(localStorage.getItem(`registeredCourses_${studentId}`)) || [];
    setRegisteredCourses(storedRegistered);
  }, [studentId]);

  // ✅ Register a new course
  const handleRegisterCourse = (course) => {
    if (registeredCourses.some(rc => rc.code === course.code)) {
      alert("You have already registered for this course!");
      return;
    }

    const updatedCourses = [...registeredCourses, course];
    setRegisteredCourses(updatedCourses);
    localStorage.setItem(`registeredCourses_${studentId}`, JSON.stringify(updatedCourses));

    // Store student under the course in localStorage
    const registeredStudents = JSON.parse(localStorage.getItem(`students_${course.code}`)) || [];
    if (!registeredStudents.includes(studentId)) {
      registeredStudents.push(studentId);
      localStorage.setItem(`students_${course.code}`, JSON.stringify(registeredStudents));
    }
  };

  // ✅ Remove a course from registration
  const handleRemoveCourse = (index) => {
    if (!window.confirm("Are you sure you want to remove this course?")) return;

    const updatedCourses = registeredCourses.filter((_, i) => i !== index);
    setRegisteredCourses(updatedCourses);
    localStorage.setItem(`registeredCourses_${studentId}`, JSON.stringify(updatedCourses));
  };

  // ✅ Print the table
 // ✅ Print the table (without "Level" and "Actions" columns)
const handlePrint = () => {
  const printWindow = window.open("", "_blank");
  let tableHTML = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="border: 1px solid black; padding: 8px; text-align: center;">S/N</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center;">Course Name</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center;">Code</th>
          <th style="border: 1px solid black; padding: 8px; text-align: center;">Units</th>
        </tr>
      </thead>
      <tbody>
        ${registeredCourses
          .map(
            (course, index) => `
          <tr>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${index + 1}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${course.name}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${course.code}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${course.units}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  printWindow.document.write(`
    <html>
      <head>
        <title>Registered Courses</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 8px; text-align: center; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Registered Courses</h2>
        ${tableHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};


  return (
    <div className="register-courses">
      <h1>Course Registration</h1>

      {/* Available Courses Section */}
      <h2>Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available for registration.</p>
      ) : (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              {course.name} ({course.code}) - {course.units} units - Level {course.level}
              <button onClick={() => handleRegisterCourse(course)}>Register</button>
            </li>
          ))}
        </ul>
      )}

      {/* Registered Courses Section */}
      <h2>My Registered Courses</h2>
      {registeredCourses.length === 0 ? (
        <p>You have not registered for any courses yet.</p>
      ) : (
        <>
          <table ref={tableRef} border="1">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Course Name</th>
                <th>Code</th>
                <th>Units</th>
                <th>Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registeredCourses.map((course, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.units}</td>
                  <td>{course.level}</td>
                  <td>
                    <button onClick={() => handleRemoveCourse(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handlePrint}>Print Table</button>
        </>
      )}
    </div>
  );
};

export default RegisterCourses;
