import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import { Link } from "react-router-dom";

export default function MyLearning() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });

    const fetchEnrollments = async () => {
      try{
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/enrollments/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

   // ✅ FIX: correct data access
      setCourses(res.data.enrollments || []);
    } catch (error) {
      console.error(error);
    }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4" data-aos="fade-down">
        My Courses
      </h2>

      {courses.length === 0 ? (
        <p data-aos="fade-up">No enrolled courses yet.</p>
      ) : (
        <div className="row g-4">
          {courses.map((item, index) => (
            <div
              className="col-md-4"
              key={item._id}
              data-aos="zoom-in-up"
              data-aos-delay={index * 150}
            >
              <div className="card h-100 shadow border-0">
                <img
                  src={item.course.images[0].image}
                  className="card-img-top"
                  alt={item.course.title}
                />
                <div className="card-body">
                  <h5 className="fw-bold">{item.course.title}</h5>
                  <p className="text-muted small">
                    Instructor: {item.course.instructor}
                  </p>

                  <Link
                    to={`/course/${item.course._id}`}
                    className="btn btn-outline-primary btn-sm w-100"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
