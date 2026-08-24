import ModernTemplate from '../../templates/ModernTemplate.jsx';
import ProfessionalTemplate from '../../templates/ProfessionalTemplate.jsx';
import MinimalTemplate from '../../templates/MinimalTemplate.jsx';

const TEMPLATE_COMPONENTS = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
};

export default function ResumePreview({ resumeData }) {
  const TemplateComponent = TEMPLATE_COMPONENTS[resumeData.selectedTemplate] || ModernTemplate;

  return (
    <div className="resume-preview-wrap">
      <div className="preview-hint no-print">
        Live preview — actual A4 size (210mm × 297mm). Content flows naturally onto additional pages.
      </div>
      <div id="resume-print-root" className="resume-page-outer">
        <TemplateComponent resumeData={resumeData} />
      </div>
    </div>
  );
}
