import React, { useState, useEffect } from "react";

const AddResult = () => {
  const [courses, setCourses] = useState([]); // Lecturer's assigned courses
  const [students, setStudents] = useState({}); // Students per course
  const [scores, setScores] = useState({}); // Scores entered by lecturer
  const [expandedCourse, setExpandedCourse] = useState(null);
  const lecturerId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch all assignments and courses
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];

    // Filter courses assigned to this lecturer
    const assignedCourses = assignments
      .filter((assignment) => assignment.lecturer === lecturerId)
      .map((assignment) =>
        storedCourses.find((course) => course.name === assignment.course)
      )
      .filter((course) => course);

    setCourses(assignedCourses);

    // Load students for each assigned course
    const studentsPerCourse = {};
    assignedCourses.forEach((course) => {
      const registeredStudents =
        JSON.parse(localStorage.getItem(`students_${course.code}`)) || [];
      studentsPerCourse[course.code] = registeredStudents.map((studentId) => {
        const studentData =
          JSON.parse(localStorage.getItem(`student_${studentId}`)) || {}; // Assuming student data is stored separately
        return { id: studentId, name: studentData.name || "Unknown Student" };
      });
    });

    setStudents(studentsPerCourse);
  }, [lecturerId]);

  const toggleCourse = (courseCode) => {
    setExpandedCourse(expandedCourse === courseCode ? null : courseCode);
  };

  const handleScoreChange = (courseCode, studentId, field, value) => {
    setScores((prevScores) => {
      const updatedScores = {
        ...prevScores,
        [courseCode]: {
          ...prevScores[courseCode],
          [studentId]: {
            ...prevScores[courseCode]?.[studentId],
            [field]: value,
          },
        },
      };

      // Auto-calculate total score
      const ca1 = parseFloat(updatedScores[courseCode][studentId]?.ca1) || 0;
      const ca2 = parseFloat(updatedScores[courseCode][studentId]?.ca2) || 0;
      const exam = parseFloat(updatedScores[courseCode][studentId]?.exam) || 0;
      updatedScores[courseCode][studentId].total = ca1 + ca2 + exam;

      return updatedScores;
    });
  };

  const handleSaveScores = (courseCode) => {
    const storedResults = JSON.parse(localStorage.getItem("results")) || {};
    storedResults[courseCode] = { ...storedResults[courseCode], ...scores[courseCode] };

    localStorage.setItem("results", JSON.stringify(storedResults));
    alert("Scores saved successfully!");
  };

  const handleDeleteScore = (courseCode, studentId) => {
    setScores((prevScores) => {
      const updatedScores = { ...prevScores };
      delete updatedScores[courseCode][studentId];

      return updatedScores;
    });

    // Also remove from localStorage
    const storedResults = JSON.parse(localStorage.getItem("results")) || {};
    if (storedResults[courseCode]) {
      delete storedResults[courseCode][studentId];
      localStorage.setItem("results", JSON.stringify(storedResults));
    }

    alert("Score deleted successfully!");
  };

  return (
    <div className="add-result">
      <h1>Manage Results</h1>

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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(students[course.code] || []).map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>
                          <input
                            type="number"
                            value={scores[course.code]?.[student.id]?.ca1 || ""}
                            onChange={(e) =>
                              handleScoreChange(course.code, student.id, "ca1", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={scores[course.code]?.[student.id]?.ca2 || ""}
                            onChange={(e) =>
                              handleScoreChange(course.code, student.id, "ca2", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={scores[course.code]?.[student.id]?.exam || ""}
                            onChange={(e) =>
                              handleScoreChange(course.code, student.id, "exam", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          {scores[course.code]?.[student.id]?.total || 0}
                        </td>
                        <td>
                          <button onClick={() => handleDeleteScore(course.code, student.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={() => handleSaveScores(course.code)}>Save Scores</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AddResult;
