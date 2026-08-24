import { useState } from 'react';

export default function SkillsForm({ skills, onChange }) {
  const [draft, setDraft] = useState('');

  function addSkill() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    const exists = skills.some((s) => s.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      setDraft('');
      return;
    }
    onChange([...skills, trimmed]);
    setDraft('');
  }

  function removeSkill(skill) {
    onChange(skills.filter((s) => s !== skill));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Skills</h2>
      <p className="form-subtitle">
        Add technical and professional skills one at a time. These are also used by the Skill Gap Analysis module
        later on.
      </p>

      <div className="skill-input-row">
        <input
          type="text"
          placeholder="e.g. Python, React, Git"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-secondary" onClick={addSkill}>
          Add Skill
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="empty-state">No skills added yet.</div>
      ) : (
        <div className="tag-list">
          {skills.map((skill) => (
            <span className="skill-tag" key={skill}>
              {skill}
              <button aria-label={`Remove ${skill}`} onClick={() => removeSkill(skill)}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
