import { useState } from "react";
import {
  Award,
  BadgeCheck,
  CalendarDays,
  ExternalLink,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import "./StudentCertifications.css";

export default function StudentCertifications() {
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    skills: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.issuer.trim()) {
      return;
    }

    const newCertificate = {
      id: Date.now(),
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    setCertificates((previous) => [newCertificate, ...previous]);

    setFormData({
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
      skills: "",
    });

    setShowForm(false);
  };

  const deleteCertificate = (id) => {
    setCertificates((previous) =>
      previous.filter((certificate) => certificate.id !== id)
    );
  };

  return (
    <div className="student-certifications-page">
      <main className="student-certifications-main">

        {/* HEADER */}
        <section className="certifications-page-header">
          <div>
            <span className="certifications-page-eyebrow">
              PROFILE
            </span>

            <h1>Certifications</h1>

            <p>
              Add certifications, courses and professional credentials
              that strengthen your profile.
            </p>
          </div>

          <button
            type="button"
            className="certifications-add-button"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} />
            Add Certificate
          </button>
        </section>

        {/* SUMMARY */}
        <section className="certifications-summary-card">
          <div className="certifications-summary-icon">
            <Award size={28} />
          </div>

          <div className="certifications-summary-content">
            <span>CREDENTIAL PORTFOLIO</span>

            <h2>
              Highlight your achievements
            </h2>

            <p>
              Keep your professional certifications and learning
              credentials organized in one place.
            </p>
          </div>

          <div className="certifications-summary-count">
            <strong>{certificates.length}</strong>
            <span>
              {certificates.length === 1
                ? "Certificate"
                : "Certificates"}
            </span>
          </div>
        </section>

        {/* CERTIFICATION LIST */}
        <section className="certifications-list-card">
          <div className="certifications-list-header">
            <div>
              <span>YOUR CREDENTIALS</span>

              <h2>Certificates & Credentials</h2>

              <p>
                Your professional certifications and completed courses.
              </p>
            </div>

            <button
              type="button"
              className="certifications-outline-button"
              onClick={() => setShowForm(true)}
            >
              <Plus size={17} />
              Add Certificate
            </button>
          </div>

          {certificates.length === 0 ? (
            <div className="certifications-empty-state">
              <div className="certifications-empty-icon">
                <Award size={30} />
              </div>

              <h3>No certifications added yet</h3>

              <p>
                Add your certificates, courses or professional
                credentials to showcase your learning achievements.
              </p>

              <button
                type="button"
                className="certifications-empty-button"
                onClick={() => setShowForm(true)}
              >
                <Plus size={17} />
                Add Your First Certificate
              </button>
            </div>
          ) : (
            <div className="certifications-grid">
              {certificates.map((certificate) => (
                <article
                  className="certificate-card"
                  key={certificate.id}
                >
                  <div className="certificate-card-top">
                    <div className="certificate-icon">
                      <Award size={23} />
                    </div>

                    <span className="certificate-verified">
                      <BadgeCheck size={15} />
                      Credential
                    </span>
                  </div>

                  <h3>{certificate.name}</h3>

                  <p className="certificate-issuer">
                    {certificate.issuer}
                  </p>

                  <div className="certificate-details">
                    {certificate.issueDate && (
                      <div className="certificate-detail">
                        <CalendarDays size={16} />

                        <span>
                          Issued{" "}
                          {new Date(
                            certificate.issueDate
                          ).toLocaleDateString("en-IN", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    {certificate.expiryDate && (
                      <div className="certificate-detail">
                        <CalendarDays size={16} />

                        <span>
                          Expires{" "}
                          {new Date(
                            certificate.expiryDate
                          ).toLocaleDateString("en-IN", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    {certificate.credentialId && (
                      <div className="certificate-detail">
                        <BadgeCheck size={16} />

                        <span>
                          ID: {certificate.credentialId}
                        </span>
                      </div>
                    )}
                  </div>

                  {certificate.skills.length > 0 && (
                    <div className="certificate-skills">
                      {certificate.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  )}

                  <div className="certificate-actions">
                    {certificate.credentialUrl && (
                      <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="certificate-view-button"
                      >
                        <ExternalLink size={16} />
                        View Certificate
                      </a>
                    )}

                    <button
                      type="button"
                      className="certificate-delete-button"
                      onClick={() =>
                        deleteCertificate(certificate.id)
                      }
                      aria-label={`Delete ${certificate.name}`}
                      title="Delete certificate"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* INFORMATION CARD */}
        <section className="certifications-tip-card">
          <div className="certifications-tip-icon">
            <BadgeCheck size={24} />
          </div>

          <div>
            <span>PROFILE TIP</span>

            <h2>Keep your credentials up to date</h2>

            <p>
              Add relevant certifications and include a verification
              link whenever one is available. This helps institutions
              and companies understand your learning journey.
            </p>
          </div>
        </section>

        {/* ADD CERTIFICATE MODAL */}
        {showForm && (
          <div className="certificate-modal-backdrop">
            <div className="certificate-modal">
              <div className="certificate-modal-header">
                <div>
                  <span>NEW CREDENTIAL</span>
                  <h2>Add Certificate</h2>
                </div>

                <button
                  type="button"
                  className="certificate-modal-close"
                  onClick={() => setShowForm(false)}
                  aria-label="Close"
                >
                  <X size={19} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="certificate-form-grid">

                  <div className="certificate-form-field full">
                    <label htmlFor="name">
                      Certificate Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. JavaScript Algorithms and Data Structures"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="certificate-form-field">
                    <label htmlFor="issuer">
                      Issuing Organization
                    </label>

                    <input
                      id="issuer"
                      name="issuer"
                      type="text"
                      placeholder="e.g. Coursera"
                      value={formData.issuer}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="certificate-form-field">
                    <label htmlFor="credentialId">
                      Credential ID
                    </label>

                    <input
                      id="credentialId"
                      name="credentialId"
                      type="text"
                      placeholder="Optional"
                      value={formData.credentialId}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="certificate-form-field">
                    <label htmlFor="issueDate">
                      Issue Date
                    </label>

                    <input
                      id="issueDate"
                      name="issueDate"
                      type="date"
                      value={formData.issueDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="certificate-form-field">
                    <label htmlFor="expiryDate">
                      Expiry Date
                    </label>

                    <input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="certificate-form-field full">
                    <label htmlFor="credentialUrl">
                      Credential / Verification URL
                    </label>

                    <input
                      id="credentialUrl"
                      name="credentialUrl"
                      type="url"
                      placeholder="https://..."
                      value={formData.credentialUrl}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="certificate-form-field full">
                    <label htmlFor="skills">
                      Skills Covered
                    </label>

                    <input
                      id="skills"
                      name="skills"
                      type="text"
                      placeholder="JavaScript, React, APIs"
                      value={formData.skills}
                      onChange={handleChange}
                    />

                    <small>
                      Separate multiple skills with commas.
                    </small>
                  </div>

                </div>

                <div className="certificate-form-actions">
                  <button
                    type="button"
                    className="certificate-cancel-button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="certificate-save-button"
                  >
                    <Plus size={17} />
                    Add Certificate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}