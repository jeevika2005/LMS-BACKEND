import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import { toast } from "react-toastify";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: false });

    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses/${id}`
        );
        setCourse(res.data);
      } catch (error) {
        toast.error("Course not found");
      }
    };

    fetchCourse();
  }, [id]);
const enrollCourse = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to enroll");
      return;
    }

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/enrollments`,
      { courseId: id }, // ✅ must be a valid MongoDB _id
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(res.data.message || "Enrolled successfully 🎉");
    navigate("/my-learning");
  } catch (error) {
    console.error("Enrollment error:", error.response?.data);
    toast.error(error.response?.data?.message || "Enrollment failed");
  }
};


  if (!course) return null;

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* IMAGE */}
        <div className="col-md-6" data-aos="fade-right">
          <img
            src={course.images?.[0]?.image}
            className="img-fluid rounded shadow"
            alt={course.title}
          />
        </div>

        {/* CONTENT */}
        <div className="col-md-6" data-aos="fade-left">
          <h2 className="fw-bold">{course.title}</h2>
          <p className="text-muted">{course.description}</p>

          <p>
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <p>
            <strong>Price:</strong> ₹{course.price}
          </p>

          <button
            className="btn btn-success btn-lg mt-3"
            data-aos="zoom-in"
            onClick={enrollCourse}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
