import React, { useState, useEffect } from "react";
import '../styles/managecourses.css';


const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    units: "",
    level: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem("courses")) || []);
  }, []);

  const sortCourses = (coursesList) => {
    return coursesList.sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      if (a.units !== b.units) return b.units - a.units;
      return a.name.localeCompare(b.name);
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateCourse = () => {
    if (!form.name || !form.code || !form.units || !form.level) {
      setError("All fields are required!");
      return;
    }

    const updatedCourses = [...courses];
    const newCourse = {
      name: form.name,
      code: form.code,
      units: parseInt(form.units),
      level: parseInt(form.level),
    };

    if (editingIndex !== null) {
      updatedCourses[editingIndex] = newCourse;
    } else {
      updatedCourses.push(newCourse);
    }

    const sortedCourses = sortCourses(updatedCourses);
    setCourses(sortedCourses);
    localStorage.setItem("courses", JSON.stringify(sortedCourses));

    setForm({ name: "", code: "", units: "", level: "" });
    setEditingIndex(null);
    setError("");
  };

  const handleEditCourse = (index) => {
    setForm(courses[index]);
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

      {error && (
        <div className="error-message">
          {error}
          <button className="dismiss-btn" onClick={() => setError("")}>×</button>
        </div>
      )}

      <div className="form-section">
        <h3>{editingIndex !== null ? "Edit Course" : "Add New Course"}</h3>
        <div className="form-group">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Course Name" />
          <input type="text" name="code" value={form.code} onChange={handleChange} placeholder="Course Code" />
          <input type="number" name="units" value={form.units} onChange={handleChange} placeholder="Course Units" />
          <input type="number" name="level" value={form.level} onChange={handleChange} placeholder="Course Level" />
        </div>
        <button className="action-btn" onClick={handleAddOrUpdateCourse}>
          {editingIndex !== null ? "Update Course" : "Add Course"}
        </button>
      </div>

      <div className="courses-section">
        <h3>Available Courses</h3>
        {courses.length > 0 ? (
          <table>
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
                    <button className="edit-btn" onClick={() => handleEditCourse(index)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteCourse(index)}>Delete</button>
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
