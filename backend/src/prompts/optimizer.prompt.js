export const buildOptimizerPrompt = (resumeText, jobDescription) => {
return `
You are an expert ATS (Applicant Tracking System) resume evaluator.

Your job is to analyze a resume against a job description and suggest improvements. 
CRITICAL RULES:
1. STRICT 1:1 SECTION MAPPING: Reconstruct the resume EXACTLY based on the original structure. Do NOT add new sections.
2. STRICT URLs: Extract exact URLs from the text. DO NOT invent, mock, or hallucinate URLs. If a link does not exist in the original text, leave the url field EMPTY "".
3. Keep 'Tech Stack' as a separate string for every project.
4. If the original resume has separate 'Achievements' and 'Certifications', keep them separate. Do not merge them.
5. 🚀 AUTO-HIGHLIGHTING: Identify high-impact keywords (like frameworks, metrics, and key action verbs) in the bullet points and wrap them in double asterisks (**keyword**) to make them bold. Example: "Improved performance by **40%** using **React**". Do this moderately to enhance readability.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON in this exact structure:

{
  "score": 85,
  "strengths": ["string"],
  "missingSkills": ["string"],
  "improvements": ["string"],
  "sections": {
    "summary": {
      "original": "old summary",
      "optimized": "new optimized summary"
    },
    "completeResume": {
      "personalInfo": { 
        "name": "Extract Full Name", 
        "location": "Extract Location/Address if present (e.g. Ghaziabad, Uttar Pradesh), else leave empty string",
        "contacts": [ 
          { "text": "e.g., +91-XXXXXXXXXX", "url": "" },
          { "text": "LinkedIn", "url": "exact_url_here" },
          { "text": "GitHub", "url": "exact_url_here" }
        ]
      },
      "education": [ 
        { "degree": "e.g., B.Tech", "college": "e.g., ABES", "year": "e.g., 2027", "grade": "e.g., GPA: 8.45/10.0" } 
      ],
      "skills": [ 
        { "category": "Programming Languages", "items": "C++, JavaScript, SQL" } 
      ],
      "projects": [ 
        { 
          "title": "Project Name", 
          "date": "Month Year", 
          "links": [ { "name": "GitHub", "url": "exact_url" } ],
          "bullets": ["Optimized bullet point highlighting impact with **keywords** bolded"],
          "techStack": "MongoDB, Express.js"
        } 
      ],
      "achievements": [ 
        { "name": "Achievement Details", "url": "" } 
      ],
      "certifications": [ 
        { "name": "Certification Details", "url": "" } 
      ],
      "customSections": [
        {
          "heading": "Heading from original resume (e.g., Extracurriculars)",
          "items": ["Point 1", "Point 2"]
        }
      ]
    }
  }
}
`
}