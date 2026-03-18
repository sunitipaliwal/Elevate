import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { getJobMatches } from "../../controllers/jobs/jobs.controller.js";

const router = express.Router();

// Route: POST /api/jobs/match
// Desc: Get AI job recommendations for a specific resume
router.post("/match", protect, getJobMatches);

export default router;