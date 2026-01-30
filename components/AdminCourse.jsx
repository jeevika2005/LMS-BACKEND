// components/AdminCourses.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function AdminCourses({ user }) {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });

  useEffect(() => {
    // Fetch courses from backend (replace with your API call)
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(savedCourses);
  }, []);

  const saveCourses = (updated) => {
    setCourses(updated);
    localStorage.setItem("courses", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newCourse.title) {
      toast.error("Course title is required");
      return;
    }
    const updated = [...courses, { ...newCourse, id: Date.now() }];
    saveCourses(updated);
    setNewCourse({ title: "", description: "" });
    toast.success("Course added successfully!");
  };

  const handleDelete = (id) => {
    const updated = courses.filter((c) => c.id !== id);
    saveCourses(updated);
    toast.info("Course deleted");
  };

  const handleUpdate = (id, field, value) => {
    const updated = courses.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    saveCourses(updated);
    toast.success("Course updated");
  };

  return (
    <div className="admin-courses">
      <h2>Manage Courses</h2>

      {/* Add New Course */}
      <div className="add-course">
        <input
          type="text"
          placeholder="Course Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Course Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add Course</button>
      </div>

      {/* List Courses */}
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <input
              type="text"
              value={course.title}
              onChange={(e) =>
                handleUpdate(course.id, "title", e.target.value)
              }
            />
            <input
              type="text"
              value={course.description}
              onChange={(e) =>
                handleUpdate(course.id, "description", e.target.value)
              }
            />
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCourses;
