const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const teacher = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Teacher registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: teacher._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};


exports.getProfile = async (req, res) => {
  const teacher = await Teacher.findById(req.teacherId).select("-password");
  res.json(teacher);
};

exports.updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);

  await Teacher.findByIdAndUpdate(req.teacherId, {
    password: hashed,
  });

  res.json({ message: "Password updated successfully" });
};



