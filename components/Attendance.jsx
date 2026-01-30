import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Attendance = ({ user }) => {
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("Present");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from Backend on component load
  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/attendance/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setHistory(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // 2. Submit Data to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/attendance/mark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentName: user?.name,
          subject,
          status,
        }),
      });

      if (res.ok) {
        toast.success("Attendance saved to database!");
        setSubject(""); // Clear input
        fetchAttendance(); // Refresh list to see new record
      } else {
        toast.error("Failed to save attendance.");
      }
    } catch (err) {
      toast.error("Server connection lost.");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* LEFT SIDE: Entry Form */}
        <div className="col-md-4 mb-4" data-aos="fade-right">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold text-primary mb-4">Mark Attendance</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Subject Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. React.js"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold">Attendance Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm">
                Save to MongoDB
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: History Table */}
        <div className="col-md-8" data-aos="fade-left">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-4">Your Attendance Records</h4>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="3" className="text-center">Loading...</td></tr>
                  ) : history.length > 0 ? (
                    history.map((item, index) => (
                      <tr key={item._id} data-aos="fade-up" data-aos-delay={index * 50}>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td className="fw-semibold">{item.subject}</td>
                        <td>
                          <span className={`badge rounded-pill px-3 ${
                            item.status === "Present" ? "bg-success" : 
                            item.status === "Absent" ? "bg-danger" : "bg-warning text-dark"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="text-center text-muted">No records found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;