const express = require("express");
const {
  createApplication,
  getApplicationsByJob,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/applications");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, authorize("candidate"), createApplication);

router.route("/me").get(protect, authorize("candidate"), getMyApplications);

router
  .route("/job/:jobId")
  .get(protect, authorize("recruiter"), getApplicationsByJob);

router
  .route("/:id/status")
  .put(protect, authorize("recruiter"), updateApplicationStatus);

module.exports = router;
