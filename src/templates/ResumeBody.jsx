function BulletList({ text }) {
  if (!text) return null;
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.replace(/^[-•*]\s*/, ''));
  if (lines.length === 0) return null;
  return (
    <ul className="resume-bullets">
      {lines.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
}

export default function ResumeBody({ resumeData }) {
  const { personal, summary, education, skills, projects, experience, certifications, achievements, languages } =
    resumeData;

  const contactLine1 = [personal.email, personal.phone, personal.location].filter(Boolean).join(' | ');
  const contactLine2 = [personal.linkedin, personal.github, personal.portfolio].filter(Boolean).join(' | ');

  return (
    <div className="resume-content">
      <header className="resume-header">
        <h1 className="resume-name">{personal.fullName || 'Your Name'}</h1>
        {personal.professionalTitle && <div className="resume-role">{personal.professionalTitle}</div>}
        {contactLine1 && <div className="resume-contact">{contactLine1}</div>}
        {contactLine2 && <div className="resume-contact">{contactLine2}</div>}
      </header>

      {summary && summary.trim() && (
        <section className="resume-section">
          <h2>Professional Summary</h2>
          <p className="resume-paragraph">{summary}</p>
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section">
          <h2>Education</h2>
          {education.map((edu) => (
            <div className="resume-entry" key={edu.id}>
              <div className="resume-entry-row">
                <span className="resume-entry-title">{edu.degree}</span>
                {(edu.startYear || edu.endYear) && (
                  <span className="resume-entry-date">
                    {[edu.startYear, edu.endYear].filter(Boolean).join(' - ')}
                  </span>
                )}
              </div>
              <div className="resume-entry-sub">{[edu.institution, edu.location].filter(Boolean).join(' | ')}</div>
              {edu.score && <div className="resume-entry-sub">CGPA/Percentage: {edu.score}</div>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-section">
          <h2>Skills</h2>
          <p className="resume-paragraph">{skills.join(', ')}</p>
        </section>
      )}

      {projects.length > 0 && (
        <section className="resume-section">
          <h2>Projects</h2>
          {projects.map((proj) => (
            <div className="resume-entry" key={proj.id}>
              <div className="resume-entry-row">
                <span className="resume-entry-title">{proj.title}</span>
              </div>
              {proj.technologies && <div className="resume-entry-sub italic">Technologies: {proj.technologies}</div>}
              <BulletList text={proj.description} />
              {(proj.githubUrl || proj.projectUrl) && (
                <div className="resume-entry-links">{[proj.githubUrl, proj.projectUrl].filter(Boolean).join(' | ')}</div>
              )}
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section className="resume-section">
          <h2>Experience</h2>
          {experience.map((exp) => (
            <div className="resume-entry" key={exp.id}>
              <div className="resume-entry-row">
                <span className="resume-entry-title">{exp.position}</span>
                {(exp.startDate || exp.endDate) && (
                  <span className="resume-entry-date">
                    {[exp.startDate, exp.endDate].filter(Boolean).join(' - ')}
                  </span>
                )}
              </div>
              <div className="resume-entry-sub">{[exp.company, exp.location].filter(Boolean).join(' | ')}</div>
              <BulletList text={exp.description} />
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section className="resume-section">
          <h2>Certifications</h2>
          {certifications.map((cert) => (
            <div className="resume-entry resume-entry-tight" key={cert.id}>
              {[cert.name, cert.organization, cert.year].filter(Boolean).join(' | ')}
            </div>
          ))}
        </section>
      )}

      {achievements.length > 0 && (
        <section className="resume-section">
          <h2>Achievements</h2>
          <ul className="resume-bullets">
            {achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {languages.length > 0 && (
        <section className="resume-section">
          <h2>Languages</h2>
          <p className="resume-paragraph">{languages.join(', ')}</p>
        </section>
      )}
    </div>
  );
}
