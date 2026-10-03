import { useRef, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileText,
  Info,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import "./StudentResume.css";

export default function StudentResume() {
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF, DOC or DOCX file.");
      return;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 5 MB.");
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    setResume({
      file,
      name: file.name,
      size: file.size,
      url: fileUrl,
      uploadedAt: new Date(),
    });
  };

  const removeResume = () => {
    if (resume?.url) {
      URL.revokeObjectURL(resume.url);
    }

    setResume(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (size) => {
    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="student-resume-page">
      <main className="student-resume-main">

        {/* HEADER */}
        <section className="resume-page-header">
          <div>
            <span className="resume-page-eyebrow">
              PROFILE
            </span>

            <h1>Resume</h1>

            <p>
              Upload and manage the resume you want to use for
              opportunities and applications.
            </p>
          </div>
        </section>

        {/* RESUME STATUS */}
        <section className="resume-status-card">
          <div className="resume-status-icon">
            <FileText size={27} />
          </div>

          <div className="resume-status-content">
            <span>RESUME PROFILE</span>

            <h2>
              {resume ? "Your resume is ready" : "Add your resume"}
            </h2>

            <p>
              {resume
                ? "Your current resume is available in your profile and can be updated whenever needed."
                : "Upload a recent resume so your profile can present your education, skills and experience clearly."}
            </p>
          </div>

          <div
            className={`resume-status-badge ${
              resume ? "uploaded" : "missing"
            }`}
          >
            {resume ? (
              <>
                <CheckCircle2 size={16} />
                Uploaded
              </>
            ) : (
              <>
                <Info size={16} />
                Not Added
              </>
            )}
          </div>
        </section>

        {/* RESUME AREA */}
        <section className="resume-content-card">
          <div className="resume-content-header">
            <div>
              <span>YOUR RESUME</span>

              <h2>Resume Document</h2>

              <p>
                Keep one recent and professional version of your
                resume available.
              </p>
            </div>
          </div>

          {!resume ? (
            <div
              className="resume-upload-area"
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  fileInputRef.current?.click();
                }
              }}
            >
              <div className="resume-upload-icon">
                <Upload size={27} />
              </div>

              <h3>Upload your resume</h3>

              <p>
                Drag and drop your file here or click to browse
              </p>

              <span>
                PDF, DOC or DOCX · Maximum 5 MB
              </span>

              <button
                type="button"
                className="resume-browse-button"
                onClick={(event) => {
                  event.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <Upload size={17} />
                Choose Resume
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                hidden
              />
            </div>
          ) : (
            <div className="resume-file-card">
              <div className="resume-file-icon">
                <FileText size={25} />
              </div>

              <div className="resume-file-info">
                <h3>{resume.name}</h3>

                <p>
                  {formatFileSize(resume.size)}
                  {" · "}
                  Uploaded{" "}
                  {resume.uploadedAt.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="resume-file-actions">
                {resume.file.type === "application/pdf" && (
                  <a
                    href={resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="resume-view-button"
                  >
                    <FileText size={16} />
                    View
                  </a>
                )}

                <a
                  href={resume.url}
                  download={resume.name}
                  className="resume-download-button"
                >
                  <Download size={16} />
                  Download
                </a>

                <button
                  type="button"
                  className="resume-remove-button"
                  onClick={removeResume}
                  title="Remove resume"
                  aria-label="Remove resume"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="resume-error">
              <X size={16} />
              {error}
            </div>
          )}
        </section>

        {/* RESUME GUIDELINES */}
        <section className="resume-guidelines-card">
          <div className="resume-guidelines-icon">
            <Info size={23} />
          </div>

          <div className="resume-guidelines-content">
            <span>RESUME GUIDELINES</span>

            <h2>Keep your resume application-ready</h2>

            <div className="resume-guidelines-grid">
              <div>
                <strong>Keep it current</strong>
                <p>
                  Update your resume when you gain new skills,
                  complete projects or earn certifications.
                </p>
              </div>

              <div>
                <strong>Use a clear format</strong>
                <p>
                  Keep sections such as education, skills,
                  projects and experience easy to scan.
                </p>
              </div>

              <div>
                <strong>Highlight relevant work</strong>
                <p>
                  Prioritize projects and skills related to the
                  opportunities you are applying for.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}