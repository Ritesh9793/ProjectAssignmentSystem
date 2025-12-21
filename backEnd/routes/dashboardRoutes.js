const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
const { getStats, submissionsBySubject } = require("../controllers/dashboardController");

router.get("/stats", auth, getStats, submissionsBySubject);

module.exports = router;
