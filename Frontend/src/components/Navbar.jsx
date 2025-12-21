import "./Navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <h3 className="logo">Project Assignment System</h3>

      <div className="nav-links">
        {/* Public link */}
        <a href="/">Assignments</a>

        {/* Not logged in */}
        {!token && (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}

        {/* Logged in (Teacher) */}
        {token && (
  <>
    <a href="/submissions">Submissions</a>
    <a href="/create">Create Assignment</a>
    <a href="/dashboard">Dashboard</a>
    <a href="/profile">Profile</a>
    <button onClick={handleLogout}>Logout</button>
  </>
)}

      </div>
    </nav>
  );
}
