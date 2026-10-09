import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileText,
  Info,
  Trash2,
  Upload,
  X,
  Sparkles,
  LoaderCircle,
  Target,
  Brain,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

import "./StudentResume.css";

const API_URL = "http://localhost:5000";

export default function StudentResume() {
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadResumeAnalysis = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/student/ai-resume/analysis`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok && data.success && isMounted) {
          setAnalysis(data.analysis);
          if (data.file && (data.file.originalName || data.file.fileName)) {
            setResume({
              name: data.file.originalName || data.file.fileName,
              size: data.file.fileSize || 0,
              url: data.file.fileUrl || "",
              uploadedAt: data.file.uploadedAt
                ? new Date(data.file.uploadedAt)
                : (data.updatedAt ? new Date(data.updatedAt) : new Date()),
            });
          }
        }
      } catch (err) {
        console.error("Failed to load resume analysis:", err);
      } finally {
        if (isMounted) {
          setLoadingAnalysis(false);
        }
      }
    };

    loadResumeAnalysis();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please upload a PDF resume.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("File size must be less than 5 MB.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Do NOT set resume state yet.
    // The resume is only considered successfully uploaded AFTER backend returns success.
    const fileUrl = URL.createObjectURL(file);

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        `${API_URL}/api/student/ai-resume/upload-analyze`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Resume upload and analysis failed."
        );
      }

      // Backend succeeded: revoke any previous temporary object URL
      if (resume?.url && resume.url.startsWith("blob:")) {
        URL.revokeObjectURL(resume.url);
      }

      setResume({
        file,
        name: file.name,
        size: file.size,
        url: fileUrl,
        uploadedAt: new Date(),
      });

      setAnalysis({
        status: "completed",
        provider: data.provider,
        model: data.model,
        ...data.analysis,
      });

      setError("");
    } catch (err) {
      console.error("Resume upload error:", err);

      // On failure: revoke temporary object URL and keep error state
      URL.revokeObjectURL(fileUrl);

      setError(
        err.message || "Unable to upload and analyze resume."
      );
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeResume = () => {
    if (resume?.url && resume.url.startsWith("blob:")) {
      URL.revokeObjectURL(resume.url);
    }

    setResume(null);
    setAnalysis(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (size) => {
    if (!size) return "0 KB";
    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const isUploaded = Boolean(resume || analysis);

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
              Upload and manage the resume you want to use
              for opportunities, applications and AI-powered
              career analysis.
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
              {isUploaded
                ? "Your resume is ready"
                : "Add your resume"}
            </h2>

            <p>
              {isUploaded
                ? "Your resume is available in your profile and can be analyzed to identify skills, roles and improvement areas."
                : "Upload a recent PDF resume so NEXORA can understand your profile and provide useful career insights."}
            </p>
          </div>

          <div
            className={`resume-status-badge ${
              isUploaded ? "uploaded" : "missing"
            }`}
          >
            {isUploaded ? (
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
                Upload one recent PDF resume. NEXORA will
                extract the content and analyze it using AI.
              </p>
            </div>
          </div>

          {!resume ? (
            <div
              className="resume-upload-area"
              onClick={openFilePicker}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  openFilePicker();
                }
              }}
            >
              <div className="resume-upload-icon">
                <Upload size={27} />
              </div>

              <h3>Upload your resume</h3>

              <p>
                Drag and drop your PDF here or click to browse
              </p>

              <span>
                PDF only · Maximum 5 MB
              </span>

              <button
                type="button"
                className="resume-browse-button"
                onClick={(event) => {
                  event.stopPropagation();
                  openFilePicker();
                }}
              >
                <Upload size={17} />
                Choose Resume
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
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
                  {resume.uploadedAt.toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>

                {loading && (
                  <div className="resume-processing-text">
                    <LoaderCircle
                      size={14}
                      className="resume-spin"
                    />
                    Extracting and analyzing your resume...
                  </div>
                )}
              </div>

              <div className="resume-file-actions">
                {resume.url && (
                  <>
                    <a
                      href={resume.url}
                      target="_blank"
                      rel="noreferrer"
                      className="resume-view-button"
                    >
                      <FileText size={16} />
                      View
                    </a>

                    <a
                      href={resume.url}
                      download={resume.name}
                      className="resume-download-button"
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </>
                )}

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

        {/* LOADING INDICATOR */}
        {loading && (
          <section className="resume-ai-loading-card">
            <div className="resume-ai-loading-icon">
              <Sparkles size={23} />
            </div>

            <div>
              <span>AI RESUME ANALYSIS</span>

              <h2>
                NEXORA is analyzing your resume
              </h2>

              <p>
                We are extracting your skills, education,
                projects, suggested roles and skill gaps.
              </p>
            </div>

            <LoaderCircle
              size={24}
              className="resume-spin"
            />
          </section>
        )}

        {/* AI ANALYSIS RESULTS */}
        {!loading && analysis && (
          <section className="resume-analysis-section">
            <div className="resume-analysis-header">
              <div>
                <span>AI RESUME ANALYSIS</span>

                <h2>
                  Your career profile
                </h2>

                <p>
                  AI-generated insights based on the
                  information found in your resume.
                </p>
              </div>

              <div className="resume-score-card">
                <div className="resume-score-number">
                  {analysis.resumeScore ?? analysis.score ?? 0}
                </div>

                <div>
                  <strong>Resume Score</strong>
                  <span>out of 100</span>
                </div>
              </div>
            </div>

            {analysis.summary && (
              <div className="resume-analysis-summary">
                <div className="resume-analysis-small-icon">
                  <Brain size={20} />
                </div>

                <div>
                  <span>SUMMARY</span>
                  <p>{analysis.summary}</p>
                </div>
              </div>
            )}

            <div className="resume-analysis-grid">

              <div className="resume-analysis-card">
                <div className="resume-analysis-card-title">
                  <Brain size={19} />
                  <h3>Skills</h3>
                </div>

                <div className="resume-skill-list">
                  {analysis.skills?.length ? (
                    analysis.skills.map(
                      (skill, index) => (
                        <span key={index}>
                          {skill}
                        </span>
                      )
                    )
                  ) : (
                    <p className="resume-empty-text">
                      No skills detected.
                    </p>
                  )}
                </div>
              </div>

              <div className="resume-analysis-card">
                <div className="resume-analysis-card-title">
                  <Target size={19} />
                  <h3>Suggested Roles</h3>
                </div>

                <div className="resume-role-list">
                  {analysis.suggestedRoles?.length ? (
                    analysis.suggestedRoles.map(
                      (role, index) => (
                        <div key={index}>
                          <CheckCircle2 size={16} />
                          <span>{role}</span>
                        </div>
                      )
                    )
                  ) : (
                    <p className="resume-empty-text">
                      No roles suggested.
                    </p>
                  )}
                </div>
              </div>

              <div className="resume-analysis-card">
                <div className="resume-analysis-card-title">
                  <BriefcaseBusiness size={19} />
                  <h3>Projects</h3>
                </div>

                <div className="resume-project-list">
                  {analysis.projects?.length ? (
                    analysis.projects.map(
                      (project, index) => (
                        <div
                          className="resume-project-item"
                          key={index}
                        >
                          <strong>
                            {project.name}
                          </strong>

                          <p>
                            {project.description}
                          </p>

                          {project.technologies?.length > 0 && (
                            <div className="resume-project-tech">
                              {project.technologies.map(
                                (technology, techIndex) => (
                                  <span
                                    key={techIndex}
                                  >
                                    {technology}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )
                    )
                  ) : (
                    <p className="resume-empty-text">
                      No projects detected.
                    </p>
                  )}
                </div>
              </div>

              <div className="resume-analysis-card">
                <div className="resume-analysis-card-title">
                  <GraduationCap size={19} />
                  <h3>Education</h3>
                </div>

                <div className="resume-education-list">
                  {analysis.education?.length ? (
                    analysis.education.map(
                      (education, index) => (
                        <div
                          className="resume-education-item"
                          key={index}
                        >
                          <strong>
                            {education.degree}
                          </strong>

                          <span>
                            {education.institution}
                          </span>

                          {education.field && (
                            <small>
                              {education.field}
                            </small>
                          )}

                          {education.duration && (
                            <small>
                              {education.duration}
                            </small>
                          )}
                        </div>
                      )
                    )
                  ) : (
                    <p className="resume-empty-text">
                      No education details detected.
                    </p>
                  )}
                </div>
              </div>

            </div>

            <div className="resume-analysis-bottom-grid">

              <div className="resume-analysis-card">
                <div className="resume-analysis-card-title">
                  <CheckCircle2 size={19} />
                  <h3>Strengths</h3>
                </div>

                <ul className="resume-insight-list">
                  {analysis.strengths?.length ? (
                    analysis.strengths.map(
                      (strength, index) => (
                        <li key={index}>
                          <CheckCircle2 size={15} />
                          {strength}
                        </li>
                      )
                    )
                  ) : (
                    <li className="resume-no-list">
                      No strengths detected.
                    </li>
                  )}
                </ul>
              </div>

              <div className="resume-analysis-card resume-skill-gap-card">
                <div className="resume-analysis-card-title">
                  <Target size={19} />
                  <h3>Skill Gaps</h3>
                </div>

                <p className="resume-skill-gap-description">
                  Skills that could strengthen your profile
                  for the suggested roles.
                </p>

                <ul className="resume-insight-list">
                  {analysis.skillGaps?.length ? (
                    analysis.skillGaps.map(
                      (gap, index) => (
                        <li key={index}>
                          <Target size={15} />
                          {gap}
                        </li>
                      )
                    )
                  ) : (
                    <li className="resume-no-list">
                      No skill gaps identified.
                    </li>
                  )}
                </ul>
              </div>

            </div>

            <div className="resume-ai-provider">
              <Sparkles size={14} />
              Analysis generated using{" "}
              <strong>
                {analysis.provider || "AI"}
              </strong>

              {analysis.model && (
                <>
                  {" · "}
                  {analysis.model}
                </>
              )}
            </div>
          </section>
        )}

        {/* LOADING ANALYSIS FROM SERVER INITIAL STATE */}
        {!loading && !analysis && loadingAnalysis && (
          <div className="resume-analysis-fetching">
            <LoaderCircle
              size={18}
              className="resume-spin"
            />
            Loading your resume analysis...
          </div>
        )}

        {/* GUIDELINES */}
        <section className="resume-guidelines-card">
          <div className="resume-guidelines-icon">
            <Info size={23} />
          </div>

          <div className="resume-guidelines-content">
            <span>RESUME GUIDELINES</span>

            <h2>
              Keep your resume application-ready
            </h2>

            <div className="resume-guidelines-grid">
              <div>
                <strong>Keep it current</strong>
                <p>
                  Update your resume when you gain new
                  skills, complete projects or earn
                  certifications.
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
                  Prioritize projects and skills related to
                  the opportunities you are applying for.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}