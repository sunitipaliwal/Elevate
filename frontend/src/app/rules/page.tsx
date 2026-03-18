"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  XCircle,
  CheckCircle2,
  Lightbulb,
  Bot,
  TrendingUp,
  Link as LinkIcon,
  TerminalSquare,
  Target,
  PenTool
} from "lucide-react"

// 💡 100% Type-Safe Interfaces
interface Example {
  id: string;
  title: string;
  icon: React.ReactNode;
  bad: string;
  good: string;
  tip: string;
}

interface CheatCode {
  title: string;
  icon: React.ReactNode;
  description: string;
  colorClass: string;
}

// 🚀 EXPANDED & STRONGER CONTENT
const EXAMPLES: Example[] = [
  {
    id: "projects",
    title: "Project Bullet Points",
    icon: <TerminalSquare className="w-4 h-4" />,
    bad: "Made a website for library management using React and Node.",
    good: "Architected a full-stack Library Management System using React.js and Node.js, serving 500+ daily users with 99% uptime.",
    tip: "Always use the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]."
  },
  {
    id: "summary",
    title: "Professional Summary",
    icon: <PenTool className="w-4 h-4" />,
    bad: "I am a hardworking software engineer looking for a job to grow my skills and learn new technologies.",
    good: "Results-driven Software Engineer with 2+ years of MERN stack experience. Proven track record of optimizing database queries by 40% and delivering scalable APIs.",
    tip: "Don't state what you want. State what value you bring to the company. Be aggressive with metrics."
  },
  {
    id: "verbs",
    title: "Action Verbs",
    icon: <Target className="w-4 h-4" />,
    bad: "Was responsible for managing the server deployment and helping the team.",
    good: "Spearheaded and automated the AWS server deployment pipeline, reducing manual effort by 15 hours/week.",
    tip: "Avoid passive phrases like 'Responsible for' or 'Helped with'. Use strong verbs: Spearheaded, Architected, Optimized, Engineered."
  },
  {
    id: "metrics",
    title: "Quantifying Impact",
    icon: <TrendingUp className="w-4 h-4" />,
    bad: "Improved the website speed and fixed a lot of bugs.",
    good: "Resolved 50+ critical bugs and optimized React rendering, decreasing page load time from 4.2s to 1.1s.",
    tip: "Recruiters love numbers. If you don't have exact numbers, use realistic estimates or percentages."
  },
  {
    id: "softskills",
    title: "Proving Soft Skills",
    icon: <Lightbulb className="w-4 h-4" />,
    bad: "Good communicator, team player, and strong problem solver.",
    good: "Collaborated cross-functionally with design and product teams to deliver 3 major feature releases 2 weeks ahead of schedule.",
    tip: "Show, don't tell. Instead of listing 'Teamwork' in skills, write a bullet point proving how you worked in a team."
  }
]

const CHEAT_CODES: CheatCode[] = [
  {
    title: "Beat the ATS Bot",
    icon: <Bot className="w-6 h-6" />,
    description: "Applicant Tracking Systems can't read images, charts, or multiple columns. Stick to standard single-column text formats (like our Live Studio generates!).",
    colorClass: "text-purple-400 bg-purple-500/10 border-purple-500/20"
  },
  {
    title: "Quantify Everything",
    icon: <TrendingUp className="w-6 h-6" />,
    description: "Scale matters. Don't just say 'managed a database'. Say 'managed a 50GB+ PostgreSQL database serving 10k+ queries per minute'.",
    colorClass: "text-green-400 bg-green-500/10 border-green-500/20"
  },
  {
    title: "Hyperlink Smartly",
    icon: <LinkIcon className="w-6 h-6" />,
    description: "Always hyperlink your Email, LinkedIn, GitHub, and Live Projects. Make it as easy as 1-click for recruiters to see your actual work.",
    colorClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
  }
]

export default function ResumeTipsPage() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [showGood, setShowGood] = useState<boolean>(true)

  return (
    <div className="min-h-screen mt-20 bg-[#050505] text-zinc-50 font-sans overflow-hidden relative pb-20 pt-10">

      {/* 🌌 Deep Space Glow */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-200 h-125 opacity-20 bg-linear-to-b from-purple-600 to-cyan-600 blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-2 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            <BookOpen className="w-3 h-3" /> Pro Resource
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            The Ultimate <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">Playbook.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Stop guessing what recruiters want. Master the art of writing ATS-friendly resumes with our interactive before & after engineering.
          </p>
        </motion.div>

        {/* 🚀 THE INTERACTIVE BEFORE & AFTER COMPONENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 rounded-3xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xl"
        >
          {/* TABS HEADER */}
          <div className="bg-black/40 border-b border-white/5 p-4 flex gap-2 overflow-x-auto custom-scrollbar">
            {EXAMPLES.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => { setActiveTab(idx); setShowGood(true); }}
                className={`whitespace-nowrap px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === idx
                  ? 'bg-linear-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                  }`}
              >
                {ex.icon} {ex.title}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-white/10 pb-6">
              <h3 className="text-3xl font-extrabold text-white flex items-center gap-3">
                {EXAMPLES[activeTab].title}
              </h3>

              {/* NEON TOGGLE SWITCH */}
              <div className="flex items-center bg-black/50 rounded-2xl p-1.5 border border-white/10 shadow-inner">
                <button
                  onClick={() => setShowGood(false)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${!showGood
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                    }`}
                >
                  <XCircle className="w-4 h-4" /> Bad Example
                </button>
                <button
                  onClick={() => setShowGood(true)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${showGood
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                    : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                    }`}
                >
                  <CheckCircle2 className="w-4 h-4" /> Pro Example
                </button>
              </div>
            </div>

            {/* THE SHOWCASE BOX */}
            <div className="relative min-h-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={showGood ? 'good' : 'bad'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute inset-0 p-8 rounded-2xl border-l-4 backdrop-blur-sm ${showGood
                    ? 'bg-green-500/5 border-green-500 shadow-[inset_0_0_30px_rgba(34,197,94,0.05)]'
                    : 'bg-red-500/5 border-red-500 shadow-[inset_0_0_30px_rgba(239,68,68,0.05)]'
                    }`}
                >
                  <p className={`text-xl md:text-2xl font-medium leading-relaxed ${showGood ? 'text-green-100' : 'text-red-100'}`}>
                    &quot;{showGood ? EXAMPLES[activeTab].good : EXAMPLES[activeTab].bad}&quot;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* THE PRO TIP */}
            <motion.div
              key={`tip-${activeTab}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="mt-8 bg-cyan-500/10 p-5 rounded-2xl border border-cyan-500/20 flex gap-4 items-start"
            >
              <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400 shrink-0 border border-cyan-500/30">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-xs mb-1">Recruiter Secret</h4>
                <p className="text-cyan-50 font-medium leading-relaxed">{EXAMPLES[activeTab].tip}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 📌 CHEAT CODES / QUICK TIPS BENTO GRID */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">
            Resume Cheat Codes 🚀
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHEAT_CODES.map((code, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (idx * 0.1) }}
                key={idx}
                className="group bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Subtle Hover Glow */}
                <div className={`absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl z-0 pointer-events-none ${code.colorClass.replace('text-', 'bg-').replace('border-', 'to-')}`}></div>

                <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${code.colorClass}`}>
                  {code.icon}
                </div>
                <h3 className="relative z-10 text-2xl font-bold text-white mb-3">{code.title}</h3>
                <p className="relative z-10 text-zinc-400 leading-relaxed font-medium">{code.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}