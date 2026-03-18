import express from "express";

import {
  uploadResume,
  getUserResumes,
  deleteResume,
  getResumeById
} from "../../controllers/resume/resume.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

import { upload } from "../../middlewares/upload.middleware.js";

import { validateResume } from "../../middlewares/fileValidation.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  validateResume,
  uploadResume
);

router.get(
  "/my-resumes",
  protect,
  getUserResumes
);

router.get(
  "/:id",
  protect,
  getResumeById
);

router.delete(
  "/:id",
  protect,
  deleteResume
);

export default router;