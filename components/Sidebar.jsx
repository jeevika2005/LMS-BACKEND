import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard/courses", icon: "fa-book", label: "All Courses" },
    { path: "/dashboard/add-course", icon: "fa-plus-circle", label: "Add Course" },
    { path: "/dashboard/attendance", icon: "fa-user-check", label: "View Attendance" },
    { path: "/dashboard/mark-attendance", icon: "fa-edit", label: "Mark Attendance" },
  ];

  return (
    <div className="bg-dark text-white p-3 shadow-lg" style={{ width: "260px", minHeight: "100vh" }}>
      <h3 className="text-center mb-5 fw-bold text-info" data-aos="fade-down">LMS PRO</h3>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item, index) => (
          <li className="nav-item mb-2" key={index} data-aos="fade-right" data-aos-delay={index * 100}>
            <Link 
              to={item.path} 
              className={`nav-link text-white ${location.pathname === item.path ? 'active btn-primary' : 'btn-outline-secondary'}`}
            >
              <i className={`fa ${item.icon} me-2`}></i> {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="btn btn-outline-danger w-100 mt-5 shadow-sm">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;