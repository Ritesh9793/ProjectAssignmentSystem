import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState({});
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProfile(res.data));
  }, []);

  const updatePassword = async (e) => {
    e.preventDefault();

    await axios.put(
      "http://localhost:5000/api/auth/password",
      { newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Password updated");
    setNewPassword("");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Teacher Profile</h2>

        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>

        <form onSubmit={updatePassword}>
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}
