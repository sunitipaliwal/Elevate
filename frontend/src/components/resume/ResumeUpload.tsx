"use client"

import { useState, useRef } from "react"
import { uploadResume } from "@/services/resume.service"
import { UploadCloud, File, Loader2, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  onUploadSuccess: () => void
}

export default function ResumeUpload({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setIsSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("resume", file)

      await uploadResume(formData)

      setIsSuccess(true)
      setTimeout(() => {
        setFile(null)
        setIsSuccess(false)
        if (fileInputRef.current) fileInputRef.current.value = ""
        onUploadSuccess()
      }, 1500) // Show success state briefly before refreshing

    } catch (error) {
      console.error("Upload failed", error)
      alert("Failed to upload resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 w-full">
      <div className="relative flex-1 w-full group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading || isSuccess}
        />
        <div className={`flex items-center gap-4 px-6 py-4 border-2 border-dashed rounded-2xl transition-all duration-300 ${file ? "border-violet-500/50 bg-violet-500/5" : "border-white/20 bg-white/5 group-hover:border-white/40 group-hover:bg-white/10"
          }`}>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            {file ? <File className="w-6 h-6 text-violet-400" /> : <UploadCloud className="w-6 h-6 text-cyan-400" />}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-white truncate">
              {file ? file.name : "Click to browse or drag PDF here"}
            </span>
            <span className="text-xs text-zinc-500 mt-1">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Max file size: 5MB (PDF only)"}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.button
          key={isUploading ? "uploading" : isSuccess ? "success" : "idle"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={handleUpload}
          disabled={!file || isUploading || isSuccess}
          className={`w-full md:w-auto px-8 py-4 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${isSuccess
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-white text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            }`}
        >
          {isUploading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Optimizing...</>
          ) : isSuccess ? (
            <><CheckCircle2 className="w-5 h-5" /> Uploaded</>
          ) : (
            <><UploadCloud className="w-5 h-5" /> Upload Resume</>
          )}
        </motion.button>
      </AnimatePresence>
    </div>
  )
}