import React, { useState, useEffect } from "react";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseUnits, setCourseUnits] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");

  // ✅ Load courses from localStorage when the component mounts
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  // 🔹 Sort courses by Level, then Units, then Alphabetically
  const sortCourses = (coursesList) => {
    return coursesList.sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      if (a.units !== b.units) return b.units - a.units;
      return a.name.localeCompare(b.name);
    });
  };

  const handleAddOrUpdateCourse = () => {
    if (!courseName || !courseCode || !courseUnits || !courseLevel) {
      setError("All fields are required!");
      return;
    }

    let updatedCourses;
    if (editingIndex !== null) {
      // ✅ Update existing course
      updatedCourses = [...courses];
      updatedCourses[editingIndex] = {
        name: courseName,
        code: courseCode,
        units: parseInt(courseUnits),
        level: parseInt(courseLevel),
      };
    } else {
      // ✅ Add new course
      updatedCourses = [
        ...courses,
        {
          name: courseName,
          code: courseCode,
          units: parseInt(courseUnits),
          level: parseInt(courseLevel),
        },
      ];
    }

    // 🔹 Sort & Store in localStorage
    updatedCourses = sortCourses(updatedCourses);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));

    // ✅ Clear form fields
    setCourseName("");
    setCourseCode("");
    setCourseUnits("");
    setCourseLevel("");
    setEditingIndex(null);
    setError("");
  };

  const handleEditCourse = (index) => {
    const course = courses[index];
    setCourseName(course.name);
    setCourseCode(course.code);
    setCourseUnits(course.units);
    setCourseLevel(course.level);
    setEditingIndex(index);
  };

  const handleDeleteCourse = (index) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  return (
    <div className="manage-courses">
      <h1>Manage Courses</h1>

      <div>
        <h3>{editingIndex !== null ? "Edit Course" : "Add New Course"}</h3>
        <div>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Course Name"
          />
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="Course Code"
          />
          <input
            type="number"
            value={courseUnits}
            onChange={(e) => setCourseUnits(e.target.value)}
            placeholder="Course Units"
          />
          <input
            type="number"
            value={courseLevel}
            onChange={(e) => setCourseLevel(e.target.value)}
            placeholder="Course Level"
          />
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleAddOrUpdateCourse}>
            {editingIndex !== null ? "Update Course" : "Add Course"}
          </button>
        </div>
      </div>

      <div>
        <h3>Available Courses</h3>
        {courses.length > 0 ? (
          <table border="1">
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
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.units}</td>
                  <td>{course.level}</td>
                  <td>
                    <button onClick={() => handleEditCourse(index)}>Edit</button>
                    <button onClick={() => handleDeleteCourse(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;
