import { useState } from 'react';

// Placeholder for future AI integration. The real implementation will call
// a backend endpoint (never an API key from the frontend) that wraps
// something like an `enhanceSummary()` service function.
function enhanceSummary(_currentText) {
  return 'AI enhancement coming soon';
}

export default function ProfessionalSummary({ value, onChange }) {
  const [aiNotice, setAiNotice] = useState('');

  function handleImproveClick() {
    setAiNotice(enhanceSummary(value));
    setTimeout(() => setAiNotice(''), 2500);
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Professional Summary</h2>
      <p className="form-subtitle">Two to three sentences that summarize your strengths and goals.</p>

      <div className="field">
        <label htmlFor="summary">Professional Summary</label>
        <textarea
          id="summary"
          rows={6}
          placeholder="Motivated Computer Science student with experience in web development, JavaScript and database systems. Interested in building scalable software solutions and exploring artificial intelligence."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="field-footer">
          <span className="char-count">{value.length} characters</span>
          <button type="button" className="btn btn-ghost btn-small" onClick={handleImproveClick}>
            ✨ Improve with AI
          </button>
        </div>
        {aiNotice && <span className="ai-notice">{aiNotice}</span>}
      </div>
    </div>
  );
}
