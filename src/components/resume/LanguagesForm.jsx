import { useState } from 'react';

export default function LanguagesForm({ items, onChange }) {
  const [draft, setDraft] = useState('');

  function addItem() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    const exists = items.some((l) => l.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      setDraft('');
      return;
    }
    onChange([...items, trimmed]);
    setDraft('');
  }

  function removeItem(lang) {
    onChange(items.filter((l) => l !== lang));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Languages</h2>
      <p className="form-subtitle">Languages you can read, write, or speak professionally.</p>

      <div className="skill-input-row">
        <input
          type="text"
          placeholder="e.g. English, Tamil, Spanish"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-secondary" onClick={addItem}>
          Add
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">No languages added yet.</div>
      ) : (
        <div className="tag-list">
          {items.map((lang) => (
            <span className="skill-tag" key={lang}>
              {lang}
              <button aria-label={`Remove ${lang}`} onClick={() => removeItem(lang)}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
