import ResumeBody from './ResumeBody.jsx';

export default function MinimalTemplate({ resumeData }) {
  return (
    <div className="resume-page template-minimal">
      <ResumeBody resumeData={resumeData} />
    </div>
  );
}
