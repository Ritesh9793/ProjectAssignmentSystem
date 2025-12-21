const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());

// ✅ ROUTES AFTER MIDDLEWARE
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/assignments", require("./routes/assignmentRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/submissions", require("./routes/submissionRoute"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));


app.get("/", (req, res) => {
  res.send("Project Assignment System API running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error(err));
