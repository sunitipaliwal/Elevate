"use client"

import {
  LayoutSettings,
  OptimizedResumeData,
  ProjectItem,
  SkillItem,
  ContactItem,
  AchievementItem,
  ProjectLink
} from "@/types/resume.types"
import { Settings2, PencilRuler, AlignLeft, PaintBucket, Link as LinkIcon, } from "lucide-react"

interface Props {
  resumeData: OptimizedResumeData;
  onChange: (newData: OptimizedResumeData) => void;
  layoutSettings: LayoutSettings;
  onLayoutChange: (newSettings: LayoutSettings) => void;
}

export default function LiveEditor({ resumeData, onChange, layoutSettings, onLayoutChange }: Props) {
  if (!resumeData) return null;

  // --- UPDATERS ---
  const updateSetting = <K extends keyof LayoutSettings>(key: K, value: LayoutSettings[K]) => {
    onLayoutChange({ ...layoutSettings, [key]: value });
  };

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({ ...resumeData, personalInfo: { ...resumeData.personalInfo, name: resumeData.personalInfo?.name || "", [field]: value } });
  };

  const updateContact = (index: number, field: keyof ContactItem, value: string) => {
    const newContacts = [...(resumeData.personalInfo?.contacts || [])];
    newContacts[index] = { ...newContacts[index], [field]: value };
    onChange({ ...resumeData, personalInfo: { ...resumeData.personalInfo, name: resumeData.personalInfo?.name || "", contacts: newContacts } });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateProjectField = (pIndex: number, field: keyof ProjectItem, value: any) => {
    const newProjects = [...(resumeData.projects || [])];
    newProjects[pIndex] = { ...newProjects[pIndex], [field]: value };
    onChange({ ...resumeData, projects: newProjects });
  };

  const updateProjectLink = (pIndex: number, lIndex: number, field: keyof ProjectLink, value: string) => {
    const newProjects = [...(resumeData.projects || [])];
    const newLinks = [...(newProjects[pIndex].links || [])];
    newLinks[lIndex] = { ...newLinks[lIndex], [field]: value };
    newProjects[pIndex] = { ...newProjects[pIndex], links: newLinks };
    onChange({ ...resumeData, projects: newProjects });
  };

  const updateAchievement = (index: number, field: keyof AchievementItem, value: string) => {
    const newAchievements = [...(resumeData.achievements || [])];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    onChange({ ...resumeData, achievements: newAchievements });
  };

  const updateCertification = (index: number, field: keyof AchievementItem, value: string) => {
    const newCertifications = [...(resumeData.certifications || [])];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    onChange({ ...resumeData, certifications: newCertifications });
  };

  // --- STYLES ---
  const inputClass = "w-full bg-black/40 border border-white/10 p-3 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-zinc-100 font-medium transition-all placeholder:text-zinc-600";
  const labelClass = "text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex justify-between items-center";
  const rangeClass = "w-full accent-purple-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer outline-none";

  return (
    <div className="space-y-6 pb-10">

      {/* 🎨 ULTIMATE DESIGN CONTROLS (Kept exactly as you had them) */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md space-y-8 shadow-lg">
        {/* SECTION 1: Typography & Theme */}
        <div>
          <h4 className="font-bold text-white flex items-center gap-2 mb-5">
            <PaintBucket className="w-5 h-5 text-purple-400" /> Typography & Theme
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Typography Style</label>
              <select className={`${inputClass} appearance-none cursor-pointer`} value={layoutSettings.fontFamily} onChange={(e) => updateSetting('fontFamily', e.target.value)}>
                <optgroup label="System (Fast & ATS Safe)" className="bg-zinc-900 text-white">
                  <option value="Arial, Helvetica, sans-serif">🏆 Arial / Helvetica (Recommended)</option>
                  <option value="Calibri, sans-serif">Calibri (Clean & Modern)</option>
                  <option value="Tahoma, sans-serif">Tahoma (Clear & Spaced)</option>
                </optgroup>
                <optgroup label="Modern (Google Fonts)" className="bg-zinc-900 text-white">
                  <option value="'Inter', sans-serif">Inter (Sleek Tech Standard)</option>
                  <option value="'Roboto', sans-serif">Roboto (Google Standard)</option>
                  <option value="'Poppins', sans-serif">Poppins (Friendly & Round)</option>
                </optgroup>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass}>Bullet Style</label>
              <select className={`${inputClass} appearance-none cursor-pointer`} value={layoutSettings.bulletStyle || 'square'} onChange={(e) => updateSetting('bulletStyle', e.target.value)}>
                <option value="square" className="bg-zinc-900 text-white">Square (■)</option>
                <option value="disc" className="bg-zinc-900 text-white">Disc (●)</option>
                <option value="circle" className="bg-zinc-900 text-white">Circle (○)</option>
                <option value="none" className="bg-zinc-900 text-white">None</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className={labelClass}>
                Theme Color (Links Only)
                <span className="text-zinc-500 font-mono text-[10px]">{layoutSettings.themeColor}</span>
              </label>
              <div className="flex items-center gap-3 bg-black/20 p-2 rounded-xl border border-white/5">
                <input type="color" value={layoutSettings.themeColor} onChange={(e) => updateSetting('themeColor', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0" />
                <span className="text-sm text-zinc-400">Used for project and achievement links</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Font Sizes & Weights */}
        <div className="pt-6 border-t border-white/10">
          <h4 className="font-bold text-white flex items-center gap-2 mb-5">
            <Settings2 className="w-5 h-5 text-cyan-400" /> Sizing & Weights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Heading Boldness <span className="text-cyan-400">{layoutSettings.headingWeight}</span></label>
              <input type="range" min="400" max="900" step="100" value={layoutSettings.headingWeight} onChange={(e) => updateSetting('headingWeight', parseInt(e.target.value))} className={rangeClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Body Boldness <span className="text-cyan-400">{layoutSettings.bodyWeight}</span></label>
              <input type="range" min="300" max="700" step="100" value={layoutSettings.bodyWeight} onChange={(e) => updateSetting('bodyWeight', parseInt(e.target.value))} className={rangeClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Name Size <span className="text-cyan-400">{layoutSettings.nameFont}pt</span></label>
              <input type="range" min="12" max="48" step="1" value={layoutSettings.nameFont} onChange={(e) => updateSetting('nameFont', parseFloat(e.target.value))} className={rangeClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Section Title Size <span className="text-cyan-400">{layoutSettings.headingFont}pt</span></label>
              <input type="range" min="8" max="24" step="0.5" value={layoutSettings.headingFont} onChange={(e) => updateSetting('headingFont', parseFloat(e.target.value))} className={rangeClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Body Text Size <span className="text-cyan-400">{layoutSettings.bodyFont}pt</span></label>
              <input type="range" min="8" max="16" step="0.5" value={layoutSettings.bodyFont} onChange={(e) => updateSetting('bodyFont', parseFloat(e.target.value))} className={rangeClass} />
            </div>
          </div>
        </div>

        {/* SECTION 3: Spacing & Margins */}
        <div className="pt-6 border-t border-white/10">
          <h4 className="font-bold text-white flex items-center gap-2 mb-5">
            <AlignLeft className="w-5 h-5 text-green-400" /> Spacing & Margins
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Line Spacing <span className="text-green-400">{layoutSettings.lineGap}px</span></label>
              <input type="range" min="0" max="12" step="0.5" value={layoutSettings.lineGap} onChange={(e) => updateSetting('lineGap', parseFloat(e.target.value))} className={`${rangeClass} accent-green-500`} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Section Gap <span className="text-green-400">{layoutSettings.sectionGap}x</span></label>
              <input type="range" min="0.1" max="4" step="0.1" value={layoutSettings.sectionGap} onChange={(e) => updateSetting('sectionGap', parseFloat(e.target.value))} className={`${rangeClass} accent-green-500`} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Top/Bottom Margin <span className="text-green-400">{layoutSettings.marginY}px</span></label>
              <input type="range" min="5" max="120" step="5" value={layoutSettings.marginY} onChange={(e) => updateSetting('marginY', parseFloat(e.target.value))} className={`${rangeClass} accent-green-500`} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Left/Right Margin <span className="text-green-400">{layoutSettings.marginX}px</span></label>
              <input type="range" min="5" max="120" step="5" value={layoutSettings.marginX} onChange={(e) => updateSetting('marginX', parseFloat(e.target.value))} className={`${rangeClass} accent-green-500`} />
            </div>
          </div>
        </div>
      </div>

      {/* ✍️ LIVE CONTENT EDITOR */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md space-y-8 shadow-lg">

        <div className="border-b border-white/10 pb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <PencilRuler className="w-5 h-5 text-yellow-400" /> Live Content Editor
          </h3>
          <p className="text-sm text-yellow-500/80 bg-yellow-500/10 p-3 rounded-xl mt-3 border border-yellow-500/20">
            💡 <strong>Pro Tip:</strong> Missing links? Add your GitHub, LinkedIn, and Project URLs here manually since PDF parsing drops them!
          </p>
        </div>

        {/* --- PERSONAL INFO & CONTACTS --- */}
        <div className="space-y-4">
          <h4 className="font-semibold text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/5">Personal Info & Header Links</h4>
          <div className="space-y-4 px-2">
            <div>
              <label className={labelClass}>Full Name</label>
              <input type="text" className={inputClass} value={resumeData.personalInfo?.name || ""} placeholder="e.g. John Doe" onChange={(e) => updatePersonalInfo('name', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Location / Address</label>
              <input type="text" className={inputClass} value={resumeData.personalInfo?.location || ""} placeholder="e.g. Ghaziabad, Uttar Pradesh" onChange={(e) => updatePersonalInfo('location', e.target.value)} />
            </div>

            <div className="space-y-2 pt-2">
              <label className={labelClass}>Contact Info & Links (Phone, Email, LinkedIn, etc.)</label>
              {resumeData.personalInfo?.contacts?.map((contact: ContactItem, cIndex: number) => (
                <div key={cIndex} className="flex gap-2">
                  <input type="text" className={`${inputClass} w-1/3`} value={contact.text || ""} placeholder="Text (e.g. LinkedIn)" onChange={(e) => updateContact(cIndex, 'text', e.target.value)} />
                  <input type="text" className={`${inputClass} w-2/3`} value={contact.url || ""} placeholder="URL (Optional) e.g. https://linkedin.com/..." onChange={(e) => updateContact(cIndex, 'url', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- SKILLS --- */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/5">Technical Skills</h4>
            <div className="space-y-4 px-2">
              {resumeData.skills.map((skill: SkillItem, sIndex: number) => (
                <div key={sIndex} className="flex flex-col gap-1.5">
                  <label className="text-xs text-purple-400 font-bold uppercase tracking-wide">{skill.category}</label>
                  <input type="text" className={inputClass} value={skill.items || ""} onChange={(e) => {
                    const newSkills = [...resumeData.skills!];
                    newSkills[sIndex] = { ...newSkills[sIndex], items: e.target.value };
                    onChange({ ...resumeData, skills: newSkills });
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PROJECTS --- */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/5">Projects & Experience</h4>
            <div className="space-y-6 px-2">
              {resumeData.projects.map((proj: ProjectItem, pIndex: number) => (
                <div key={pIndex} className="bg-black/20 p-5 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500/50"></div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className={labelClass}>Project Title</label>
                      <input type="text" className={`${inputClass} font-bold text-white bg-white/5 border-white/10`} value={proj.title || ""} onChange={(e) => updateProjectField(pIndex, 'title', e.target.value)} />
                    </div>
                    <div className="md:w-1/3 flex flex-col gap-1.5">
                      <label className={labelClass}>Date (Optional)</label>
                      <input type="text" className={`${inputClass} bg-white/5 border-white/10`} value={proj.date || ""} placeholder="e.g. May 2025" onChange={(e) => updateProjectField(pIndex, 'date', e.target.value)} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Tech Stack</label>
                    <input type="text" className={`${inputClass} bg-white/5 border-white/10`} value={proj.techStack || ""} placeholder="React, Node.js, MongoDB..." onChange={(e) => updateProjectField(pIndex, 'techStack', e.target.value)} />
                  </div>

                  {/* Project Links (GitHub, Live) */}
                  <div className="space-y-2">
                    <label className={labelClass}><LinkIcon className="w-3 h-3" /> Project Links</label>
                    {proj.links?.map((link: ProjectLink, lIndex: number) => (
                      <div key={lIndex} className="flex gap-2">
                        <input type="text" className={`${inputClass} w-1/3`} value={link.name || ""} placeholder="e.g. GitHub" onChange={(e) => updateProjectLink(pIndex, lIndex, 'name', e.target.value)} />
                        <input type="text" className={`${inputClass} w-2/3`} value={link.url || ""} placeholder="URL e.g. https://github.com/..." onChange={(e) => updateProjectLink(pIndex, lIndex, 'url', e.target.value)} />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className={labelClass}>Bullet Points</label>
                    {proj.bullets.map((bullet: string, bIndex: number) => (
                      <div key={bIndex} className="relative group">
                        <span className="absolute left-3 top-3.5 text-zinc-600 font-bold">•</span>
                        <textarea className={`${inputClass} pl-8 min-h-17.5 leading-relaxed resize-y`} value={bullet} onChange={(e) => {
                          const newProjects = [...resumeData.projects!];
                          const newBullets = [...newProjects[pIndex].bullets];
                          newBullets[bIndex] = e.target.value;
                          newProjects[pIndex] = { ...newProjects[pIndex], bullets: newBullets };
                          onChange({ ...resumeData, projects: newProjects });
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ACHIEVEMENTS --- */}
        {resumeData.achievements && resumeData.achievements.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/5">Achievements</h4>
            <div className="space-y-3 px-2">
              {resumeData.achievements.map((ach: AchievementItem, aIndex: number) => (
                <div key={aIndex} className="flex gap-2">
                  <input type="text" className={`${inputClass} w-1/2`} value={ach.name || ""} placeholder="Achievement details..." onChange={(e) => updateAchievement(aIndex, 'name', e.target.value)} />
                  <input type="text" className={`${inputClass} w-1/2`} value={ach.url || ""} placeholder="URL (Optional)" onChange={(e) => updateAchievement(aIndex, 'url', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- CERTIFICATIONS --- */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/5">Certifications</h4>
            <div className="space-y-3 px-2">
              {resumeData.certifications.map((cert: AchievementItem, cIndex: number) => (
                <div key={cIndex} className="flex gap-2">
                  <input type="text" className={`${inputClass} w-1/2`} value={cert.name || ""} placeholder="Certification name..." onChange={(e) => updateCertification(cIndex, 'name', e.target.value)} />
                  <input type="text" className={`${inputClass} w-1/2`} value={cert.url || ""} placeholder="URL (Optional)" onChange={(e) => updateCertification(cIndex, 'url', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}