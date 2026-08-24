import { emptyProject } from '../../data/initialResumeData.js';

export default function ProjectsForm({ items, onChange }) {
  function addEntry() {
    onChange([...items, emptyProject()]);
  }

  function updateEntry(id, field, value) {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  function removeEntry(id) {
    onChange(items.filter((item) => item.id !== id));
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Projects</h2>
      <p className="form-subtitle">Use bullet points (one line each) in the description for clear, scannable achievements.</p>

      {items.length === 0 && <div className="empty-state">No projects added yet.</div>}

      {items.map((proj, index) => (
        <div className="entry-block" key={proj.id}>
          <div className="entry-block-header">
            <span>Project {index + 1}</span>
            <button className="link-btn danger" onClick={() => removeEntry(proj.id)}>
              Remove Project
            </button>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Project Title</label>
              <input
                type="text"
                placeholder="AI Student Career Mentor"
                value={proj.title}
                onChange={(e) => updateEntry(proj.id, 'title', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Description (one bullet per line)</label>
              <textarea
                rows={4}
                placeholder={'Developed a web-based platform that helps students identify career paths.\nBuilt a resume builder with live A4 preview and PDF export.'}
                value={proj.description}
                onChange={(e) => updateEntry(proj.id, 'description', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Technologies Used</label>
              <input
                type="text"
                placeholder="React, JavaScript, Node.js, MongoDB"
                value={proj.technologies}
                onChange={(e) => updateEntry(proj.id, 'technologies', e.target.value)}
              />
            </div>
            <div className="form-grid two-col">
              <div className="field">
                <label>GitHub URL</label>
                <input
                  type="text"
                  placeholder="github.com/username/project"
                  value={proj.githubUrl}
                  onChange={(e) => updateEntry(proj.id, 'githubUrl', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Project URL (optional)</label>
                <input
                  type="text"
                  placeholder="project-demo.com"
                  value={proj.projectUrl}
                  onChange={(e) => updateEntry(proj.id, 'projectUrl', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-outline" onClick={addEntry}>
        + Add Project
      </button>
    </div>
  );
}
