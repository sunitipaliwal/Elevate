"use client"

import { useState } from "react"
import { Save, Download, Sparkles, Loader2 } from "lucide-react"
import { generateOptimizedResume, saveOptimizedResume } from "@/services/optimizer.service"
import { LayoutSettings } from "@/types/resume.types"

interface Props {
  layoutSettings: LayoutSettings;
}

export default function OptimizerActions({ layoutSettings }: Props) {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [isBoth, setIsBoth] = useState<boolean>(false)

  const getHtmlContent = (): string | null => {
    const printElement = document.getElementById('resume-print-area');
    return printElement ? printElement.outerHTML : null;
  }

  const handleDownload = async () => {
    const html = getHtmlContent();
    if (!html) return alert("Preview not ready");

    try {
      setIsDownloading(true);
      const blob = await generateOptimizedResume(html, layoutSettings);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "optimized_resume.pdf";
      a.click();
    } catch (error) {
      console.error(error);
      alert("Failed to download PDF.");
    } finally {
      setIsDownloading(false);
    }
  }

  const handleSave = async () => {
    const html = getHtmlContent();
    if (!html) return alert("Preview not ready");

    try {
      setIsSaving(true);
      await saveOptimizedResume(html, layoutSettings);
      alert("Saved to your resumes successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save resume.");
    } finally {
      setIsSaving(false);
    }
  }

  const handleSaveAndDownload = async () => {
    const html = getHtmlContent();
    if (!html) return alert("Preview not ready");

    try {
      setIsBoth(true);
      await saveOptimizedResume(html, layoutSettings);
      const blob = await generateOptimizedResume(html, layoutSettings);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "optimized_resume.pdf";
      a.click();
    } catch (error) {
      console.error(error);
      alert("Action failed.");
    } finally {
      setIsBoth(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleSave}
        disabled={isSaving || isDownloading || isBoth}
        className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-4 py-2 rounded-xl transition-all border border-white/10 hover:border-purple-500/50 disabled:opacity-50"
      >
        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />}
        Save to Profile
      </button>

      <button
        onClick={handleDownload}
        disabled={isSaving || isDownloading || isBoth}
        className="group flex items-center gap-2 bg-white text-black font-bold px-4 py-2 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:hover:scale-100"
      >
        {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />}
        Download PDF
      </button>

      <button
        onClick={handleSaveAndDownload}
        disabled={isSaving || isDownloading || isBoth}
        className="group flex items-center gap-2 bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold px-5 py-2 rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50"
      >
        {isBoth ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />}
        Save + Download
      </button>
    </div>
  )
}