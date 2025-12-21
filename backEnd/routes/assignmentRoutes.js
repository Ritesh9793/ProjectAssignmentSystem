const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
const {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");
const upload = require("../middleware/uploadMiddleware");
// Public
router.get("/", getAssignments);

// Teacher only
router.post(
  "/",
  auth,
  upload.single("attachment"),
  createAssignment
);
router.post("/", auth, createAssignment);
router.put("/:id", auth, updateAssignment);
router.delete("/:id", auth, deleteAssignment);

module.exports = router;
