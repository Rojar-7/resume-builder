import { useState } from 'react';

export default function AchievementsForm({ items, onChange }) {
  const [draft, setDraft] = useState('');

  function addItem() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setDraft('');
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Achievements</h2>
      <p className="form-subtitle">Awards, competitions, publications, hackathons — one per line.</p>

      <div className="skill-input-row">
        <input
          type="text"
          placeholder="Won first prize in a technical symposium"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-secondary" onClick={addItem}>
          Add
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">No achievements added yet.</div>
      ) : (
        <ul className="bullet-list-editable">
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>
              <span>{item}</span>
              <button className="link-btn danger" onClick={() => removeItem(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
