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
        completeResume: rawResult.sections?.completeResume || {} 
      }
    };

    res.json(formattedResult);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const generateOptimizedResume = async (req, res) => {
  let filePath = null;
  try {
    const { htmlContent, layoutSettings } = req.body;
    filePath = await generateOptimizedPDF(htmlContent, layoutSettings);
    
    // 🚀 THE FIX: res.download ka 3rd parameter callback hota hai, jo download hone ke baad chalta hai
    res.download(filePath, "Elevate_Resume.pdf", (err) => {
      if (err) {
        console.error("Error downloading file:", err);
      }
      
      // Download pura hote hi (ya fail hote hi) temp file ko UDA DO! 🧹
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🧹 Deleted temp file after download: ${filePath}`);
      }
    });

  } catch (error) {
    // Agar generate hone se pehle hi error aa jaye, toh delete karne ki koshish karo
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).json({ message: "Failed to generate optimized resume" });
  }
}

export const saveOptimizedResume = async (req, res) => {
  let filePath = null;
  try {
    const { htmlContent, layoutSettings } = req.body;
    filePath = await generateOptimizedPDF(htmlContent, layoutSettings);
    
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

    // 🚀 Successfully cloudinary pe upload hone ke baad uda do!
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🧹 Deleted temp file after Cloudinary upload: ${filePath}`);
    }

    res.json(resume);
  } catch (error) {
    // 🚀 THE FIX 2: Agar cloudinary error de de, tab bhi file uda do warna wahi padi rahegi!
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🧹 Deleted temp file after FAILED upload: ${filePath}`);
    }
    res.status(500).json({ message: "Saving optimized resume failed" });
  }
}