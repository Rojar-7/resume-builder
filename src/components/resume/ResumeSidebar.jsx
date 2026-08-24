function isSectionFilled(sectionId, resumeData) {
  switch (sectionId) {
    case 'personal':
      return Boolean(resumeData.personal.fullName && resumeData.personal.email);
    case 'summary':
      return Boolean(resumeData.summary && resumeData.summary.trim().length >= 20);
    case 'education':
      return resumeData.education.length > 0;
    case 'skills':
      return resumeData.skills.length > 0;
    case 'projects':
      return resumeData.projects.length > 0;
    case 'experience':
      return resumeData.experience.length > 0;
    case 'certifications':
      return resumeData.certifications.length > 0;
    case 'achievements':
      return resumeData.achievements.length > 0;
    case 'languages':
      return resumeData.languages.length > 0;
    case 'template':
      return true;
    default:
      return false;
  }
}

export default function ResumeSidebar({ sections, activeSection, onSelect, completion, resumeData }) {
  return (
    <div className="sidebar-inner">
      <nav className="section-nav" aria-label="Resume sections">
        {sections.map((section, idx) => {
          const filled = isSectionFilled(section.id, resumeData);
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              className={`section-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(section.id)}
            >
              <span className={`section-check ${filled ? 'filled' : ''}`}>
                {filled ? '✓' : idx + 1}
              </span>
              <span className="section-label">{section.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="completion-card">
        <div className="completion-header">
          <span>Resume Completion</span>
          <span className="completion-percent">{completion}%</span>
        </div>
        <div className="completion-track">
          <div className="completion-fill" style={{ width: `${completion}%` }} />
        </div>
      </div>
    </div>
  );
}
