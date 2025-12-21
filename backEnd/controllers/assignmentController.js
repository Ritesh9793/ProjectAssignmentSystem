const Assignment = require("../models/assignment");

exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({
      title: req.body.title,
      subject: req.body.subject,
      description: req.body.description,
      dueDate: req.body.dueDate,
      attachment: req.file ? req.file.filename : null,
      createdBy: req.teacherId,
    });

    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: "Error creating assignment" });
  }
};

exports.updateAssignment = async (req, res) => {
  const updated = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteAssignment = async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: "Assignment deleted" });
};


exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find().sort({ createdAt: -1 });
  res.json(assignments);
};
