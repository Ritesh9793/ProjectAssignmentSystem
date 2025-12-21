const Submission = require("../models/submission");

exports.submitAssignment = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("ASSIGNMENT ID:", req.params.id);

    const submission = await Submission.create({
  studentName: req.body.studentName,
  rollNo: req.body.rollNo,
  file: req.file.filename, // now EXISTS
  assignmentId: req.params.id,
});


    res.status(201).json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Submission failed" });
  }
};


exports.getSubmissions = async (req, res) => {
  const submissions = await Submission.find({
    assignmentId: req.params.id,
  }).sort({ createdAt: -1 });

  res.json(submissions);
};

exports.getAllSubmissions = async (req, res) => {
  const submissions = await Submission.find()
    .populate("assignmentId", "title subject")
    .sort({ createdAt: -1 });

  res.json(submissions);
};

exports.updateMarks = async (req, res) => {
  const { marks, remarks } = req.body;

  const submission = await Submission.findByIdAndUpdate(
    req.params.id,
    { marks, remarks },
    { new: true }
  );

  res.json(submission);
};








