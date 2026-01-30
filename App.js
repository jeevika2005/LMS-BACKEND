import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import MyLearning from "./pages/MyLearning";
import CourseDetails from "./pages/CourseDetails";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import AOS from "aos";
import "aos/dist/aos.css";

/* ---------- Protected Route ---------- */
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  /* ---------- AOS INIT ---------- */
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  /* ---------- AOS REFRESH ON ROUTE CHANGE ---------- */
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <>
      {/* Hide navbar on auth pages */}
      {!["/login", "/register"].includes(location.pathname) && (
        <Navbar user={user} setUser={setUser} />
      )}

      <Routes>
        {/* ---------- ROOT ---------- */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ---------- AUTH ---------- */}
        <Route
          path="/login"
          element={
            !user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />

        {/* ---------- DASHBOARD ---------- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ---------- LMS ---------- */}
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/course/:id"
          element={
            <ProtectedRoute user={user}>
              <CourseDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-learning"
          element={
            <ProtectedRoute user={user}>
              <MyLearning />
            </ProtectedRoute>
          }
        />

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
