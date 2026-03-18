import axiosInstance from "@/lib/axios";
import { OptimizerResult } from "@/types/optimizer.types";
import { LayoutSettings } from "@/types/resume.types";

export const analyzeResume = async (
  resumeId: string,
  jobDescription: string,
): Promise<OptimizerResult> => {
  const res = await axiosInstance.post("/optimizer/analyze", {
    resumeId,
    jobDescription,
  });
  return res.data;
};

// 🚀 Fixed: Removed 'any', explicitly typed as LayoutSettings and returning Blob
export const generateOptimizedResume = async (
  htmlContent: string,
  layoutSettings: LayoutSettings,
): Promise<Blob> => {
  const res = await axiosInstance.post(
    "/optimizer/generate",
    { htmlContent, layoutSettings },
    { responseType: "blob" },
  );
  return res.data;
};

// 🚀 Fixed: Removed 'any', returning a generic object/void based on your API
export const saveOptimizedResume = async (
  htmlContent: string,
  layoutSettings: LayoutSettings,
): Promise<Record<string, unknown>> => {
  const res = await axiosInstance.post("/optimizer/save", {
    htmlContent,
    layoutSettings,
  });
  return res.data;
};
