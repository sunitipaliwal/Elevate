import axiosInstance from "@/lib/axios";
import { JobMatch } from "@/types/jobs.types";

export const getJobMatches = async (resumeId: string): Promise<JobMatch[]> => {
  const res = await axiosInstance.post("/jobs/match", { resumeId });
  return res.data.matches;
};
