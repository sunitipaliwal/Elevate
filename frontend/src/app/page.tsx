"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Wand2,
  Target,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Layout,
  ShieldCheck
} from "lucide-react"
import Footer from "@/components/layout/Footer"

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface TestimonialProps {
  text: string;
  author: string;
  role: string;
}

interface StepProps {
  id: number;
  colorClass: string;
  title: string;
  description: string;
}

// ==========================================
// DATA ARRAYS (Keeps component logic clean)
// ==========================================
const TESTIMONIALS: TestimonialProps[] = [
  {
    text: "I was getting rejected for 3 months straight. Used Elevate to rewrite my resume, matched my skills to a JD, and got 3 interviews in a week.",
    author: "Rahul S.",
    role: "Software Development Engineer"
  },
  {
    text: "The Live Studio is insane. I squeezed my 2-page resume into 1 page just by tweaking the margin and line-height sliders. Absolutely love it.",
    author: "Priya M.",
    role: "Product Manager"
  },
  {
    text: "The Magic Links feature saved me hours. Instead of scrolling Naukri, I just clicked the generated link and applied to the top 10 matches.",
    author: "Aman K.",
    role: "Data Analyst"
  }
]

const STEPS: StepProps[] = [
  {
    id: 1,
    colorClass: "bg-violet-500",
    title: "Input Your Data",
    description: "Paste your old resume, LinkedIn profile, or rough notes. We accept it all."
  },
  {
    id: 2,
    colorClass: "bg-cyan-500",
    title: "AI Optimization",
    description: "Our engine scans your target JD and rewrites your bullets to perfectly align with recruiter expectations."
  },
  {
    id: 3,
    colorClass: "bg-blue-500",
    title: "Design & Apply",
    description: "Tweak the design in our Live Studio, download the PDF, and click Magic Links to apply instantly."
  }
]

// ==========================================
// SUB-COMPONENTS
// ==========================================
const TestimonialCard = ({ text, author, role }: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/5 border border-white/10 p-8 rounded-2xl text-left hover:bg-white/10 transition-colors"
  >
    <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
    <p className="text-zinc-300 mb-6 leading-relaxed">&quot;{text}&quot;</p>
    <div>
      <p className="font-bold text-white">{author}</p>
      <p className="text-sm text-zinc-500">{role}</p>
    </div>
  </motion.div>
)

const StepItem = ({ id, colorClass, title, description }: StepProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: id * 0.2 }}
    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
  >
    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] ${colorClass} text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
      {id}
    </div>
    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm text-left hover:bg-white/10 transition-colors">
      <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
      <p className="text-zinc-400">{description}</p>
    </div>
  </motion.div>
)

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function Home() {
  return (
    // 🌌 Deep Space Dark Theme
    <div className="min-h-screen bg-[#050505] text-zinc-50 selection:bg-violet-500/30 font-sans overflow-hidden">

      {/* --- 🌟 HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 opacity-30 bg-linear-to-b from-violet-600 to-cyan-600 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-violet-300 mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.1)]"
          >
            <Sparkles className="w-4 h-4" /> Elevate 2.0 is now live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8"
          >
            Stop guessing. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-cyan-400 to-blue-500">
              Start getting hired.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The world&apos;s most advanced AI career platform. We rewrite your resume to beat the ATS, design it to perfection, and match you with roles you&apos;ll actually love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/optimizer" className="cursor-pointer group relative inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Optimize Resume Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/jobs" className="cursor-pointer group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all backdrop-blur-md">
              Find Job Matches
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- 🏢 SOCIAL PROOF MARQUEE --- */}
      <section className="py-10 border-y border-white/5 bg-white/2">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-zinc-500 mb-6 uppercase tracking-widest">Our users have been hired at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale select-none pointer-events-none">
            <span className="text-xl md:text-2xl font-bold font-serif">Google</span>
            <span className="text-xl md:text-2xl font-bold">Microsoft</span>
            <span className="text-xl md:text-2xl font-bold italic">Amazon</span>
            <span className="text-xl md:text-2xl font-extrabold tracking-tighter">Netflix</span>
            <span className="text-xl md:text-2xl font-bold font-mono">Meta</span>
          </div>
        </div>
      </section>

      {/* --- ⚡ THE PROBLEM VS SOLUTION --- */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">The game is rigged. <span className="text-zinc-500">We un-rig it.</span></h2>
            <p className="text-zinc-400 text-lg">75% of resumes are rejected by bots before a human ever sees them.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl"></div>
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">❌ The Old Way</h3>
              <ul className="space-y-4 text-zinc-300">
                <li className="flex items-start gap-3"><span className="mt-1 opacity-50">→</span> Guessing which keywords to use.</li>
                <li className="flex items-start gap-3"><span className="mt-1 opacity-50">→</span> Formatting breaks in Word/Docs.</li>
                <li className="flex items-start gap-3"><span className="mt-1 opacity-50">→</span> Applying to 100s of wrong jobs.</li>
                <li className="flex items-start gap-3"><span className="mt-1 opacity-50">→</span> Ghosted by recruiters.</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-violet-500/10 border border-violet-500/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.1)]"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/20 blur-[80px]"></div>
              <h3 className="text-2xl font-bold text-violet-400 mb-6 flex items-center gap-2"><CheckCircle2 className="w-6 h-6" /> The Elevate Way</h3>
              <ul className="space-y-4 text-zinc-200 font-medium">
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">✓</span> AI analyzes the exact Job Description.</li>
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">✓</span> Bullet points rewritten for impact & metrics.</li>
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">✓</span> Pixel-perfect PDF generation (Puppeteer).</li>
                <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">✓</span> Smart matching with 1-click apply links.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 🍱 BENTO GRID FEATURES --- */}
      <section className="py-24 bg-[#0a0a0a] px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">A complete arsenal.</h2>
            <p className="text-zinc-400 text-lg">Everything you need, packed into a beautiful interface.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Big Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 bg-linear-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-600/20 blur-[100px] group-hover:bg-violet-600/30 transition-all"></div>
              <Wand2 className="w-12 h-12 text-violet-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">AI-Powered Rewriting</h3>
              <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                Our Gemini-powered engine doesn&apos;t just check spelling. It fundamentally restructures your experience into action-driven, quantifiable achievements that recruiters crave.
              </p>
              <div className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-xl hidden md:block select-none">
                <p className="text-red-400 line-through text-sm mb-2">Did database work.</p>
                <p className="text-green-400 font-medium text-sm">Optimized PostgreSQL queries, reducing latency by 40%.</p>
              </div>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden hover:border-white/20 transition-colors"
            >
              <Layout className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Live Studio</h3>
              <p className="text-zinc-400 text-sm">Adjust margins, fonts, and weights in real-time. Zero layout breaks.</p>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden hover:border-white/20 transition-colors"
            >
              <Target className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Magic Match</h3>
              <p className="text-zinc-400 text-sm">Upload resume & get instant LinkedIn/Naukri search URLs for your exact roles.</p>
            </motion.div>

            {/* Wide Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-3 bg-zinc-900 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-white/2 transition-colors"
            >
              <div>
                <ShieldCheck className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">100% ATS Compliant</h3>
                <p className="text-zinc-400">Our PDF engine ensures text is perfectly selectable and readable by every major ATS scanner on the market.</p>
              </div>
              <div className="flex gap-4 select-none">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl text-zinc-500">PDF</div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl text-zinc-500">TXT</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 🛠️ HOW IT WORKS (Timeline) --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-16"
          >
            Three steps to your dream job.
          </motion.h2>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {STEPS.map((step) => (
              <StepItem key={step.id} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 💬 WALL OF LOVE (Testimonials) --- */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-16"
          >
            Wall of Love ❤️
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, i) => (
              <TestimonialCard key={i} {...test} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 🚀 BOTTOM CTA --- */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-violet-900/20"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10 bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-xl shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Your next job is waiting.</h2>
          <p className="text-xl text-zinc-400 mb-10">Stop procrastinating. Build a resume that actually works in under 5 minutes.</p>
          <Link href="/optimizer" className="cursor-pointer inline-flex items-center gap-2 bg-white text-black font-bold px-10 py-5 rounded-xl text-xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <Zap className="w-5 h-5" /> Get Started Now — It&apos;s Free
          </Link>
        </motion.div>
      </section>

      {/* --- 🏁 FOOTER --- */}
      <Footer />
    </div>
  )
}