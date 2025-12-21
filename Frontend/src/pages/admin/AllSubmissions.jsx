import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewSubmissions.css";

export default function AllSubmissions() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [subject, setSubject] = useState("All");
  const [selectedAssignment, setSelectedAssignment] = useState("All");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/submissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setSubmissions(res.data))
      .catch((err) => console.error(err));
  }, [token, navigate]);

  const subjects = [
    "All",
    ...new Set(
      submissions.map((s) => s.assignmentId?.subject).filter(Boolean)
    ),
  ];

  const assignments = [
    "All",
    ...new Set(
      submissions.map((s) => s.assignmentId?.title).filter(Boolean)
    ),
  ];

  const filteredSubmissions = submissions.filter((s) => {
    const subjectMatch =
      subject === "All" || s.assignmentId?.subject === subject;

    const assignmentMatch =
      selectedAssignment === "All" ||
      s.assignmentId?.title === selectedAssignment;

    return subjectMatch && assignmentMatch;
  });

  const exportToCSV = () => {
    if (filteredSubmissions.length === 0) {
      alert("No submissions to export");
      return;
    }

    const headers = [
      "Student Name",
      "Roll Number",
      "Subject",
      "Assignment",
      "File",
      "Submitted At",
    ];

    const rows = filteredSubmissions.map((s) => [
      s.studentName,
      s.rollNo,
      s.assignmentId?.subject || "",
      s.assignmentId?.title || "",
      s.file,
      new Date(s.createdAt).toLocaleString(),
    ]);

    const csvContent =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "submissions.csv";
    link.click();
  };

  const updateEvaluation = async (id, marks, remarks) => {
  try {
    await axios.put(
      `http://localhost:5000/api/submissions/${id}/marks`,
      { marks, remarks },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSubmissions((prev) =>
      prev.map((s) =>
        s._id === id ? { ...s, marks, remarks } : s
      )
    );
  } catch (err) {
    console.error(err);
    alert("Failed to update marks");
  }
};

  return (
    <div className="submissions-container">
      <h2>All Student Submissions</h2>

      <button className="export-btn" onClick={exportToCSV}>
        Export CSV
      </button>

      <select
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
          setSelectedAssignment("All");
        }}
        className="filter-select"
      >
        {subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={selectedAssignment}
        onChange={(e) => setSelectedAssignment(e.target.value)}
        className="filter-select"
      >
        {assignments.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      {filteredSubmissions.length === 0 && (
        <p>No submissions found.</p>
      )}

      {filteredSubmissions.map((s) => (
        <div key={s._id} className="submission-card">
          <p>
            <strong>{s.studentName}</strong> ({s.rollNo})
          </p>
          <p>
            <strong>Subject:</strong> {s.assignmentId?.subject}
          </p>
          <p>
            <strong>Assignment:</strong> {s.assignmentId?.title}
          </p>
          <a
            href={`http://localhost:5000/uploads/${s.file}`}
            target="_blank"
            rel="noreferrer"
          >
            Download
          </a>
          <div className="evaluation">
  <input
    type="number"
    placeholder="Marks"
    value={s.marks ?? ""}
    onChange={(e) =>
      updateEvaluation(s._id, e.target.value, s.remarks)
    }
  />

  <input
    type="text"
    placeholder="Remarks"
    value={s.remarks ?? ""}
    onChange={(e) =>
      updateEvaluation(s._id, s.marks, e.target.value)
    }
  />
</div>

        </div>
        
      ))}
      
    </div>
  );
}
