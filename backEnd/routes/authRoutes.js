const express = require("express");
const auth = require("../middleware/authmiddleware");
const router = express.Router();
const { register, login, getProfile, updatePassword, } = require("../controllers/authController");


router.get("/profile", auth, getProfile);
router.put("/password", auth, updatePassword);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
