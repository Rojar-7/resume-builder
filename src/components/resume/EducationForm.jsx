import { emptyEducation } from '../../data/initialResumeData.js';

export default function EducationForm({ items, onChange }) {
  function addEntry() {
    onChange([...items, emptyEducation()]);
  }

  function updateEntry(id, field, value) {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  function removeEntry(id) {
    onChange(items.filter((item) => item.id !== id));
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Education</h2>
      <p className="form-subtitle">Add your most recent or current degree first.</p>

      {items.length === 0 && (
        <div className="empty-state">No education added yet. Add your college or school details below.</div>
      )}

      {items.map((edu, index) => (
        <div className="entry-block" key={edu.id}>
          <div className="entry-block-header">
            <span>Education {index + 1}</span>
            <button className="link-btn danger" onClick={() => removeEntry(edu.id)}>
              Remove
            </button>
          </div>
          <div className="form-grid two-col">
            <div className="field">
              <label>Degree</label>
              <input
                type="text"
                placeholder="B.E. Computer Science and Engineering"
                value={edu.degree}
                onChange={(e) => updateEntry(edu.id, 'degree', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Institution</label>
              <input
                type="text"
                placeholder="Francis Xavier Engineering College"
                value={edu.institution}
                onChange={(e) => updateEntry(edu.id, 'institution', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Location</label>
              <input
                type="text"
                placeholder="Tamil Nadu"
                value={edu.location}
                onChange={(e) => updateEntry(edu.id, 'location', e.target.value)}
              />
            </div>
            <div className="field field-row">
              <div>
                <label>Start Year</label>
                <input
                  type="text"
                  placeholder="2024"
                  value={edu.startYear}
                  onChange={(e) => updateEntry(edu.id, 'startYear', e.target.value)}
                />
              </div>
              <div>
                <label>End Year</label>
                <input
                  type="text"
                  placeholder="2028"
                  value={edu.endYear}
                  onChange={(e) => updateEntry(edu.id, 'endYear', e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label>CGPA / Percentage</label>
              <input
                type="text"
                placeholder="8.2"
                value={edu.score}
                onChange={(e) => updateEntry(edu.id, 'score', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-outline" onClick={addEntry}>
        + Add Education
      </button>
    </div>
  );
}
