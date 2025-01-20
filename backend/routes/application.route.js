import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// Apply for a job
router.route("/jobs/apply/:id").post(isAuthenticated, applyJob);

// Get all applied jobs for the logged-in user
router.route("/jobs/applied").get(isAuthenticated, getAppliedJobs);

// Get applicants for a specific job
router.route("/jobs/:id/applicants").get(isAuthenticated, getApplicants);

// Update the status of an application
router.route("/jobs/status/:id").patch(isAuthenticated, updateStatus);

export default router;
