"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FileText, Eye, Trash2, Loader2, ChevronRight } from "lucide-react"

import { Resume } from "@/types/resume.types"
import { deleteResume } from "@/services/resume.service"

interface Props {
  resume: Resume
  onDelete: (id: string) => void
  index: number
}

export default function ResumeCard({ resume, onDelete, index }: Props) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering card click
    try {
      setIsDeleting(true)
      await deleteResume(resume._id)
      onDelete(resume._id)
    } catch (error) {
      console.error("Delete failed")
      setIsDeleting(false)
    }
  }

  const handleView = () => {
    router.push(`/resume/${resume._id}`)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={handleView}
      className="group relative flex flex-col justify-between p-6 bg-zinc-900 border border-white/10 rounded-3xl hover:border-violet-500/40 hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Subtle hover gradient */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-violet-600/20 blur-[60px] group-hover:bg-cyan-600/20 transition-all"></div>

      <div className="relative z-10 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
            <FileText className="w-6 h-6 text-zinc-300 group-hover:text-white" />
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-violet-500/10 text-violet-300 border border-violet-500/20">
            v{resume.version || "1.0"}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all">
          {resume.title || "Untitled Resume"}
        </h3>
        <p className="text-sm text-zinc-500 mt-2 flex items-center gap-1">
          PDF Document <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleView()
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-300 bg-white/5 rounded-xl hover:bg-white/10 hover:text-white transition-colors backdrop-blur-md border border-transparent hover:border-white/10"
        >
          <Eye className="w-4 h-4" /> View
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-400 bg-red-500/10 rounded-xl hover:bg-red-500/20 disabled:opacity-50 transition-colors border border-transparent hover:border-red-500/20"
        >
          {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </motion.div>
  )
}