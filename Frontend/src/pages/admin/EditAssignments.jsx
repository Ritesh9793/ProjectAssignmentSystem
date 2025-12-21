import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditAssignment() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    dueDate: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/assignments")
      .then((res) => {
        const a = res.data.find((x) => x._id === id);
        setForm(a);
      });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/assignments/${id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Assignment updated");
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Assignment</h2>
      <input name="title" value={form.title} onChange={handleChange} />
      <input name="subject" value={form.subject} onChange={handleChange} />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate?.slice(0, 10)}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
}
