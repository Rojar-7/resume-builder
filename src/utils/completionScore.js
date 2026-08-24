// Weighted resume completion score, as specified in the product brief.
const WEIGHTS = {
  personal: 20,
  summary: 10,
  education: 20,
  skills: 15,
  projects: 15,
  experience: 10,
  certifications: 5,
  achievements: 3,
  languages: 2,
};

function personalScore(personal) {
  const fields = ['fullName', 'professionalTitle', 'email', 'phone', 'location'];
  const filled = fields.filter((f) => personal[f] && personal[f].trim()).length;
  return filled / fields.length;
}

export function calculateCompletion(resumeData) {
  let total = 0;

  total += personalScore(resumeData.personal) * WEIGHTS.personal;
  total += (resumeData.summary && resumeData.summary.trim().length >= 20 ? 1 : 0) * WEIGHTS.summary;
  total += Math.min(resumeData.education.length / 1, 1) * WEIGHTS.education;
  total += Math.min(resumeData.skills.length / 5, 1) * WEIGHTS.skills;
  total += Math.min(resumeData.projects.length / 2, 1) * WEIGHTS.projects;
  total += Math.min(resumeData.experience.length / 1, 1) * WEIGHTS.experience;
  total += Math.min(resumeData.certifications.length / 1, 1) * WEIGHTS.certifications;
  total += Math.min(resumeData.achievements.length / 1, 1) * WEIGHTS.achievements;
  total += Math.min(resumeData.languages.length / 1, 1) * WEIGHTS.languages;

  return Math.round(total);
}
