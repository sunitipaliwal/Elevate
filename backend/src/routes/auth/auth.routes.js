import express from "express";
import passport from "passport";

import {
  googleCallback,
  getCurrentUser,
  logout
} from "../../controllers/auth/auth.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  googleCallback
);

router.get("/me", protect, getCurrentUser);

router.post("/logout", logout);

export default router;