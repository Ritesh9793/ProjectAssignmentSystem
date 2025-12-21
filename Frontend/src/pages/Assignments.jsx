import axios from "axios";
import { useEffect, useState } from "react";
import "./Assignments.css";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const assignmentsPerPage = 5;

  const getStatus = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today) return "Expired";
    if (due.getTime() === today.getTime()) return "Due Today";
    return "Upcoming";
  };

  const fetchAssignments = async () => {
    const res = await axios.get("http://localhost:5000/api/assignments");
    setAssignments(res.data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;

    await axios.delete(`http://localhost:5000/api/assignments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchAssignments();
  };

  const filteredAssignments = assignments.filter((a) => {
    const text = `${a.title} ${a.subject}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const indexOfLast = currentPage * assignmentsPerPage;
  const indexOfFirst = indexOfLast - assignmentsPerPage;
  const currentAssignments = filteredAssignments.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredAssignments.length / assignmentsPerPage);

  return (
    <div className="assignments-container">
      <h2>Assignments</h2>

      <input
        type="text"
        placeholder="Search by title or subject..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="search-input"
      />

      {currentAssignments.map((a) => {
  const status = getStatus(a.dueDate);

  return (
    <div
      key={a._id}
      className={`assignment-card ${status === "Expired" ? "expired" : ""}`}
    >
      <h3>{a.title}</h3>

      {/* ✅ Status badge */}
      <span
        className={`status ${status.toLowerCase().replace(" ", "-")}`}
      >
        {status}
      </span>

      <p>{a.description}</p>
      <small>Subject: {a.subject}</small>

      {/* ✅ STUDENT ACTION */}
      <div className="student-actions">
        {status !== "Expired" ? (
          <a href={`/submit/${a._id}`} className="submit-btn">
            Submit Assignment
          </a>
        ) : (
          <span className="submit-disabled">
            Submission Closed
          </span>
        )}
      </div>

      {/* ✅ TEACHER / ADMIN ACTIONS */}
      {token && (
  <div className="actions">
    <a href={`/submissions/${a._id}`}>View Submissions</a>
    <a href={`/edit/${a._id}`}>Edit</a>
    <button onClick={() => handleDelete(a._id)}>
      Delete
    </button>
  </div>
)}

    </div>
  );
})}



      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
