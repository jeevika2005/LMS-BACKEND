import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = ({ enrollments, user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm"
      data-aos="fade-down"
    >
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/images/logo.jpg" 
            alt="Logo" 
            width="80" 
            className="me-2 rounded" 
          />
          <span className="fw-bold text-uppercase tracking-wider">LMS Academy</span>
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          
          {/* ✅ ONLY SHOW SEARCH IF USER IS LOGGED IN */}
          {user && (
            <div className="mx-auto col-12 col-lg-5 px-lg-4 my-2 my-lg-0">
              <Search />
            </div>
          )}

          <ul className="navbar-nav ms-auto align-items-lg-center">
            
            {/* ✅ ONLY SHOW "MY COURSES" IF USER IS LOGGED IN */}
            {user && (
              <li className="nav-item me-lg-3">
                <Link className="nav-link position-relative d-inline-block" to="/my-courses">
                  <i className="fa fa-book me-1"></i> My Courses
                  {enrollments?.length > 0 && (
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
    {enrollments.length}
  </span>
)}
                </Link>
              </li>
            )}

            {/* User Auth Section */}
            {user ? (
           <li className="nav-item dropdown">
  <button 
    className="nav-link dropdown-toggle btn btn-outline-light px-3" 
    id="userDropdown" 
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="fa fa-user-circle me-1"></i> {user.name}
  </button>
  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
    <li>
      <Link className="dropdown-item" to="/dashboard">
        <i className="fa fa-tachometer me-2"></i>Dashboard
      </Link>
    </li>
    <li><hr className="dropdown-divider" /></li>
    <li>
      <button className="dropdown-item text-danger" onClick={handleLogout}>
        <i className="fa fa-sign-out me-2"></i>Logout
      </button>
    </li>
  </ul>
</li>

            ) : (
              <div className="d-flex gap-2 mt-3 mt-lg-0">
                <Link to="/login" className="btn btn-outline-light px-4">Login</Link>
                <Link to="/register" className="btn btn-primary px-4 shadow-sm">Sign Up</Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;