import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

import "./config/passport.js";

import authRoutes from "./routes/auth/auth.routes.js";
import resumeRoutes from "./routes/resume/resume.routes.js";
import optimizerRoutes from "./routes/optimizer/optimizer.routes.js";
import jobsRoutes from "./routes/jobs/jobs.routes.js"; // 👈 NAYA IMPORT

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/optimizer", optimizerRoutes);
app.use("/api/jobs", jobsRoutes); // 👈 NAYA ROUTE REGISTER KYA

export default app;