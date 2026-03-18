"use client"

import { motion } from "framer-motion"
import { ExternalLink, Download, FileText, AlertCircle } from "lucide-react"

interface ResumeViewerProps {
  url: string
  title?: string
}

export default function ResumeViewer({ url, title }: ResumeViewerProps) {
  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
        <AlertCircle className="w-10 h-10 text-zinc-500 mb-3" />
        <p className="text-zinc-400 font-medium">No resume URL provided.</p>
      </div>
    )
  }

  // Cloudinary URL transformation for proper PDF viewing
  const getCleanPdfUrl = (originalUrl: string): string => {
    let cleanUrl = originalUrl.replace("/upload/", "/upload/f_pdf/")
    if (!cleanUrl.toLowerCase().endsWith(".pdf")) {
      cleanUrl += ".pdf"
    }
    return cleanUrl
  }

  const finalUrl = getCleanPdfUrl(url)

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-500/20 rounded-lg border border-violet-500/30">
              <FileText className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {title || "Resume Preview"}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Viewing active document
          </p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <a
            href={finalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border border-white/10 hover:border-white/20"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            Open in Tab
          </a>
          <a
            href={finalUrl.replace("/upload/", "/upload/fl_attachment/")}
            download
            className="flex-1 sm:flex-none group flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Download
          </a>
        </div>
      </div>

      {/* PDF Container Wrapper with Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative group"
      >
        {/* Subtle hover glow behind PDF */}
        <div className="absolute -inset-1 bg-linear-to-b from-violet-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* PDF Iframe */}
        {/* Using h-200 (approx 800px in v4) for a tall, readable document view */}
        <div className="relative w-full h-200 border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#525659] z-10 ring-1 ring-black/50">
          <iframe
            src={`${finalUrl}#view=FitH&navpanes=0&toolbar=1`}
            title="Resume PDF"
            className="w-full h-full bg-transparent"
            frameBorder="0"
          />
        </div>
      </motion.div>

      <p className="text-center text-sm text-zinc-500 bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
        <span className="text-yellow-500/80 mr-1">⚠️</span> Note: If the document does not appear, please click &quot;Open in Tab&quot; or ensure you are using a modern browser.
      </p>
    </div>
  )
}