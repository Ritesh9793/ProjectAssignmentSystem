const Assignment = require("../models/assignment");
const Submission = require("../models/submission");

// Dashboard stats
exports.getStats = async (req, res) => {
  const totalAssignments = await Assignment.countDocuments();
  const totalSubmissions = await Submission.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiredAssignments = await Assignment.countDocuments({
    dueDate: { $lt: today },
  });

  const dueTodayAssignments = await Assignment.countDocuments({
    dueDate: today,
  });

  res.json({
    totalAssignments,
    totalSubmissions,
    expiredAssignments,
    dueTodayAssignments,
  });
};

// 📊 Submissions per subject (chart)
exports.submissionsBySubject = async (req, res) => {
  const data = await Submission.aggregate([
    {
      $lookup: {
        from: "assignments",
        localField: "assignmentId",
        foreignField: "_id",
        as: "assignment",
      },
    },
    { $unwind: "$assignment" },
    {
      $group: {
        _id: "$assignment.subject",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        subject: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);

  res.json(data);
};
