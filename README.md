# 🚀 Elevate — AI Career Matchmaker & Resume Optimizer

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_2.5_Flash-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

> **Stop guessing what recruiters want. Start getting hired.**

Elevate is a full-stack, AI-powered career platform that analyzes your resume against a target Job Description, rewrites your bullet points using the XYZ achievement formula, scores your ATS compatibility, and generates pixel-perfect, recruiter-ready PDFs — all in one seamless workflow.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [How It Works](#-how-it-works)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🧠 AI Resume Optimization

Powered by **Gemini 2.5 Flash**, Elevate's analysis engine goes beyond simple keyword matching.

- **ATS Scoring** — Compares your resume to a target Job Description and returns a compatibility score with a breakdown of gaps.
- **Auto-Highlighting** — Detects high-impact metrics, technical frameworks, and action verbs, wrapping them in bold (`**keyword**`) to draw recruiter attention.
- **Intelligent Rewriting** — Transforms weak, passive bullet points into strong, quantified XYZ-formula achievements (e.g., _"Reduced API latency by 40% by refactoring the caching layer, improving P99 response times."_).
- **Missing Skills Detection** — Surfaces skills and keywords present in the JD but absent from your resume.

### 🎨 Live Studio Editor

A real-time resume editor with granular layout control.

- **Glassmorphism UI** — Dark-themed, deep-space aesthetic built for long editing sessions.
- **Absolute Layout Control** — Tweak typography, heading weights, line spacing, section gaps, and X/Y page margins to perfectly fit content on a single A4 page.
- **Manual Overrides** — Fully editable fields for Personal Info, Contacts, Projects, Skills, and Achievements.
- **Smart Link Detection** — Automatically converts email addresses to `mailto:` links and phone numbers to `tel:` links.
- **Font Switcher** — Choose from multiple professional typefaces including Inter and Merriweather.

### 📄 Pixel-Perfect PDF Engine

Resume PDFs are generated server-side for consistency and ATS compatibility.

- **Puppeteer Backend** — A headless Chromium instance renders your resume exactly as it appears in the Live Studio, bypassing browser print dialog inconsistencies.
- **Auto-Stretching** — Intelligently distributes whitespace to ensure the resume always fills the page professionally.
- **100% ATS-Readable** — Text-based output, never image-flattened, ensuring full parseability by applicant tracking systems.

### 🎯 AI Job Matchmaker & Magic Links

Turn your optimized resume into immediate job applications.

- **Role Recommendations** — Analyzes your resume to suggest the top matching job titles with expected salary ranges and match percentages.
- **Magic Action Links** — Generates one-click pre-filtered search URLs across **6 major platforms**: LinkedIn, Naukri, Indeed, Glassdoor, Internshala, and Foundit.

### 📚 Resume Playbook

An interactive learning center built into the app.

- **Before/After Examples** — Side-by-side rewrites of project bullets, professional summaries, and soft skill descriptions.
- **ATS Cheat Codes** — Quick-access strategies for keyword density, formatting rules, and quantification tactics.

---

## 🛠️ Tech Stack

| Layer              | Technology                                                   |
| ------------------ | ------------------------------------------------------------ |
| **Frontend**       | Next.js, React, Tailwind CSS v4, Framer Motion, Lucide React |
| **Backend**        | Node.js, Express.js                                          |
| **Database**       | MongoDB, Mongoose                                            |
| **File Storage**   | Cloudinary                                                   |
| **AI**             | Google Generative AI (`gemini-2.5-flash`)                    |
| **PDF Parsing**    | `pdf2json`                                                   |
| **PDF Generation** | Puppeteer (headless Chromium)                                |

---

## 🏗️ Architecture

```
elevate/
├── app/                        # Next.js App Router pages & layouts
│   ├── dashboard/              # Upload & analysis flow
│   ├── studio/                 # Live editor
│   ├── jobs/                   # Job matchmaker & magic links
│   └── playbook/               # Resume tips & learning center
│
├── components/                 # Shared React components
│
├── lib/
│   ├── gemini.js               # Gemini AI client & prompt templates
│   ├── mongodb.js              # Mongoose connection helper
│   └── cloudinary.js           # File upload utilities
│
├── server/                     # Express.js backend
│   ├── routes/
│   │   ├── resume.js           # Upload, parse, analyze endpoints
│   │   ├── pdf.js              # Puppeteer PDF generation endpoint
│   │   └── jobs.js             # Job match & magic link generation
│   └── index.js                # Server entry point
│
├── public/                     # Static assets
└── .env.local                  # Environment variables (not committed)
```

### Data Flow

```
User uploads PDF
      │
      ▼
pdf2json parses resume text
      │
      ▼
Gemini maps content → strict JSON schema
      │
      ▼
ATS Score + Gap Analysis returned to client
      │
      ▼
User edits in Live Studio
      │
      ▼
POST /api/pdf → Puppeteer renders HTML → returns PDF buffer
      │
      ▼
PDF downloaded to user's device
```

---

## 💡 How It Works

### Step 1 — Upload

Drag and drop your existing PDF resume onto the Dashboard. `pdf2json` extracts the raw text and Gemini maps it to a structured JSON schema (name, contact, experience, education, skills, projects).

### Step 2 — Analyze

Paste the Job Description for your target role. Gemini compares your resume JSON against the JD and returns:

- An **ATS compatibility score** (0–100)
- A list of **missing keywords and skills**
- **Rewritten bullet points** using the XYZ achievement formula
- **Auto-highlighted** high-impact terms

### Step 3 — Customize

Open the **Live Studio**. All AI-generated content is fully editable. Use the layout controls to adjust margins, font size, line spacing, and section gaps until your resume fits perfectly on one page. Switch fonts or accent colors to match your personal brand.

### Step 4 — Export

Click **Save + Download**. The frontend POSTs your resume JSON and layout settings to the Express backend, which spins up a headless Chromium instance via Puppeteer, renders the resume as an HTML page, and returns a crisp, ATS-readable A4 PDF.

### Step 5 — Apply

Navigate to the **Find Jobs** tab. The AI recommends matching roles based on your resume content. Click any Magic Link to instantly open a pre-filtered job search on LinkedIn, Naukri, Indeed, Glassdoor, Internshala, or Foundit.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

<p align="center">Built with ❤️ and excessive amounts of coffee.</p>
