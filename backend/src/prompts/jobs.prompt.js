export const buildJobMatchPrompt = (resumeText) => {
  return `
  You are an expert Career Counselor and ATS Recruiter. 
  Analyze the following resume text and suggest the top 3 best-fitting job roles the candidate should apply for.

  CRITICAL RULES:
  1. Return ONLY a valid JSON array of objects. Do not use markdown like \`\`\`json.
  2. The match percentage should be realistic based on the skills present.
  3. "searchKeywords" should be 2-3 words max (e.g., "Frontend Developer", "MERN Stack"). We will use this to generate LinkedIn/Naukri URLs.

  Resume Text:
  ${resumeText}

  Expected JSON Format:
  [
    {
      "role": "Frontend Developer",
      "matchPercentage": 90,
      "salaryRange": "₹6 LPA - ₹12 LPA",
      "reason": "Strong foundation in React.js and Tailwind CSS with relevant project experience.",
      "missingSkills": ["TypeScript", "Next.js"],
      "searchKeywords": "Frontend Developer React"
    },
    // ... 2 more roles
  ]
  `;
};