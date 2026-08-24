import { emptyCertification } from '../../data/initialResumeData.js';

export default function CertificationsForm({ items, onChange }) {
  function addEntry() {
    onChange([...items, emptyCertification()]);
  }

  function updateEntry(id, field, value) {
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  function removeEntry(id) {
    onChange(items.filter((item) => item.id !== id));
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Certifications</h2>
      <p className="form-subtitle">Online courses, NPTEL, Coursera, or vendor certifications.</p>

      {items.length === 0 && <div className="empty-state">No certifications added yet.</div>}

      {items.map((cert, index) => (
        <div className="entry-block" key={cert.id}>
          <div className="entry-block-header">
            <span>Certification {index + 1}</span>
            <button className="link-btn danger" onClick={() => removeEntry(cert.id)}>
              Remove
            </button>
          </div>
          <div className="form-grid two-col">
            <div className="field">
              <label>Certification Name</label>
              <input
                type="text"
                placeholder="Python for Data Science"
                value={cert.name}
                onChange={(e) => updateEntry(cert.id, 'name', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Issuing Organization</label>
              <input
                type="text"
                placeholder="NPTEL"
                value={cert.organization}
                onChange={(e) => updateEntry(cert.id, 'organization', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Year</label>
              <input
                type="text"
                placeholder="2026"
                value={cert.year}
                onChange={(e) => updateEntry(cert.id, 'year', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Credential URL</label>
              <input
                type="text"
                placeholder="credential-link.com"
                value={cert.credentialUrl}
                onChange={(e) => updateEntry(cert.id, 'credentialUrl', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-outline" onClick={addEntry}>
        + Add Certification
      </button>
    </div>
  );
}
