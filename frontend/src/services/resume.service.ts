import axiosInstance from "@/lib/axios"
import { Resume } from "@/types/resume.types"

export const uploadResume = async (data: FormData) => {

  const res = await axiosInstance.post(
    "/resume/upload",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  )

  return res.data
}

export const getMyResumes = async (): Promise<Resume[]> => {

  const res = await axiosInstance.get(
    "/resume/my-resumes"
  )

  return res.data
}


export const getResumeById = async (id: string) => {

  const res = await axiosInstance.get(
    `/resume/${id}`
  )

  return res.data
}

export const deleteResume = async (id: string) => {

  const res = await axiosInstance.delete(
    `/resume/${id}`
  )

  return res.data
}