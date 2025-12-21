import { useState } from "react";
import axios from "axios";
import "./CreateAssignment.css";

export default function CreateAssignment() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
  });

  const [file, setFile] = useState(null);

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subject", form.subject);
    formData.append("description", form.description);
    formData.append("dueDate", form.dueDate);
    if (file) formData.append("attachment", file);

    await axios.post(
      "http://localhost:5000/api/assignments",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Assignment created successfully");
    window.location.href = "/";
  };

  return (
    <div className="create-container">
      <form className="create-card" onSubmit={handleSubmit}>
        <h2>Create Assignment</h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">Create Assignment</button>
      </form>
    </div>
  );
}
