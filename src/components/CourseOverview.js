import React, { useState, useEffect } from "react";

const CourseOverview = () => {
  const [courses, setCourses] = useState([]);
  const [results, setResults] = useState({});
  const [expandedCourse, setExpandedCourse] = useState(null);
  const studentId = localStorage.getItem("userId");

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("results")) || {};
    const registeredCourses = JSON.parse(localStorage.getItem(`registeredCourses_${studentId}`)) || [];

    console.log("Student ID:", studentId);
    console.log("Stored Results:", storedResults);
    
    setCourses(registeredCourses);
    setResults(storedResults);
  }, [studentId]);

  const toggleCourse = (courseCode) => {
    setExpandedCourse(expandedCourse === courseCode ? null : courseCode);
  };

  return (
    <div className="course-overview">
      <h1>My Course Results</h1>

      {courses.length === 0 ? (
        <p>No Results yet.</p>
      ) : (
        courses.map((course) => (
          <div key={course.code} className="course-section">
            <button onClick={() => toggleCourse(course.code)}>
              {course.name} ({course.code}) ▼
            </button>

            {expandedCourse === course.code && (
              <div className="course-table">
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Course Code</th>
                      <th>First CA</th>
                      <th>Second CA</th>
                      <th>Exam</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{course.code}</td>
                      <td>{results[course.code]?.[studentId]?.ca1 || "N/A"}</td>
                      <td>{results[course.code]?.[studentId]?.ca2 || "N/A"}</td>
                      <td>{results[course.code]?.[studentId]?.exam || "N/A"}</td>
                      <td>{results[course.code]?.[studentId]?.total || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CourseOverview;
