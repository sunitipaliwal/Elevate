"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, LayoutPanelLeft, Sparkles, Loader2 } from "lucide-react"

import { getMyResumes } from "@/services/resume.service"
import { analyzeResume } from "@/services/optimizer.service"

import ResumeSelector from "@/components/optimizer/ResumeSelector"
import JDInput from "@/components/optimizer/JDInput"
import ScoreCard from "@/components/optimizer/ScoreCard"
import ImprovementList from "@/components/optimizer/ImprovementList"
import OptimizerActions from "@/components/optimizer/OptimizerActions"
import LiveEditor from "@/components/optimizer/LiveEditor"
import ResumePreview from "@/components/optimizer/ResumePreview"

import { Resume } from "@/types/resume.types"
import { OptimizerResult } from "@/types/optimizer.types"
import { LayoutSettings, OptimizedResumeData } from "@/types/resume.types" // Ensure these are exported

export default function OptimizerPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [selectedResume, setSelectedResume] = useState<string>("")
  const [jd, setJD] = useState<string>("")
  const [result, setResult] = useState<OptimizerResult | null>(null)

  const [editableData, setEditableData] = useState<OptimizedResumeData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [showStudio, setShowStudio] = useState<boolean>(false)

  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    fontFamily: 'Arial, Helvetica, sans-serif',
    themeColor: '#8B5CF6', // Updated default to a cooler purple
    bulletStyle: 'square',
    headingWeight: 700,
    bodyWeight: 400,
    nameFont: 22,
    headingFont: 12,
    subHeadingFont: 10.5,
    bodyFont: 10,
    sectionGap: 0.8,
    lineGap: 2,
    marginY: 40,
    marginX: 45
  })

  useEffect(() => {
    const loadResumes = async () => {
      const data = await getMyResumes()
      setResumes(data)
    }
    loadResumes()
  }, [])

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    try {
      const data: OptimizerResult = await analyzeResume(selectedResume, jd)

      console.log("🤖 RAW AI RESPONSE:", data);

      setResult(data)

      // 🛡️ ZERO 'ANY' BULLETPROOF FIX: Strongly typed data extraction
      const extractedResume: OptimizedResumeData =
        data.optimizedSections?.completeResume ||
        data.sections?.completeResume ||
        data.completeResume ||
        {};

      if (Object.keys(extractedResume).length === 0) {
        console.warn("⚠️ Warning: Could not find completeResume in the data!");
      }

      setEditableData(extractedResume)
    } catch (error) {
      alert("Analysis failed. Please try again.")
      console.error("error ", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen mt-20 bg-[#050505] text-zinc-50 font-sans overflow-hidden relative pb-20 pt-10">
      {/* 🌌 Deep Space Glow */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-200 h-125 opacity-20 bg-linear-to-b from-purple-600 to-cyan-600 blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-400 mx-auto px-6 lg:px-10 relative z-10 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-2">
              <Sparkles className="w-3 h-3" /> AI Engine Active
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Resume <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">Optimizer.</span>
            </h1>
          </motion.div>

          {result && editableData && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowStudio(!showStudio)}
              className="bg-white text-black px-6 py-3 rounded-xl font-bold shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all hover:scale-105 flex items-center gap-2"
            >
              {showStudio ? <Wand2 className="w-5 h-5" /> : <LayoutPanelLeft className="w-5 h-5" />}
              {showStudio ? "Exit Studio Mode" : "Open Live Studio"}
            </motion.button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!showStudio ? (
            <motion.div
              key="analyzer"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-4 text-white">1. Select Target Resume</h3>
                  <ResumeSelector resumes={resumes} onSelect={setSelectedResume} />
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-4 text-white">2. Target Job Description</h3>
                  <JDInput value={jd} onChange={setJD} />
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !selectedResume || !jd}
                className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:grayscale text-white font-bold px-6 py-5 rounded-2xl transition-all flex justify-center items-center gap-3 text-lg shadow-xl"
              >
                {isAnalyzing ? <><Loader2 className="w-6 h-6 animate-spin" /> Optimizing Algorithms...</> : <><Sparkles className="w-6 h-6" /> Analyze & Optimize Resume</>}
              </button>

              {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/10">
                  <div className="lg:col-span-4">
                    <ScoreCard result={result} />
                  </div>
                  <div className="lg:col-span-8 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <ImprovementList result={result} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-8"
            >
              {/* LEFT: Controls */}
              <div className="lg:col-span-5 h-[75vh] overflow-y-auto pr-4 custom-scrollbar">
                <LiveEditor resumeData={editableData!} onChange={setEditableData} layoutSettings={layoutSettings} onLayoutChange={setLayoutSettings} />
              </div>

              {/* RIGHT: Preview */}
              <div className="lg:col-span-7 bg-black/40 border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-start h-[75vh] overflow-y-auto relative backdrop-blur-xl shadow-inner">
                <div className="sticky top-0 w-full mb-6 z-10 flex justify-end">
                  <div className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white/20">
                    <OptimizerActions layoutSettings={layoutSettings} />
                  </div>
                </div>
                <div className="w-full max-w-200 transition-all relative group">
                  <div className="absolute -inset-4 bg-linear-to-b from-purple-500/20 to-cyan-500/20 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <ResumePreview data={editableData!} layout={layoutSettings} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}