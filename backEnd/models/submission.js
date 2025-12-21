const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
    marks: {
      type: Number,
      default: null,
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
