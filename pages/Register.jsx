import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "student" 
  });
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // ✅ ADDED "/auth" TO THE PATH
    const response = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Registration Successful!");
      navigate("/login");
    } else {
      toast.error(data.message || "Registration failed");
    }
  } catch (err) {
    toast.error("Server is not responding");
  }
};
  return (
    <div className="auth-bg d-flex justify-content-center align-items-center vh-100">
      <div 
        className="card p-4 shadow-lg border-0" 
        style={{ width: "450px", borderRadius: "20px", background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(10px)" }}
        data-aos="flip-left"
      >
        <h2 className="text-center mb-4 fw-bold text-dark">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3" data-aos="fade-up" data-aos-delay="100">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" required placeholder="Enter name"
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div className="mb-3" data-aos="fade-up" data-aos-delay="200">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required placeholder="Email@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="mb-3" data-aos="fade-up" data-aos-delay="300">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" required placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
            <label className="form-label">I am a:</label>
            <select className="form-select" onChange={(e) => setFormData({...formData, role: e.target.value})}>
              <option value="user">Student</option>
              <option value="admin">Instructor / Admin</option>
            </select>
          </div>

          <button className="btn btn-dark w-100 py-2 mt-3 shadow" type="submit">
            Register Now
          </button>
        </form>
        <p className="mt-4 text-center">
          Already a member? <Link to="/login" className="fw-bold">Login here</Link>
        </p>
      </div>
    </div>
  );
}