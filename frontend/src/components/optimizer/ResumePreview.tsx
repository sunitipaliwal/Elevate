"use client"

import {
  LayoutSettings,
  OptimizedResumeData,
  ContactItem,
  EducationItem,
  SkillItem,
  ProjectItem,
  ProjectLink,
  AchievementItem,
  CustomSectionItem
} from "@/types/resume.types"

const formatRichText = (text: string, boldWeight: number) => {
  if (!text) return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ fontWeight: boldWeight, color: '#111827' }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const getSmartHref = (text: string, url?: string) => {
  const target = url || text; // Agar URL khali hai, toh Text ko hi use karega
  if (!target) return "#";

  // 1. Check for Email
  if (target.includes("@") && !target.startsWith("mailto:") && !target.startsWith("http")) {
    return `mailto:${target.trim()}`;
  }

  // 2. Check for Phone Number (contains mostly numbers, +, -)
  if (/^[\d\+\-\s\(\)]+$/.test(target) && (target.match(/\d/g)?.length || 0) >= 7) {
    return `tel:${target.replace(/[^\d+]/g, "")}`; // Clean spaces/dashes for the tel: link
  }

  // 3. Normal Web Links (Fallback)
  if (!target.startsWith("http") && !target.startsWith("tel:") && !target.startsWith("mailto:")) {
    return `https://${target.trim()}`;
  }

  return target;
};

interface Props {
  data: OptimizedResumeData;
  layout: LayoutSettings;
}

export default function ResumePreview({ data, layout }: Props) {
  if (!data || !layout) return null;

  const exactLineHeight = 1.2 + (layout.lineGap * 0.04);
  const bulletStyle = layout.bulletStyle || 'square';

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Lato:wght@300;400;700;900&family=Lora:wght@400;500;600;700&family=Merriweather:wght@300;400;700;900&family=Montserrat:wght@300;400;500;600;700;800&family=Nunito:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700;900&display=swap');
      `}} />

      <div
        className="w-full shadow-[0_0_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10 rounded-sm mx-auto overflow-y-auto bg-white select-text transition-all"
        style={{
          aspectRatio: '1/1.414',
          paddingTop: `${layout.marginY}px`,
          paddingBottom: `${layout.marginY}px`,
          paddingLeft: `${layout.marginX}px`,
          paddingRight: `${layout.marginX}px`
        }}
      >
        <div
          id="resume-print-area"
          className="w-full text-gray-800 flex flex-col"
          style={{
            fontFamily: layout.fontFamily,
            fontWeight: layout.bodyWeight,
            fontSize: `${layout.bodyFont}px`,
            lineHeight: exactLineHeight
          }}
        >
          {/* HEADER */}
          <div className="text-center" style={{ marginBottom: `${layout.sectionGap}rem` }}>
            <h1 style={{ fontWeight: layout.headingWeight, fontSize: `${layout.nameFont}px`, letterSpacing: '1px', color: '#111827', textTransform: 'uppercase' }}>
              {data.personalInfo?.name || "YOUR NAME"}
            </h1>
            {/* 🚀 Render Location if it exists */}
            {data.personalInfo?.location && (
              <div style={{ fontSize: `${layout.bodyFont}px`, color: '#4B5563', marginTop: '2px' }}>
                {data.personalInfo.location}
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-2 mt-1" style={{ fontSize: `${layout.bodyFont - 0.5}px`, color: '#4B5563' }}>
              {data.personalInfo?.contacts?.map((c: ContactItem, i: number) => (
                <span key={i} className="flex items-center">
                  <a href={getSmartHref(c.text, c.url)} style={{ textDecoration: c.url ? 'underline' : 'none', color: c.url ? layout.themeColor : '#4B5563' }}>{c.text}</a>
                  {i < (data.personalInfo?.contacts?.length || 0) - 1 && <span className="mx-2 text-gray-300">|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: `${layout.sectionGap}rem` }}>
              <h2 style={{ fontWeight: layout.headingWeight, fontSize: `${layout.headingFont}px`, textTransform: 'uppercase', color: '#111827', borderBottom: `1.5px solid #111827`, paddingBottom: '2px', marginBottom: '6px' }}>Education</h2>
              {data.education.map((edu: EducationItem, i: number) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <div className="flex justify-between" style={{ fontWeight: layout.headingWeight, fontSize: `${layout.subHeadingFont}px`, color: '#111827' }}>
                    <span>{edu.degree}</span><span>{edu.year}</span>
                  </div>
                  <div className="flex justify-between" style={{ color: '#4B5563' }}>
                    <span>{edu.college}</span><span>{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SKILLS */}
          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: `${layout.sectionGap}rem` }}>
              <h2 style={{ fontWeight: layout.headingWeight, fontSize: `${layout.headingFont}px`, textTransform: 'uppercase', color: '#111827', borderBottom: `1.5px solid #111827`, paddingBottom: '2px', marginBottom: '6px' }}>Technical Skills</h2>
              <ul className="pl-4" style={{ color: '#4B5563', display: 'flex', flexDirection: 'column', margin: 0 }}>
                {data.skills.map((skill: SkillItem, i: number) => (
                  <li key={i} style={{ listStyleType: bulletStyle, marginBottom: `${layout.lineGap}px` }}>
                    <span style={{ fontWeight: layout.headingWeight, fontSize: `${layout.subHeadingFont}px`, color: '#111827' }}>{skill.category}: </span>
                    <span style={{ color: '#4B5563' }}>{skill.items}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* PROJECTS */}
          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: `${layout.sectionGap}rem` }}>
              <h2 style={{ fontWeight: layout.headingWeight, fontSize: `${layout.headingFont}px`, textTransform: 'uppercase', color: '#111827', borderBottom: `1.5px solid #111827`, paddingBottom: '2px', marginBottom: '6px' }}>Projects</h2>
              {data.projects.map((proj: ProjectItem, i: number) => (
                <div key={i} style={{ marginBottom: `${layout.sectionGap * 0.8}rem` }}>
                  <div className="flex justify-between mb-1" style={{ fontWeight: layout.headingWeight, fontSize: `${layout.subHeadingFont}px`, color: '#111827' }}>
                    <div>
                      <span>{proj.title} </span>
                      {proj.links && proj.links.map((link: ProjectLink, lIdx: number) => (
                        <span key={lIdx} style={{ fontWeight: layout.bodyWeight }}>
                          <a href={link.url} style={{ color: layout.themeColor, textDecoration: 'underline', marginLeft: '4px', fontSize: `${layout.bodyFont - 0.5}px` }}>{link.name}</a>
                          {lIdx < (proj.links?.length || 0) - 1 && <span className="text-gray-400 mx-1">|</span>}
                        </span>
                      ))}
                    </div>
                    <span style={{ color: '#4B5563', fontWeight: layout.bodyWeight }}>{proj.date}</span>
                  </div>
                  <ul className="pl-4" style={{ color: '#4B5563', display: 'flex', flexDirection: 'column' }}>
                    {proj.bullets?.map((b: string, bIdx: number) => (
                      <li key={bIdx} style={{ listStyleType: bulletStyle, marginBottom: `${layout.lineGap}px` }}>{formatRichText(b, layout.headingWeight)}</li>
                    ))}
                  </ul>
                  {proj.techStack && (
                    <div className="pl-4 mt-1">
                      <span style={{ fontWeight: layout.headingWeight, color: '#111827', display: 'list-item', listStyleType: bulletStyle }}>Tech Stack: <span style={{ fontWeight: layout.bodyWeight, color: '#4B5563' }}>{proj.techStack}</span></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {data.achievements && data.achievements.length > 0 && (
            <div style={{ marginBottom: `${layout.sectionGap}rem` }}>
              <h2 style={{ fontWeight: layout.headingWeight, fontSize: `${layout.headingFont}px`, textTransform: 'uppercase', color: '#111827', borderBottom: `1.5px solid #111827`, paddingBottom: '2px', marginBottom: '6px' }}>Achievements</h2>
              <ul className="pl-4" style={{ color: '#4B5563', display: 'flex', flexDirection: 'column' }}>
                {data.achievements.map((ach: AchievementItem, i: number) => (
                  <li key={`ach-${i}`} style={{ listStyleType: bulletStyle, marginBottom: `${layout.lineGap}px` }}>
                    {ach.url ? <a href={ach.url} style={{ color: layout.themeColor, textDecoration: 'underline' }}>{ach.name}</a> : ach.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CERTIFICATIONS */}
          {data.certifications && data.certifications.length > 0 && (
            <div style={{ marginBottom: `${layout.sectionGap}rem` }}>
              <h2 style={{ fontWeight: layout.headingWeight, fontSize: `${layout.headingFont}px`, textTransform: 'uppercase', color: '#111827', borderBottom: `1.5px solid #111827`, paddingBottom: '2px', marginBottom: '6px' }}>Certifications</h2>
              <ul className="pl-4" style={{ color: '#4B5563', display: 'flex', flexDirection: 'column' }}>
                {data.certifications.map((cert: AchievementItem, i: number) => (
                  <li key={`cert-${i}`} style={{ listStyleType: bulletStyle, marginBottom: `${layout.lineGap}px` }}>
                    {cert.url ? <a href={cert.url} style={{ color: layout.themeColor, textDecoration: 'underline' }}>{cert.name}</a> : cert.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CUSTOM SECTIONS */}
          {data.customSections && data.customSections.length > 0 && (
            <>
              {data.customSections.map((section: CustomSectionItem, idx: number) => (
                <div key={`custom-${idx}`} style={{ marginBottom: `${layout.sectionGap}rem` }}>
                  <h2 style={{ fontWeight: layout.headingWeight, fontSize: `${layout.headingFont}px`, textTransform: 'uppercase', color: '#111827', borderBottom: `1.5px solid #111827`, paddingBottom: '2px', marginBottom: '6px' }}>
                    {section.heading}
                  </h2>
                  <ul className="pl-4" style={{ color: '#4B5563', display: 'flex', flexDirection: 'column' }}>
                    {section.items.map((item: string, i: number) => (
                      <li key={i} style={{ listStyleType: bulletStyle, marginBottom: `${layout.lineGap}px` }}>{formatRichText(item, layout.headingWeight)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}