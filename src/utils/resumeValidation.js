const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts optional +countrycode, spaces, dashes, parentheses. 7-15 digits.
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

export function validatePersonalInfo(personal) {
  const errors = {};

  if (!personal.fullName || !personal.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (personal.email && !EMAIL_REGEX.test(personal.email.trim())) {
    errors.email = 'Enter a valid email address, e.g. name@example.com';
  }

  if (personal.phone && !PHONE_REGEX.test(personal.phone.trim())) {
    errors.phone = 'Enter a valid phone number.';
  }

  return errors;
}

export function getResumeSuggestions(resumeData) {
  const suggestions = [];

  if (!resumeData.summary || resumeData.summary.trim().length < 20) {
    suggestions.push('Add a professional summary to introduce yourself.');
  }
  if (resumeData.skills.length < 3) {
    suggestions.push('Add at least 3 relevant skills.');
  }
  if (resumeData.education.length === 0) {
    suggestions.push('Add at least one education entry.');
  }
  if (resumeData.projects.length === 0) {
    suggestions.push('Add a project to strengthen your resume.');
  }
  if (!resumeData.personal.github) {
    suggestions.push('Add your GitHub profile link.');
  }
  if (!resumeData.personal.linkedin) {
    suggestions.push('Add your LinkedIn profile link.');
  }
  if (resumeData.experience.length === 0) {
    suggestions.push('Add an internship or work experience if you have one.');
  }
  if (resumeData.certifications.length === 0) {
    suggestions.push('Add relevant certifications to stand out.');
  }

  return suggestions;
}
