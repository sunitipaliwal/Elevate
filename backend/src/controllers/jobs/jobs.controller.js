import Resume from "../../models/resume.model.js";
import { buildJobMatchPrompt } from "../../prompts/jobs.prompt.js";

// 👇 TUMHARI EXISTING SERVICES
import { extractResumeText } from "../../services/resumeParser.service.js"; 
import { runGeminiOptimizer } from "../../services/gemini.service.js"; 

export const getJobMatches = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    // 1. Fetch Resume from DB
    const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // 2. Extract Text using YOUR EXISTING PARSER SERVICE 🔥
    const resumeText = await extractResumeText(resume.fileUrl);

    // 3. Send to Gemini AI
    const prompt = buildJobMatchPrompt(resumeText);
    const matches = await runGeminiOptimizer(prompt); // Natively returns parsed JSON
    
    // 4. Send back to Frontend
    res.status(200).json({ matches });

  } catch (error) {
    console.error("Job Match Error:", error);
    res.status(500).json({ message: "Failed to generate job matches. Please try again." });
  }
};