const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authmiddleware"); // FIXED casing
const {
  submitAssignment,
  getSubmissions,
  getAllSubmissions, 
  updateMarks, 
} = require("../controllers/submissionController");


router.get("/", auth, getAllSubmissions);
router.get("/:id", auth, getSubmissions);
router.post("/:id", upload.single("file"), submitAssignment);
router.put("/:id/marks", auth, updateMarks);


module.exports = router;
