# AI Student Career Mentor — Resume Builder Module

A standalone, no-backend Resume Builder for college students, built with React + Vite.
This is **only** the Resume Builder module of the larger AI Student Career Mentor
platform — its data model is intentionally kept clean so the future Skill Gap
Analysis, Career Recommendation, Job Recommendation, and other modules can plug
into it later.

## 1. Install

```bash
npm install
```

This installs React, Vite, and `jspdf` (used for real, text-based PDF export).

## 2. Run

```bash
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

## 3. Project structure

```
src/
  components/resume/     Form + sidebar + preview components
  templates/              Modern / Professional / Minimal resume templates
  pages/ResumeBuilder.jsx Main page: holds state, layout, wiring
  utils/                  validation, localStorage, completion score, PDF generation
  data/initialResumeData.js  Central resume data shape + factory helpers
  App.jsx, main.jsx, index.css
```

## 4. How to test the Resume Builder

1. Run `npm run dev` and open the app.
2. Fill in **Personal Information** — leaving "Full Name" empty shows a validation message.
3. Move through each sidebar section (Summary, Education, Skills, Projects, Experience,
   Certifications, Achievements, Languages). Add a few entries in each.
4. Watch the **live A4 preview** on the right update immediately as you type — no refresh needed.
5. Watch **Resume Completion %** in the sidebar increase as you fill sections.
6. Switch templates in the **Template** section — your data does not change, only styling does.

## 5. How to test localStorage persistence

1. Fill in some resume data.
2. Click **Save Resume** in the top bar (data also auto-saves ~600ms after each change).
3. Refresh the browser tab.
4. Your resume data should reappear exactly as you left it.
5. Click **Clear Resume**, confirm in the dialog, and verify the form resets to empty.

## 6. How to test PDF generation

1. Fill in enough resume data to see multiple sections.
2. Click **Download PDF**.
3. Button should show "Generating PDF..." briefly, then "PDF downloaded successfully".
4. A file named like `John_Doe_Resume.pdf` should download (or `Resume.pdf` if no name is set).
5. Open the PDF and confirm:
   - Text is selectable and searchable (it is drawn as real text via jsPDF, not an image).
   - Layout is single-column, A4-sized, plain black/white/gray with a subtle accent.

## 7. How to test multi-page resumes

1. Add several education entries, 3+ projects with multi-line descriptions, 2+ experience
   entries, and a handful of certifications/achievements.
2. The **live preview** shows a light gray horizontal guideline every 297mm indicating where
   a new physical page will begin — content is allowed to flow past this naturally.
3. Download the PDF — it should span 2 or more pages automatically, with section headings
   kept together with their content where possible (no orphaned headings at the bottom of a page).

## 8. How to test browser printing

1. With some resume data filled in, press `Ctrl+P` (or `Cmd+P` on macOS), or click the
   **Print** button in the top bar.
2. The print preview should show **only** the resume (no sidebar, no forms, no buttons).
3. Page size should be A4, and multi-page resumes should print correctly across pages.

## 9. How to verify ATS-friendly output

- Section headings use standard terms: PROFESSIONAL SUMMARY, EDUCATION, SKILLS, PROJECTS,
  EXPERIENCE, CERTIFICATIONS, ACHIEVEMENTS, LANGUAGES.
- No icons, images, logos, progress/skill bars, tables, multi-column layouts, or text-in-images
  are used anywhere in the actual resume output.
- Contact details, skills, and links are plain selectable text.
- The PDF is generated as real text via `jsPDF`, not `html2canvas` — so it stays searchable
  and selectable, which is important for ATS parsing.
- Empty sections are hidden entirely rather than shown with an empty heading.

## 10. Data structure (for future module integration)

The central resume object (see `src/data/initialResumeData.js`) is a plain, serializable
object:

```js
{
  personal: { fullName, professionalTitle, email, phone, location, linkedin, github, portfolio },
  summary: "",
  education: [{ id, degree, institution, location, startYear, endYear, score }],
  skills: ["Python", "React", ...],
  projects: [{ id, title, description, technologies, githubUrl, projectUrl }],
  experience: [{ id, company, position, location, startDate, endDate, description }],
  certifications: [{ id, name, organization, year, credentialUrl }],
  achievements: ["..."],
  languages: ["English", "Tamil"],
  selectedTemplate: "modern" | "professional" | "minimal"
}
```

`resume.skills` is a flat array of strings specifically so a future Skill Gap Analysis
module can diff it directly against a `requiredSkillsForRole` array without any
transformation.

## 11. Notes on future integration points

- **AI features** (`Improve with AI` button, future `enhanceProject()`, `analyzeResume()`)
  currently show a placeholder message. No API key is used or exposed in the frontend —
  wire these to a backend endpoint when ready.
- **Persistence** currently uses `localStorage` via `src/utils/resumeStorage.js`. Swapping
  this for a real backend API later only requires changing that one file.
- **PDF generation** (`src/utils/pdfGenerator.js`) builds the PDF directly from
  `resumeData`, independent of the on-screen template components, so it stays in sync with
  whatever fields the data model has as the app grows.
