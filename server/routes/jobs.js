const express = require("express");
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getJobs).post(protect, authorize("recruiter"), createJob);

router
  .route("/:id")
  .get(getJob)
  .put(protect, authorize("recruiter"), updateJob)
  .delete(protect, authorize("recruiter"), deleteJob);

module.exports = router;
