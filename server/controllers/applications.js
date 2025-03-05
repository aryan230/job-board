const Application = require("../models/Application");
const Job = require("../models/Job");
const path = require("path");
const fs = require("fs");

// Mock resume parsing API
const parseResume = (filePath) => {
  // In a real app, you would call a third-party API here
  return new Promise((resolve) => {
    // Simulating async API call
    setTimeout(() => {
      resolve({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
        skills: ["JavaScript", "React", "Node.js", "MongoDB"],
        experience: [
          {
            title: "Frontend Developer",
            company: "Tech Corp",
            duration: "2018-2021",
            description: "Built responsive web applications using React",
          },
          {
            title: "Junior Developer",
            company: "Startup Inc",
            duration: "2016-2018",
            description: "Full stack development with MERN stack",
          },
        ],
        education: [
          {
            degree: "Bachelor of Computer Science",
            institution: "University of Technology",
            year: "2016",
          },
        ],
      });
    }, 1000);
  });
};

// Create application
exports.createApplication = async (req, res) => {
  try {
    // Check if job exists
    const job = await Job.findById(req.body.job);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Handle file upload
    if (!req.files || !req.files.resume) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a resume" });
    }

    const resume = req.files.resume;

    // Make sure the file is a PDF or DOCX
    if (!resume.mimetype.match(/pdf|msword|wordprocessingml/)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please upload a PDF or Word document",
        });
    }

    // Create unique filename
    const fileName = `${Date.now()}-${resume.name}`;
    const filePath = path.join(__dirname, "../uploads", fileName);

    // Move the file
    await resume.mv(filePath);

    // Parse resume
    const parsedData = await parseResume(filePath);

    // Create application
    const application = await Application.create({
      candidate: req.user.id,
      job: req.body.job,
      resumeUrl: `/uploads/${fileName}`,
      parsedData,
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get applications for a job (recruiter only)
exports.getApplicationsByJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Make sure user is the job owner
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to view these applications",
      });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate("candidate", "email")
      .sort("-createdAt");

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get applications for a candidate (candidate only)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user.id })
      .populate("job", "title company status")
      .sort("-createdAt");

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update application status (recruiter only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    // Make sure user is the job owner
    const job = await Job.findById(application.job);

    if (!job || job.recruiter.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this application",
      });
    }

    application.status = req.body.status;
    await application.save();

    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
