import cloudinary from "../../config/cloudinary.js"
import Resume from "../../models/resume.model.js"
import fs from "fs"

import { extractResumeText } from "../../services/resumeParser.service.js"
import { buildOptimizerPrompt } from "../../prompts/optimizer.prompt.js"
import { runGeminiOptimizer } from "../../services/gemini.service.js"
import { generateOptimizedPDF } from "../../services/pdfGenerator.service.js"




export const analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    const resumeText = await extractResumeText(resume.fileUrl);
    const prompt = buildOptimizerPrompt(resumeText, jobDescription);
    
    const rawResult = await runGeminiOptimizer(prompt);

    const formattedResult = {
      score: rawResult.score || 0,
      strengths: rawResult.strengths || [],
      missingSkills: rawResult.missingSkills || [],
      improvements: rawResult.improvements || [],
      optimizedSections: {
        summary: rawResult.sections?.summary?.optimized || "",
        // This passes all the new links, techStacks, and certifications down to the PDF
        completeResume: rawResult.sections?.completeResume || {} 
      }
    };

    res.json(formattedResult);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const generateOptimizedResume = async (req, res) => {
  try {
    const { htmlContent, layoutSettings } = req.body;
    const filePath = await generateOptimizedPDF(htmlContent, layoutSettings);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate optimized resume" });
  }
}

export const saveOptimizedResume = async (req, res) => {
  try {
    const { htmlContent, layoutSettings } = req.body;
    const filePath = await generateOptimizedPDF(htmlContent, layoutSettings);
    
    const upload = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      folder: `resumes/${req.user._id}`
    });

    const resume = await Resume.create({
      user: req.user._id,
      title: "Optimized Resume",
      version: Date.now(),
      fileUrl: upload.secure_url,
      cloudinaryId: upload.public_id
    });

    fs.unlinkSync(filePath);
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Saving optimized resume failed" });
  }
}