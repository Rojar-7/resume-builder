import { TEMPLATES } from '../../data/initialResumeData.js';

export default function TemplateSelector({ selected, onChange }) {
  return (
    <div className="form-card">
      <h2 className="form-title">Template</h2>
      <p className="form-subtitle">
        Switching templates only changes typography and spacing — your information stays exactly the same.
      </p>

      <div className="template-grid">
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            className={`template-option ${selected === tpl.id ? 'selected' : ''}`}
            onClick={() => onChange(tpl.id)}
          >
            <div className={`template-swatch swatch-${tpl.id}`}>
              <div className="swatch-line swatch-line-title" />
              <div className="swatch-line swatch-line-short" />
              <div className="swatch-line" />
              <div className="swatch-line" />
            </div>
            <div className="template-option-name">{tpl.name}</div>
            <div className="template-option-desc">{tpl.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
