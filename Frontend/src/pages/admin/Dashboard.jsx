import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);


export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState(null);

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  useEffect(() => {
  axios
    .get("http://localhost:5000/api/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setStats(res.data));

  axios
    .get("http://localhost:5000/api/dashboard/subject-chart", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("CHART DATA:", res.data); // 🔴 IMPORTANT
      setChartData({
        labels: res.data.map((d) => d.subject),
        datasets: [
          {
            label: "Submissions per Subject",
            data: res.data.map((d) => d.count),
            backgroundColor: "#1976d2",
          },
        ],
      });
    });
}, [token]);


  return (
    <div className="dashboard-container">
      <h2>Teacher Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Assignments</h3>
          <p>{stats.totalAssignments}</p>
        </div>

        <div className="stat-card">
          <h3>Total Submissions</h3>
          <p>{stats.totalSubmissions}</p>
        </div>

        <div className="stat-card expired">
          <h3>Expired Assignments</h3>
          <p>{stats.expiredAssignments}</p>
        </div>

        <div className="stat-card due">
          <h3>Due Today</h3>
          <p>{stats.dueTodayAssignments}</p>
        </div>
      </div>

      {chartData && (
        <div className="chart-card">
          <h3>Submissions per Subject</h3>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}
