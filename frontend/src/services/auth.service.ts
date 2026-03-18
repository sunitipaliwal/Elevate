import axiosInstance from "@/lib/axios"
import { User } from "@/types/user.types"

export const getCurrentUser = async (): Promise<User> => {
  const res = await axiosInstance.get("/auth/me")
  return res.data
}

export const logoutUser = async () => {
  await axiosInstance.post("/auth/logout")
}

export const googleLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/google"
}