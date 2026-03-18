// ResumeSelector.tsx
"use client"
import { FileText } from "lucide-react"
import { Resume } from "@/types/resume.types"

interface Props { resumes: Resume[]; onSelect: (id: string) => void }

export default function ResumeSelector({ resumes, onSelect }: Props) {
  return (
    <div className="relative">
      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
      <select
        className="w-full bg-black/50 border border-white/10 text-white p-4 pl-12 rounded-xl appearance-none focus:ring-2 focus:ring-purple-500 outline-none transition-all cursor-pointer font-medium"
        onChange={(e) => onSelect(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled className="bg-zinc-900 text-zinc-500">Select a base resume to optimize...</option>
        {resumes.map((resume) => (
          <option key={resume._id} value={resume._id} className="bg-zinc-900 text-white">
            {resume.title} (v{resume.version})
          </option>
        ))}
      </select>
    </div>
  )
}

