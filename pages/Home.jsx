import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword") || "";

  // ✅ Init AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // ✅ Fetch courses
  useEffect(() => {
    let link = `${process.env.REACT_APP_API_URL}/courses`;

    if (keyword.trim()) {
      link = `${process.env.REACT_APP_API_URL}/courses?keyword=${keyword}`;
    }

    setLoading(true);
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || data || []);
        setLoading(false);
        AOS.refresh(); // 🔁 Refresh animation after render
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
        setCourses([]);
      });
  }, [keyword]);

  return (
    <Fragment>
      {/* 🔷 Hero Heading */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          padding: "70px 20px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1
          data-aos="fade-down"
          style={{
            fontSize: "2.8rem",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Explore Our Courses
        </h1>

        <p
          data-aos="fade-up"
          style={{
            fontSize: "1.1rem",
            opacity: "0.9",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Learn from industry experts and boost your career with high-quality
          courses
        </p>
      </div>

      {/* 🔷 Loader */}
      {loading ? (
        <h3
          className="text-center"
          style={{
            marginTop: "80px",
            fontWeight: "500",
            color: "#555",
          }}
        >
          Loading courses...
        </h3>
      ) : (
        <section
          id="courses"
          className="container"
          style={{
            marginTop: "60px",
            marginBottom: "60px",
          }}
        >
          {/* 🔷 Course Grid */}
<div className="row">
  {courses.length === 0 ? (
    <h4 className="text-center w-100" data-aos="fade-in"> No courses found </h4>
  ) : (
    courses.map((course, index) => (
      <div key={course._id} className="col-lg-4 col-md-6 mb-4">
        {/* Pass the index here so CourseCard can use it for data-aos-delay */}
        <CourseCard course={course} index={index} />
      </div>
    ))
  )}
</div>
        </section>
      )}
    </Fragment>
  );
}
