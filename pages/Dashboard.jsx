import { Link } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
// Import icons if you use font-awesome or react-icons
import { FaHome, FaBook, FaChartLine, FaUser } from "react-icons/fa"; 

export default function Dashboard() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* 1. Animated Nebula Background */}
      <div className="dashboard-bg"></div>

      {/* 2. Sidebar Component */}
      <aside className="dashboard-sidebar" data-aos="fade-right">
        <div className="sidebar-logo">LMS PRO</div>
        <nav className="sidebar-nav">
          <Link to="/dashboard"><FaHome /> Dashboard</Link>
          <Link to="/home"><FaBook /> Browse Library</Link>
          <Link to="/my-learning"><FaChartLine /> My Learning</Link>
          <Link to="/profile"><FaUser /> Profile</Link>
        </nav>
      </aside>

      {/* 3. Main Content Area */}
      <main className="dashboard-main">
        <div className="container mt-5">
          <h2 className="text-white mb-4" data-aos="fade-down">📚 Master Your Future</h2>

          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <Link to="/home" className="text-decoration-none">
                <div className="card glass-card p-4 text-center">
                  <h4>Browse Library</h4>
                  <p>Explore all available courses</p>
                </div>
              </Link>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <Link to="/my-learning" className="text-decoration-none">
                <div className="card glass-card p-4 text-center">
                  <h4>My Courses</h4>
                  <p>View enrolled courses</p>
                </div>
              </Link>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="400">
              <div className="card glass-card p-4 text-center">
                <h4>Progress</h4>
                <p>Track your learning</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}