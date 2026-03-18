import { Sparkles } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 bg-[#050505] text-center text-zinc-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-bold text-white text-xl flex items-center gap-2"><Sparkles className="w-5 h-5 text-violet-500" /> Elevate</p>
        <p className="text-sm">© {new Date().getFullYear()} Elevate Platform. Built for the top 1%.</p>
        <div className="flex gap-6 text-sm">
          <Link href="/tips" className="hover:text-white transition-colors">Pro Tips</Link>
          <Link href="/jobs" className="hover:text-white transition-colors">Find Jobs</Link>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
