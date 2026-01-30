import '../App.css';
import { useEffect, useState } from "react";
import CourseCard from '../components/CourseCard';

export default function MyCourses({ enrollmentItems, setEnrollmentItems }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Load enrolled courses from props
    setCourses(enrollmentItems || []);
  }, [enrollmentItems]);

  function removeItem(item) {
    // Remove from state and App's enrollments
    const updatedItems = enrollmentItems.filter(
      (i) => i.course._id !== item.course._id
    );
    setEnrollmentItems(updatedItems);
  }

  return (
    <div className="container mt-5">
      <h2>My Courses</h2>
      <div className="row">
        {courses.length === 0 ? (
          <p>You have not enrolled in any course yet.</p>
        ) : (
          courses.map((item) => (
            <div key={item.course._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
              <CourseCard course={item.course} />
              <div className="mt-2 text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => removeItem(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
