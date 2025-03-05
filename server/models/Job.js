const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "closed", "draft"],
    default: "active",
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  salary: {
    type: String,
    required: false,
  },
  requirements: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", JobSchema);
