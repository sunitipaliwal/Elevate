"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Loader2, FileWarning } from "lucide-react"

import { getResumeById } from "@/services/resume.service"
import ResumeViewer from "@/components/pdf/ResumeViewer"
import { Resume } from "@/types/resume.types" // Assuming you have this type exported

export default function ResumePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [resume, setResume] = useState<Resume | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!id) return

    const loadResume = async () => {
      try {
        setIsLoading(true)
        const data = await getResumeById(id)
        setResume(data)
      } catch (error) {
        console.error("Failed to load resume", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadResume()
  }, [id])

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-50 font-sans overflow-hidden relative pb-20 pt-10">
      {/* 🌌 Background Glow Effect */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-200 h-125 opacity-20 bg-linear-to-b from-violet-600 to-cyan-600 blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-8">

        {/* Top Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => router.push("/dashboard")}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-fit px-4 py-2 rounded-xl hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm">Back to Dashboard</span>
        </motion.button>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 space-y-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500 blur-xl opacity-20 rounded-full"></div>
                <Loader2 className="w-12 h-12 text-violet-400 animate-spin relative z-10" />
              </div>
              <p className="text-zinc-400 font-medium">Fetching your resume...</p>
            </motion.div>
          ) : !resume ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              <FileWarning className="w-16 h-16 text-red-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Resume Not Found</h2>
              <p className="text-zinc-500">The requested document could not be loaded or has been deleted.</p>
            </motion.div>
          ) : (
            <motion.div
              key="viewer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ResumeViewer url={resume.fileUrl} title={resume.title} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}