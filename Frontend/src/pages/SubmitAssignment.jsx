import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SubmitAssignment.css";

export default function SubmitAssignment() {
  const { id } = useParams();
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("studentName", studentName);
    formData.append("rollNo", rollNo);
    formData.append("file", file);

    await axios.post(
      `http://localhost:5000/api/submissions/${id}`,
      formData
    );

    alert("Assignment submitted successfully");
    console.log("Submitting for assignment:", id);
    console.log("Student:", studentName, rollNo);
    console.log("File:", file);

  };

  return (
    <div className="submit-container">
      <form className="submit-card" onSubmit={handleSubmit}>
        <h2>Submit Assignment</h2>

        <input
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <input
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
