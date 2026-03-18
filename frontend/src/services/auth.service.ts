import axiosInstance from "@/lib/axios";
import { User } from "@/types/user.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCurrentUser = async (): Promise<User> => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const logoutUser = async () => {
  await axiosInstance.post("/auth/logout");
};

export const googleLogin = () => {
  window.location.href = `${API_URL}/auth/google`;
};
