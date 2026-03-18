"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Sparkles, LayoutDashboard } from "lucide-react"

import ResumeUpload from "@/components/resume/ResumeUpload"
import ResumeCard from "@/components/resume/ResumeCard"

import { getMyResumes } from "@/services/resume.service"
import { Resume } from "@/types/resume.types"

export default function Dashboard() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadResumes = async () => {
    try {
      setIsLoading(true)
      const data = await getMyResumes()
      setResumes(data)
    } catch (error) {
      console.error("Failed to fetch resumes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResumes()
  }, [])

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((resume) => resume._id !== id))
  }

  return (
    <div className="min-h-screen mt-20 bg-[#050505] text-zinc-50 font-sans overflow-hidden relative pb-20 pt-10">
      {/* 🌌 Background Glow Effect (Matching Home Page) */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-200 h-100 opacity-20 bg-linear-to-b from-violet-600 to-cyan-600 blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-cyan-300 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <LayoutDashboard className="w-4 h-4" /> Dashboard Workspace
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Manage your <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">Resumes.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Upload, update, and track your tailored ATS-friendly resumes all in one place.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-[80px] group-hover:bg-violet-500/20 transition-all pointer-events-none"></div>
          <ResumeUpload onUploadSuccess={loadResumes} />
        </motion.div>

        {/* Resumes Grid */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h2 className="text-2xl font-bold text-white">Your Arsenal</h2>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-white/5 animate-pulse rounded-2xl border border-white/10"></div>
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20 backdrop-blur-sm"
            >
              <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-300 mb-2">No resumes yet</h3>
              <p className="text-zinc-500">Upload your first resume above to get started.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {resumes.map((resume, index) => (
                  <ResumeCard
                    key={resume._id}
                    resume={resume}
                    onDelete={handleDelete}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}