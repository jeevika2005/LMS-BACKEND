import { Link, useNavigate } from "react-router-dom";

export default function CourseCard({ course, index = 0 }) {
  const navigate = useNavigate();

  const openCourse = () => {
    navigate(`/course/${course._id}`);
  };

  return (
    <div
      className="col-sm-12 col-md-8 col-lg-35 my-3"
      data-aos="zoom-in"
      data-aos-delay={index * 100}
    
    >
      <div className="card p-3 rounded shadow-sm h-100 border-0">
        {/* Course Image */}
        <img
          className="card-img-top mx-auto"
          src={course?.images?.[0]?.image}
          alt={course?.title || "Course Image"}
          
          onClick={openCourse}
        />

        <div className="card-body d-flex flex-column text-center">
          {/* Course Title */}
          <h5 className="card-title fw-bold">
            <Link
              to={`/course/${course._id}`}
              className="text-decoration-none text-dark"
            >
              {course?.title}
            </Link>
          </h5>

          {/* Ratings */}
          <div className="ratings mt-auto mb-2">
            <div className="rating-outer mx-auto">
              <div
                className="rating-inner"
                style={{
                  width: `${((course?.ratings || 0) / 5) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Price */}
          <p className="card-text fw-bold text-primary">
            ₹{course?.price || 0}
          </p>

          {/* View Course Button */}
          <button
            className="btn btn-primary btn-block mt-2"
            onClick={openCourse}
          >
            View Course
          </button>
        </div>
      </div>
    </div>
  );
}
