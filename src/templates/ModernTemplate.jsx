import ResumeBody from './ResumeBody.jsx';

export default function ModernTemplate({ resumeData }) {
  return (
    <div className="resume-page template-modern">
      <ResumeBody resumeData={resumeData} />
    </div>
  );
}
