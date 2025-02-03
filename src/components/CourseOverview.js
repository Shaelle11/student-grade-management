import React, { useState, useEffect } from "react";

const CourseOverview = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState({});
  const [results, setResults] = useState({});
  const [expandedCourse, setExpandedCourse] = useState(null);

  const lecturerId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch courses assigned to lecturer
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];

    const assignedCourses = assignments
      .filter((assignment) => assignment.lecturer === lecturerId)
      .map((assignment) =>
        storedCourses.find((course) => course.name === assignment.course)
      )
      .filter((course) => course);

    setCourses(assignedCourses);

    // Fetch students and results per course
    const studentsPerCourse = {};
    const resultsPerCourse = JSON.parse(localStorage.getItem("results")) || {};

    assignedCourses.forEach((course) => {
      const registeredStudents =
        JSON.parse(localStorage.getItem(`students_${course.code}`)) || [];
      studentsPerCourse[course.code] = registeredStudents.map((studentId) => {
        const studentData =
          JSON.parse(localStorage.getItem(`student_${studentId}`)) || {};
        return { id: studentId, name: studentData.name || "Unknown Student" };
      });
    });

    setStudents(studentsPerCourse);
    setResults(resultsPerCourse);
  }, [lecturerId]);

  const toggleCourse = (courseCode) => {
    setExpandedCourse(expandedCourse === courseCode ? null : courseCode);
  };

  return (
    <div className="course-overview">
      <h1>Course Overview</h1>

      {courses.length === 0 ? (
        <p>No courses assigned to you.</p>
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
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>First CA</th>
                      <th>Second CA</th>
                      <th>Exam</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(students[course.code] || []).map((student, index) => {
                      const studentScores =
                        results[course.code]?.[student.id] || {};

                      return (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td>{student.id}</td>
                          <td>{student.name}</td>
                          <td>{studentScores.ca1 || "N/A"}</td>
                          <td>{studentScores.ca2 || "N/A"}</td>
                          <td>{studentScores.exam || "N/A"}</td>
                          <td>{studentScores.total || "N/A"}</td>
                        </tr>
                      );
                    })}
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
