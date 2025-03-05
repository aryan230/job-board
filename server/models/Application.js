const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "reviewed", "rejected", "shortlisted"],
    default: "pending",
  },
  parsedData: {
    name: String,
    email: String,
    phone: String,
    skills: [String],
    experience: [
      {
        title: String,
        company: String,
        duration: String,
        description: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
