import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ViewSubmissions.css";

export default function ViewSubmissions() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [submissions, setSubmissions] = useState([]);

  // 🔐 Frontend protection
  if (!token) {
    window.location.href = "/login";
    return null;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/submissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSubmissions(res.data));
  }, [id, token]);

  return (
    <div className="submissions-container">
      <h2>Student Submissions</h2>

      {submissions.length === 0 && (
        <p>No submissions yet.</p>
      )}

      {submissions.map((s) => (
        <div key={s._id} className="submission-card">
          <p>
            <strong>{s.studentName}</strong> ({s.rollNo})
          </p>
          <a
            href={`http://localhost:5000/uploads/${s.file}`}
            target="_blank"
            rel="noreferrer"
          >
            Download File
          </a>
        </div>
      ))}
    </div>
  );
}
