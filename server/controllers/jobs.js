const Job = require("../models/Job");

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const query = {};

    // If user is a recruiter, only show their jobs
    if (req.user && req.user.role === "recruiter") {
      query.recruiter = req.user.id;
    } else {
      // For public/candidate view, only show active jobs
      query.status = "active";
    }

    const jobs = await Job.find(query).sort("-createdAt");

    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single job
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a job
exports.createJob = async (req, res) => {
  try {
    req.body.recruiter = req.user.id;

    const job = await Job.create(req.body);

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Make sure user is the job owner
    if (job.recruiter.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized to update this job" });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Make sure user is the job owner
    if (job.recruiter.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized to delete this job" });
    }

    await job.remove();

    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
