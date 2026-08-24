import { emptyExperience } from '../../data/initialResumeData.js';

export default function ExperienceForm({ items, onChange }) {
  function addEntry() {
    onChange([...items, emptyExperience()]);
  }

  function updateEntry(id, field, value) {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  function removeEntry(id) {
    onChange(items.filter((item) => item.id !== id));
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Experience</h2>
      <p className="form-subtitle">Internships, part-time jobs, or freelance work all belong here.</p>

      {items.length === 0 && <div className="empty-state">No experience added yet.</div>}

      {items.map((exp, index) => (
        <div className="entry-block" key={exp.id}>
          <div className="entry-block-header">
            <span>Experience {index + 1}</span>
            <button className="link-btn danger" onClick={() => removeEntry(exp.id)}>
              Remove
            </button>
          </div>
          <div className="form-grid two-col">
            <div className="field">
              <label>Position</label>
              <input
                type="text"
                placeholder="Software Development Intern"
                value={exp.position}
                onChange={(e) => updateEntry(exp.id, 'position', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Company</label>
              <input
                type="text"
                placeholder="ABC Technologies"
                value={exp.company}
                onChange={(e) => updateEntry(exp.id, 'company', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Location</label>
              <input
                type="text"
                placeholder="Chennai"
                value={exp.location}
                onChange={(e) => updateEntry(exp.id, 'location', e.target.value)}
              />
            </div>
            <div className="field field-row">
              <div>
                <label>Start Date</label>
                <input
                  type="text"
                  placeholder="June 2026"
                  value={exp.startDate}
                  onChange={(e) => updateEntry(exp.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <label>End Date</label>
                <input
                  type="text"
                  placeholder="August 2026"
                  value={exp.endDate}
                  onChange={(e) => updateEntry(exp.id, 'endDate', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label>Responsibilities / Description (one bullet per line)</label>
            <textarea
              rows={4}
              placeholder={'Developed new features for the internal dashboard.\nImplemented automated tests, improving coverage by 20%.'}
              value={exp.description}
              onChange={(e) => updateEntry(exp.id, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button className="btn btn-outline" onClick={addEntry}>
        + Add Experience
      </button>
    </div>
  );
}
