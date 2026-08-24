// Centralized resume data shape.
// This structure is intentionally kept flat and serializable (no functions,
// no class instances) so it can later be sent to a backend, compared against
// a "requiredSkillsForRole" data set by the Skill Gap Analysis module, or
// consumed by the Job Recommendation / Career Roadmap modules.

export const SECTIONS = [
  { id: 'personal', label: 'Personal Information' },
  { id: 'summary', label: 'Professional Summary' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'languages', label: 'Languages' },
  { id: 'template', label: 'Template' },
];

export const TEMPLATES = [
  { id: 'modern', name: 'Modern', description: 'Bold name, teal rule accents, confident spacing.' },
  { id: 'professional', name: 'Professional', description: 'Classic serif headings, traditional and formal.' },
  { id: 'minimal', name: 'Minimal', description: 'Understated, tight and efficient, all business.' },
];

export function createEmptyResume() {
  return {
    personal: {
      fullName: '',
      professionalTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
    },
    summary: '',
    education: [],
    skills: [],
    projects: [],
    experience: [],
    certifications: [],
    achievements: [],
    languages: [],
    selectedTemplate: 'modern',
  };
}

export function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function emptyEducation() {
  return {
    id: createId(),
    degree: '',
    institution: '',
    location: '',
    startYear: '',
    endYear: '',
    score: '',
  };
}

export function emptyProject() {
  return {
    id: createId(),
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    projectUrl: '',
  };
}

export function emptyExperience() {
  return {
    id: createId(),
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  };
}

export function emptyCertification() {
  return {
    id: createId(),
    name: '',
    organization: '',
    year: '',
    credentialUrl: '',
  };
}
