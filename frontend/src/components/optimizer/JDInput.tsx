// JDInput.tsx
"use client"
interface Props { value: string; onChange: (v: string) => void }

export default function JDInput({ value, onChange }: Props) {
  return (
    <textarea
      className="w-full bg-black/50 border border-white/10 p-4 rounded-xl h-40 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none font-medium custom-scrollbar placeholder:text-zinc-600"
      placeholder="Paste the Job Description (JD) here. Our AI will analyze requirements and tailor your bullets..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}