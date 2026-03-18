import { OptimizedResumeData } from "./resume.types";

// types/optimizer.types.ts
export interface OptimizerResult {
  score: number;
  strengths: string[];
  missingSkills: string[];
  improvements: string[];

  // Backend "optimizedSections" bhej sakta hai
  optimizedSections?: {
    summary: string | { original: string; optimized: string };
    completeResume?: OptimizedResumeData;
  };

  // Ya fir AI seedha "sections" bhej sakta hai
  sections?: {
    summary: string | { original: string; optimized: string };
    completeResume?: OptimizedResumeData;
  };

  // Safe fallback
  completeResume?: OptimizedResumeData;
}
