import React from "react";
import Search from "./Search";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ enrollments, user, setUser }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow" data-aos="fade-down">
      <div className="container">
        {/* Brand/Logo */}
        <Link className="navbar-brand" to="/">
          <img width="100px" src="/images/logo.jpg" alt="LMS Logo" />
        </Link>

        {/* Search Component */}
        <div className="mx-auto col-12 col-md-5">
          <Search />
        </div>

        <div className="d-flex align-items-center mt-3 mt-lg-0">
          {/* Enrollments Button */}
          <Link to="/my-courses" className="btn btn-outline-primary me-3 position-relative">
            Enrollments
            {enrollments?.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {enrollments.length}
              </span>
            )}
          </Link>

          {/* Conditional Auth Links */}
          {user ? (
            <div className="dropdown">
              <button 
                className="btn btn-secondary dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown"
              >
                {user.role === 'admin' ? 'Admin: ' : ''}{user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                <li><button className="dropdown-item text-danger" onClick={logoutHandler}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-light me-2">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;