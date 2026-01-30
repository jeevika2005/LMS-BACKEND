import React, { useState } from "react";
import { toast } from "react-toastify";

const MarkAttendance = () => {
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("Present");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get the token we saved during login
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/attendance/mark", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Mandatory for your protect middleware
        },
        body: JSON.stringify({ subject, status }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Data stored in MongoDB!");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to connect to server");
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0" data-aos="fade-up">
      <h3 className="fw-bold mb-4">Mark Attendance</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" className="form-control mb-3" placeholder="Subject" 
          onChange={(e) => setSubject(e.target.value)} required 
        />
        <select className="form-select mb-3" onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
        <button className="btn btn-primary w-100 shadow-sm">Save Entry</button>
      </form>
    </div>
  );
};

export default MarkAttendance;