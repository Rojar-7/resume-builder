import ResumeBody from './ResumeBody.jsx';

export default function ProfessionalTemplate({ resumeData }) {
  return (
    <div className="resume-page template-professional">
      <ResumeBody resumeData={resumeData} />
    </div>
  );
}
