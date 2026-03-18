// types/resume.types.ts
export interface Resume {
  _id: string;
  title: string;
  version: number;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface LayoutSettings {
  fontFamily: string;
  themeColor: string;
  bulletStyle: string;
  headingWeight: number;
  bodyWeight: number;
  nameFont: number;
  headingFont: number;
  subHeadingFont: number;
  bodyFont: number;
  sectionGap: number;
  lineGap: number;
  marginY: number;
  marginX: number;
}

// Fixed type aliases for clean mapping
export type ContactItem = { text: string; url?: string };
export type ProjectLink = { name: string; url: string };
export type ProjectItem = {
  title: string;
  date?: string;
  links?: ProjectLink[];
  techStack?: string;
  bullets: string[];
};
export type SkillItem = { category: string; items: string };
export type EducationItem = {
  degree: string;
  year: string;
  college: string;
  grade: string;
};
export type AchievementItem = { name: string; url?: string };
export type CustomSectionItem = { heading: string; items: string[] };

export interface OptimizedResumeData {
  personalInfo?: { name: string; contacts?: ContactItem[]; location?: string };
  projects?: ProjectItem[];
  skills?: SkillItem[];
  education?: EducationItem[];
  achievements?: AchievementItem[];
  certifications?: AchievementItem[];
  customSections?: CustomSectionItem[];
}
