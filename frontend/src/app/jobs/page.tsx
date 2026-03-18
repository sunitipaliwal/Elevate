"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Target,
  Sparkles,
  Loader2,
  Briefcase,
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  ExternalLink
} from "lucide-react"

import { getMyResumes } from "@/services/resume.service"
import { getJobMatches } from "@/services/jobs.service"
import { Resume } from "@/types/resume.types"
import { JobMatch } from "@/types/jobs.types"

export default function JobsPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [selectedResume, setSelectedResume] = useState<string>("")
  const [matches, setMatches] = useState<JobMatch[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 1. Load User's Resumes on mount
  useEffect(() => {
    const loadResumes = async () => {
      try {
        const data = await getMyResumes()
        setResumes(data)
        if (data.length > 0) setSelectedResume(data[0]._id) // Auto-select first resume
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.error("Failed to load resumes")
      }
    }
    loadResumes()
  }, [])

  // 2. Fetch AI Matches
  const handleFindJobs = async () => {
    if (!selectedResume) return alert("Please select a resume first!")
    setIsLoading(true)
    setMatches([]) // Clear previous results

    try {
      const data = await getJobMatches(selectedResume)
      setMatches(data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to find jobs. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // 🪄 THE 6 ULTIMATE MAGIC LINKS GENERATORS
  const getLinkedInLink = (keywords: string) => `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}`;
  const getNaukriLink = (keywords: string) => `https://www.naukri.com/${keywords.toLowerCase().replace(/\s+/g, '-')}-jobs`;
  const getIndeedLink = (keywords: string) => `https://www.indeed.com/jobs?q=${encodeURIComponent(keywords)}`;
  const getGlassdoorLink = (keywords: string) => `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(keywords)}`;
  const getInternshalaLink = (keywords: string) => `https://internshala.com/jobs/keywords-${encodeURIComponent(keywords)}`;
  const getFounditLink = (keywords: string) => `https://www.foundit.in/srp/results?query=${encodeURIComponent(keywords)}`;

  return (
    <div className="min-h-screen mt-20 bg-[#050505] text-zinc-50 font-sans overflow-hidden relative pb-20 pt-10">

      {/* 🌌 Deep Space Glow Effect */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-200 h-125 opacity-20 bg-linear-to-b from-cyan-600 to-purple-600 blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-300 mx-auto px-6 relative z-10 space-y-12">

        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-300 mb-2 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <Target className="w-3 h-3" /> Career Matchmaker API
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            AI Job <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">Matchmaker.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Select an optimized resume and let our AI engine scan the market for your perfect roles, complete with direct Magic Links.
          </p>
        </motion.div>

        {/* ACTION BAR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 p-6 rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-center max-w-3xl mx-auto backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute -inset-2 bg-linear-to-r from-cyan-500/10 to-purple-500/10 blur-xl z-0 pointer-events-none"></div>

          <div className="relative w-full md:w-2/3 z-10">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
            <select
              className="w-full appearance-none p-4 pl-12 pr-10 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 bg-black/50 text-white font-medium cursor-pointer transition-all hover:border-white/20"
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
            >
              <option value="" disabled className="bg-zinc-900 text-zinc-500">Select a Resume to analyze...</option>
              {resumes.map(r => (
                <option key={r._id} value={r._id} className="bg-zinc-900 text-white">
                  {r.title || "My Resume"} (Updated: {new Date(r.updatedAt || Date.now()).toLocaleDateString()})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
          </div>

          <button
            onClick={handleFindJobs}
            disabled={isLoading || !selectedResume}
            className="w-full md:w-1/3 z-10 bg-linear-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 disabled:grayscale text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] disabled:hover:scale-100 hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Scanning Market...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Find Dream Jobs</>
            )}
          </button>
        </motion.div>

        {/* LOADING SKELETON */}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-112.5 bg-white/5 animate-pulse rounded-3xl border border-white/10"></div>
            ))}
          </motion.div>
        )}

        {/* RESULTS GRID */}
        <AnimatePresence>
          {!isLoading && matches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="space-y-6 pt-8"
            >
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Top Recommended Roles</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((job, idx) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all flex flex-col relative backdrop-blur-sm"
                  >
                    {/* Hover Glow */}
                    <div className="absolute -inset-full bg-linear-to-b from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0 pointer-events-none"></div>

                    {/* Card Header */}
                    <div className="p-6 border-b border-white/5 relative z-10 bg-black/20">
                      <div className="absolute top-6 right-6 bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                        {job.matchPercentage}% Match
                      </div>
                      <h3 className="text-xl font-extrabold text-white pr-20 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
                        {job.role}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-400 mt-2 flex items-center gap-1">
                        💰 Expected: {job.salaryRange}
                      </p>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 grow space-y-5 relative z-10">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Target className="w-3 h-3" /> Why you match
                        </h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {job.reason}
                        </p>
                      </div>

                      {job.missingSkills && job.missingSkills.length > 0 && (
                        <div className="bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20">
                          <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Missing Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.missingSkills.map((skill, sIdx) => (
                              <span key={sIdx} className="text-xs bg-orange-500/10 border border-orange-500/20 text-orange-300 px-2.5 py-1 rounded-md">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer (6 MAGIC LINKS - 2-Column Grid) */}
                    <div className="p-5 bg-black/40 border-t border-white/5 grid grid-cols-2 gap-3 mt-auto relative z-10">

                      <a href={getLinkedInLink(job.searchKeywords)} target="_blank" rel="noreferrer"
                        className="group/btn flex items-center justify-center gap-1.5 bg-[#0A66C2]/10 hover:bg-[#0A66C2] border border-[#0A66C2]/50 hover:border-transparent text-[#0A66C2] hover:text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all">
                        LinkedIn <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100" />
                      </a>

                      <a href={getNaukriLink(job.searchKeywords)} target="_blank" rel="noreferrer"
                        className="group/btn flex items-center justify-center gap-1.5 bg-blue-500/10 hover:bg-blue-500 border border-blue-500/50 hover:border-transparent text-blue-400 hover:text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all">
                        Naukri <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100" />
                      </a>

                      <a href={getIndeedLink(job.searchKeywords)} target="_blank" rel="noreferrer"
                        className="group/btn flex items-center justify-center gap-1.5 bg-[#003A9B]/20 hover:bg-[#003A9B] border border-[#003A9B]/50 hover:border-transparent text-[#4B84FF] hover:text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all">
                        Indeed <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100" />
                      </a>

                      <a href={getGlassdoorLink(job.searchKeywords)} target="_blank" rel="noreferrer"
                        className="group/btn flex items-center justify-center gap-1.5 bg-[#0CAA41]/10 hover:bg-[#0CAA41] border border-[#0CAA41]/50 hover:border-transparent text-[#0CAA41] hover:text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all">
                        Glassdoor <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100" />
                      </a>

                      <a href={getInternshalaLink(job.searchKeywords)} target="_blank" rel="noreferrer"
                        className="group/btn flex items-center justify-center gap-1.5 bg-[#1295c9]/10 hover:bg-[#1295c9] border border-[#1295c9]/50 hover:border-transparent text-[#1295c9] hover:text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all">
                        Internshala <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100" />
                      </a>

                      <a href={getFounditLink(job.searchKeywords)} target="_blank" rel="noreferrer"
                        className="group/btn flex items-center justify-center gap-1.5 bg-[#6C5CE7]/10 hover:bg-[#6C5CE7] border border-[#6C5CE7]/50 hover:border-transparent text-[#6C5CE7] hover:text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all">
                        Foundit <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100" />
                      </a>

                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}