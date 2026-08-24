import { jsPDF } from 'jspdf';

// A4 in points (jsPDF default unit for "pt"): 595.28 x 841.89
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 48;
const MARGIN_TOP = 50;
const MARGIN_BOTTOM = 50;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

const TEMPLATE_STYLES = {
  modern: { headingFont: 'helvetica', bodyFont: 'helvetica', accent: [15, 98, 84] },
  professional: { headingFont: 'times', bodyFont: 'times', accent: [30, 41, 59] },
  minimal: { headingFont: 'helvetica', bodyFont: 'helvetica', accent: [55, 65, 81] },
};

function sanitizeFilename(name) {
  if (!name || !name.trim()) return 'Resume.pdf';
  const cleaned = name
    .trim()
    .replace(/[^a-zA-Z0-9\s_-]/g, '')
    .replace(/\s+/g, '_');
  return `${cleaned}_Resume.pdf`;
}

export function generateResumePdf(resumeData) {
  const style = TEMPLATE_STYLES[resumeData.selectedTemplate] || TEMPLATE_STYLES.modern;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  let y = MARGIN_TOP;

  function ensureSpace(neededHeight) {
    if (y + neededHeight > PAGE_HEIGHT - MARGIN_BOTTOM) {
      doc.addPage();
      y = MARGIN_TOP;
    }
  }

  function addSectionHeading(title) {
    ensureSpace(24);
    doc.setFont(style.headingFont, 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(...style.accent);
    doc.text(title.toUpperCase(), MARGIN_X, y);
    y += 4;
    doc.setDrawColor(...style.accent);
    doc.setLineWidth(0.75);
    doc.line(MARGIN_X, y, PAGE_WIDTH - MARGIN_X, y);
    doc.setTextColor(20, 20, 20);
    y += 14;
  }

  function addWrappedText(text, { fontSize = 10, font = style.bodyFont, fontStyle = 'normal', lineHeight = 13, indent = 0, color = [30, 30, 30] } = {}) {
    if (!text) return;
    doc.setFont(font, fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent);
    lines.forEach((line) => {
      ensureSpace(lineHeight);
      doc.text(line, MARGIN_X + indent, y);
      y += lineHeight;
    });
  }

  function addBulletedText(text, opts = {}) {
    if (!text) return;
    const bulletLines = text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    bulletLines.forEach((line) => {
      const cleanLine = line.replace(/^[-•*]\s*/, '');
      const bulletText = `•  ${cleanLine}`;
      const fontSize = opts.fontSize || 10;
      doc.setFont(style.bodyFont, 'normal');
      doc.setFontSize(fontSize);
      doc.setTextColor(30, 30, 30);
      const wrapped = doc.splitTextToSize(bulletText, CONTENT_WIDTH - 10);
      wrapped.forEach((wLine, idx) => {
        ensureSpace(13);
        doc.text(wLine, MARGIN_X + (idx === 0 ? 0 : 14), y);
        y += 13;
      });
    });
  }

  // ---- Header: Name + Contact ----
  doc.setFont(style.headingFont, 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 15, 15);
  doc.text(resumeData.personal.fullName || 'Your Name', MARGIN_X, y);
  y += 20;

  if (resumeData.personal.professionalTitle) {
    doc.setFont(style.bodyFont, 'normal');
    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70);
    doc.text(resumeData.personal.professionalTitle, MARGIN_X, y);
    y += 18;
  }

  const contactLine1 = [resumeData.personal.email, resumeData.personal.phone, resumeData.personal.location]
    .filter(Boolean)
    .join('  |  ');
  if (contactLine1) {
    doc.setFont(style.bodyFont, 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    doc.text(contactLine1, MARGIN_X, y);
    y += 13;
  }

  const contactLine2 = [resumeData.personal.linkedin, resumeData.personal.github, resumeData.personal.portfolio]
    .filter(Boolean)
    .join('  |  ');
  if (contactLine2) {
    doc.setFont(style.bodyFont, 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    doc.text(contactLine2, MARGIN_X, y);
    y += 13;
  }

  y += 8;
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.5);
  doc.line(MARGIN_X, y, PAGE_WIDTH - MARGIN_X, y);
  y += 16;

  // ---- Summary ----
  if (resumeData.summary && resumeData.summary.trim()) {
    addSectionHeading('Professional Summary');
    addWrappedText(resumeData.summary.trim(), { fontSize: 10 });
    y += 8;
  }

  // ---- Education ----
  if (resumeData.education.length > 0) {
    addSectionHeading('Education');
    resumeData.education.forEach((edu) => {
      ensureSpace(28);
      doc.setFont(style.bodyFont, 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(20, 20, 20);
      doc.text(edu.degree || '', MARGIN_X, y);
      const yearText = [edu.startYear, edu.endYear].filter(Boolean).join(' - ');
      if (yearText) {
        doc.setFont(style.bodyFont, 'normal');
        doc.setFontSize(9.5);
        const w = doc.getTextWidth(yearText);
        doc.text(yearText, PAGE_WIDTH - MARGIN_X - w, y);
      }
      y += 13;
      const instLine = [edu.institution, edu.location].filter(Boolean).join(' | ');
      if (instLine) {
        addWrappedText(instLine, { fontSize: 9.5, color: [70, 70, 70], lineHeight: 12 });
      }
      if (edu.score) {
        addWrappedText(`CGPA/Percentage: ${edu.score}`, { fontSize: 9.5, color: [70, 70, 70], lineHeight: 12 });
      }
      y += 6;
    });
    y += 2;
  }

  // ---- Skills ----
  if (resumeData.skills.length > 0) {
    addSectionHeading('Skills');
    addWrappedText(resumeData.skills.join(', '), { fontSize: 10 });
    y += 8;
  }

  // ---- Projects ----
  if (resumeData.projects.length > 0) {
    addSectionHeading('Projects');
    resumeData.projects.forEach((proj) => {
      ensureSpace(28);
      doc.setFont(style.bodyFont, 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(20, 20, 20);
      doc.text(proj.title || '', MARGIN_X, y);
      y += 13;
      if (proj.technologies) {
        addWrappedText(`Technologies: ${proj.technologies}`, { fontSize: 9.5, fontStyle: 'italic', color: [70, 70, 70], lineHeight: 12 });
      }
      if (proj.description) {
        addBulletedText(proj.description);
      }
      const links = [proj.githubUrl, proj.projectUrl].filter(Boolean).join('  |  ');
      if (links) {
        addWrappedText(links, { fontSize: 9, color: [90, 90, 90], lineHeight: 12 });
      }
      y += 6;
    });
    y += 2;
  }

  // ---- Experience ----
  if (resumeData.experience.length > 0) {
    addSectionHeading('Experience');
    resumeData.experience.forEach((exp) => {
      ensureSpace(28);
      doc.setFont(style.bodyFont, 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(20, 20, 20);
      doc.text(exp.position || '', MARGIN_X, y);
      const dateText = [exp.startDate, exp.endDate].filter(Boolean).join(' - ');
      if (dateText) {
        doc.setFont(style.bodyFont, 'normal');
        doc.setFontSize(9.5);
        const w = doc.getTextWidth(dateText);
        doc.text(dateText, PAGE_WIDTH - MARGIN_X - w, y);
      }
      y += 13;
      const compLine = [exp.company, exp.location].filter(Boolean).join(' | ');
      if (compLine) {
        addWrappedText(compLine, { fontSize: 9.5, color: [70, 70, 70], lineHeight: 12 });
      }
      if (exp.description) {
        addBulletedText(exp.description);
      }
      y += 6;
    });
    y += 2;
  }

  // ---- Certifications ----
  if (resumeData.certifications.length > 0) {
    addSectionHeading('Certifications');
    resumeData.certifications.forEach((cert) => {
      const line = [cert.name, cert.organization, cert.year].filter(Boolean).join(' | ');
      addWrappedText(line, { fontSize: 10, lineHeight: 13 });
    });
    y += 6;
  }

  // ---- Achievements ----
  if (resumeData.achievements.length > 0) {
    addSectionHeading('Achievements');
    const achievementText = resumeData.achievements.join('\n');
    addBulletedText(achievementText, { fontSize: 10 });
    y += 6;
  }

  // ---- Languages ----
  if (resumeData.languages.length > 0) {
    addSectionHeading('Languages');
    addWrappedText(resumeData.languages.join(', '), { fontSize: 10 });
  }

  doc.save(sanitizeFilename(resumeData.personal.fullName));
}
