import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Ensure animations refresh when the component loads
  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ CORRECTION 1: Ensure the path includes /api/auth
      // Replace the template literal with the direct string
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ CORRECTION 2: Store the TOKEN and the USER separately
        // This allows you to send 'data.token' in future API headers
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user); // data.user now contains { name, role, id }

        toast.success(`Welcome back, ${data.user.name}!`);
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid Email or Password");
      }
    } catch (err) {
      toast.error("Connection failed. Check if backend is running on port 8000");
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100 bg-light">
      {/* Main Card with Zoom-in animation */}
      <div
        className="card p-4 shadow-lg border-0"
        style={{ width: "420px", borderRadius: "20px" }}
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Login</h2>
          <p className="text-muted">Enter your credentials to access courses</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email field with Fade-right animation */}
          <div className="mb-3" data-aos="fade-right" data-aos-delay="200">
            <label className="form-label fw-semibold">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="fa fa-envelope text-muted"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0 ps-0"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password field with Fade-right animation */}
          <div className="mb-4" data-aos="fade-right" data-aos-delay="400">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="fa fa-lock text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0 ps-0"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
            type="submit"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center" data-aos="fade-in" data-aos-delay="800">
          <p className="mb-0 text-muted">
            New here? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}