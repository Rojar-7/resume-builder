export default function PersonalInfo({ data, errors, onChange }) {
  function set(field, value) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Personal Information</h2>
      <p className="form-subtitle">This appears at the top of your resume, so keep it accurate.</p>

      <div className="form-grid two-col">
        <div className="field">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => set('fullName', e.target.value)}
          />
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>

        <div className="field">
          <label htmlFor="professionalTitle">Professional Title</label>
          <input
            id="professionalTitle"
            type="text"
            placeholder="Computer Science Student"
            value={data.professionalTitle}
            onChange={(e) => set('professionalTitle', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="john@gmail.com"
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={data.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="Tamil Nadu, India"
            value={data.location}
            onChange={(e) => set('location', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="linkedin">LinkedIn URL</label>
          <input
            id="linkedin"
            type="text"
            placeholder="linkedin.com/in/johndoe"
            value={data.linkedin}
            onChange={(e) => set('linkedin', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="github">GitHub URL</label>
          <input
            id="github"
            type="text"
            placeholder="github.com/johndoe"
            value={data.github}
            onChange={(e) => set('github', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="portfolio">Portfolio URL</label>
          <input
            id="portfolio"
            type="text"
            placeholder="johndoe.dev"
            value={data.portfolio}
            onChange={(e) => set('portfolio', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
