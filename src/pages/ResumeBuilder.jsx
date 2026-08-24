import { useEffect, useMemo, useRef, useState } from 'react';
import ResumeSidebar from '../components/resume/ResumeSidebar.jsx';
import PersonalInfo from '../components/resume/PersonalInfo.jsx';
import ProfessionalSummary from '../components/resume/ProfessionalSummary.jsx';
import EducationForm from '../components/resume/EducationForm.jsx';
import SkillsForm from '../components/resume/SkillsForm.jsx';
import ProjectsForm from '../components/resume/ProjectsForm.jsx';
import ExperienceForm from '../components/resume/ExperienceForm.jsx';
import CertificationsForm from '../components/resume/CertificationsForm.jsx';
import AchievementsForm from '../components/resume/AchievementsForm.jsx';
import LanguagesForm from '../components/resume/LanguagesForm.jsx';
import TemplateSelector from '../components/resume/TemplateSelector.jsx';
import ResumePreview from '../components/resume/ResumePreview.jsx';
import { createEmptyResume, SECTIONS } from '../data/initialResumeData.js';
import { saveResumeToStorage, loadResumeFromStorage, clearResumeFromStorage, getLastSavedAt } from '../utils/resumeStorage.js';
import { calculateCompletion } from '../utils/completionScore.js';
import { validatePersonalInfo, getResumeSuggestions } from '../utils/resumeValidation.js';
import { generateResumePdf } from '../utils/pdfGenerator.js';

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(() => loadResumeFromStorage() || createEmptyResume());
  const [activeSection, setActiveSection] = useState('personal');
  const [mobileView, setMobileView] = useState('edit'); // 'edit' | 'preview'
  const [saveStatus, setSaveStatus] = useState(null); // null | 'saved'
  const [pdfStatus, setPdfStatus] = useState('idle'); // idle | generating | success | error
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const isGeneratingRef = useRef(false);
  const saveTimeoutRef = useRef(null);
  const statusTimeoutRef = useRef(null);

  const completion = useMemo(() => calculateCompletion(resumeData), [resumeData]);
  const suggestions = useMemo(() => getResumeSuggestions(resumeData), [resumeData]);
  const personalErrors = useMemo(() => validatePersonalInfo(resumeData.personal), [resumeData.personal]);

  // Auto-save to localStorage (debounced) whenever data changes.
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveResumeToStorage(resumeData);
    }, 600);
    return () => clearTimeout(saveTimeoutRef.current);
  }, [resumeData]);

  function updateResume(updater) {
    setResumeData((prev) => (typeof updater === 'function' ? updater(prev) : updater));
  }

  function handleManualSave() {
    saveResumeToStorage(resumeData);
    setSaveStatus('saved');
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    statusTimeoutRef.current = setTimeout(() => setSaveStatus(null), 2200);
  }

  function handleClearRequest() {
    setShowClearConfirm(true);
  }

  function handleClearConfirmed() {
    clearResumeFromStorage();
    setResumeData(createEmptyResume());
    setShowClearConfirm(false);
  }

  async function handleDownloadPdf() {
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;
    setPdfStatus('generating');
    try {
      // Allow the UI to paint the "Generating..." state before the
      // (synchronous) PDF work runs.
      await new Promise((resolve) => setTimeout(resolve, 50));
      generateResumePdf(resumeData);
      setPdfStatus('success');
    } catch (err) {
      console.error('PDF generation failed:', err);
      setPdfStatus('error');
    } finally {
      isGeneratingRef.current = false;
      setTimeout(() => setPdfStatus('idle'), 2600);
    }
  }

  function handlePrint() {
    window.print();
  }

  const lastSavedAt = getLastSavedAt();

  return (
    <div className="app-shell">
      <header className="topbar no-print">
        <div className="topbar-brand">
          <div className="brand-mark">ASCM</div>
          <div className="brand-text">
            <span className="brand-title">AI Student Career Mentor</span>
            <span className="brand-subtitle">Resume Builder</span>
          </div>
        </div>
        <div className="topbar-actions">
          <button className="btn btn-ghost" onClick={handleManualSave}>
            {saveStatus === 'saved' ? 'Saved ✓' : 'Save Resume'}
          </button>
          <button className="btn btn-ghost btn-danger" onClick={handleClearRequest}>
            Clear Resume
          </button>
          <button className="btn btn-secondary" onClick={handlePrint}>
            Print
          </button>
          <button className="btn btn-primary" onClick={handleDownloadPdf} disabled={pdfStatus === 'generating'}>
            {pdfStatus === 'generating' && 'Generating PDF...'}
            {pdfStatus === 'success' && 'PDF downloaded successfully'}
            {pdfStatus === 'error' && 'Unable to generate PDF. Try again.'}
            {pdfStatus === 'idle' && 'Download PDF'}
          </button>
        </div>
        {lastSavedAt && (
          <div className="last-saved no-print">
            Last saved {new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </header>

      <div className="mobile-tabs no-print">
        <button className={mobileView === 'edit' ? 'tab-btn active' : 'tab-btn'} onClick={() => setMobileView('edit')}>
          Edit
        </button>
        <button className={mobileView === 'preview' ? 'tab-btn active' : 'tab-btn'} onClick={() => setMobileView('preview')}>
          Preview
        </button>
      </div>

      <div className="builder-layout">
        <aside className={`sidebar no-print ${mobileView === 'preview' ? 'hide-on-mobile' : ''}`}>
          <ResumeSidebar
            sections={SECTIONS}
            activeSection={activeSection}
            onSelect={setActiveSection}
            completion={completion}
            resumeData={resumeData}
          />
        </aside>

        <main className={`editor-panel no-print ${mobileView === 'preview' ? 'hide-on-mobile' : ''}`}>
          {suggestions.length > 0 && (
            <div className="suggestions-card">
              <span className="suggestions-title">Suggestions to strengthen your resume</span>
              <ul>
                {suggestions.slice(0, 3).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === 'personal' && (
            <PersonalInfo
              data={resumeData.personal}
              errors={personalErrors}
              onChange={(personal) => updateResume((prev) => ({ ...prev, personal }))}
            />
          )}
          {activeSection === 'summary' && (
            <ProfessionalSummary
              value={resumeData.summary}
              onChange={(summary) => updateResume((prev) => ({ ...prev, summary }))}
            />
          )}
          {activeSection === 'education' && (
            <EducationForm
              items={resumeData.education}
              onChange={(education) => updateResume((prev) => ({ ...prev, education }))}
            />
          )}
          {activeSection === 'skills' && (
            <SkillsForm skills={resumeData.skills} onChange={(skills) => updateResume((prev) => ({ ...prev, skills }))} />
          )}
          {activeSection === 'projects' && (
            <ProjectsForm
              items={resumeData.projects}
              onChange={(projects) => updateResume((prev) => ({ ...prev, projects }))}
            />
          )}
          {activeSection === 'experience' && (
            <ExperienceForm
              items={resumeData.experience}
              onChange={(experience) => updateResume((prev) => ({ ...prev, experience }))}
            />
          )}
          {activeSection === 'certifications' && (
            <CertificationsForm
              items={resumeData.certifications}
              onChange={(certifications) => updateResume((prev) => ({ ...prev, certifications }))}
            />
          )}
          {activeSection === 'achievements' && (
            <AchievementsForm
              items={resumeData.achievements}
              onChange={(achievements) => updateResume((prev) => ({ ...prev, achievements }))}
            />
          )}
          {activeSection === 'languages' && (
            <LanguagesForm
              items={resumeData.languages}
              onChange={(languages) => updateResume((prev) => ({ ...prev, languages }))}
            />
          )}
          {activeSection === 'template' && (
            <TemplateSelector
              selected={resumeData.selectedTemplate}
              onChange={(selectedTemplate) => updateResume((prev) => ({ ...prev, selectedTemplate }))}
            />
          )}
        </main>

        <section className={`preview-panel ${mobileView === 'edit' ? 'hide-on-mobile' : ''}`}>
          <div className="preview-panel-inner">
            <ResumePreview resumeData={resumeData} />
          </div>
        </section>
      </div>

      {showClearConfirm && (
        <div className="modal-overlay no-print" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>Clear your resume?</h3>
            <p>This removes all saved resume information from this browser. This cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowClearConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-danger-solid" onClick={handleClearConfirmed}>
                Clear resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
