"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Menu, X, LogOut, ChevronDown } from "lucide-react"

import { useAuth } from "@/context/auth.context"
import { googleLogin } from "@/services/auth.service"
import Image from "next/image"

// ==========================================
// TYPES
// ==========================================
interface User {
  avatar?: string;
  name?: string;
  email?: string;
}

interface NavLink {
  name: string;
  path: string;
}

// Routes configuration
const NAV_LINKS: NavLink[] = [
  { name: "Optimizer", path: "/optimizer" },
  { name: "Find Jobs", path: "/jobs" },
  { name: "Pro Tips", path: "/rules" },
  { name: "Dashboard", path: "/dashboard" },
]

// ==========================================
// SUB-COMPONENTS
// ==========================================

const NavLogo = () => (
  <Link href="/" className="flex items-center gap-2 group cursor-pointer">
    <div className="bg-violet-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
      <Sparkles className="w-5 h-5 text-white" />
    </div>
    <span className="text-xl font-extrabold text-white tracking-tight">Elevate</span>
  </Link>
)

const DesktopLinks = ({ currentPath }: { currentPath: string }) => (
  <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1.5 rounded-full backdrop-blur-md">
    {NAV_LINKS.map((link) => {
      const isActive = currentPath.startsWith(link.path)
      return (
        <Link
          key={link.path}
          href={link.path}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${isActive ? "text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
        >
          {link.name}
          {/* Active indicator dot */}
          {isActive && (
            <motion.div
              layoutId="activeNavIndicator"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full"
            />
          )}
        </Link>
      )
    })}
  </div>
)

const UserProfileMenu = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 p-1.5 pr-4 rounded-full transition-all cursor-pointer"
      >
        <Image
          src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=random"}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full border border-white/20 object-cover"
        />
        <ChevronDown className="w-4 h-4 text-zinc-400" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-48 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// MAIN NAVBAR COMPONENT
// ==========================================

export default function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  return (
    <>
      {/* 🔮 Glassmorphism Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* 1. Logo */}
          <NavLogo />

          {/* 2. Desktop Links */}
          <DesktopLinks currentPath={pathname} />

          {/* 3. Auth Actions */}
          <div className="hidden md:flex items-center">
            {user ? (
              <UserProfileMenu user={user} onLogout={logout} />
            ) : (
              <button
                onClick={googleLogin}
                className="bg-white text-black hover:bg-zinc-200 font-bold px-6 py-2.5 rounded-full text-sm transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105"
              >
                Login with Google
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </nav>

      {/* 📱 Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-4 text-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-bold py-4 border-b border-white/5 cursor-pointer ${pathname.startsWith(link.path) ? "text-violet-400" : "text-zinc-400 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pb-12 flex justify-center">
              {user ? (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); logout(); }}
                  className="flex items-center justify-center gap-2 w-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold px-6 py-4 rounded-2xl cursor-pointer"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); googleLogin(); }}
                  className="w-full bg-white text-black font-bold px-6 py-4 rounded-2xl cursor-pointer"
                >
                  Login with Google
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}