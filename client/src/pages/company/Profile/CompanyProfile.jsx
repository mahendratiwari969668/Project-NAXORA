import {
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileImage,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  Upload,
  UserRound,
 
  Users,
  X,
} from "lucide-react";

import "./CompanyProfile.css";
import { useState } from "react";

const initialCompany = {
  logo: "",
  name: "TechNova",
  tagline: "Innovating Today for a Better Tomorrow",
  description:
    "TechNova is a technology company focused on building scalable software products and solutions. We work on modern web, cloud and AI-powered applications to solve real-world problems.",
  industry: "Information Technology",
  companySize: "201 - 500 employees",
  foundedYear: "2020",
  website: "https://technova.com",
  headOffice: "Bengaluru, Karnataka, India",
  workLocations: "Bengaluru, Mumbai (Hybrid)",
  email: "hr@technova.com",
  phone: "+91 98765 43210",
  address: "123 Tech Park, Outer Ring Road, Bengaluru, Karnataka - 560103",
};

const tabs = [
  "Overview",
  "Details",
  "Team Members",
  "Media",
  "Verification",
];

export default function CompanyProfile() {
  const [company, setCompany] = useState(initialCompany);
  const [draft, setDraft] = useState(initialCompany);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState("");
  const [logoFileName, setLogoFileName] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDraft((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setLogoPreview((current) => {
      if (current && current.startsWith("blob:")) {
        URL.revokeObjectURL(current);
      }

      return previewUrl;
    });

    setLogoFileName(file.name);
  };

  const handleEdit = () => {
    setDraft(company);
    setLogoPreview(company.logo || "");
    setLogoFileName("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(company);
    setLogoPreview(company.logo || "");
    setLogoFileName("");
    setIsEditing(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    setCompany({
      ...draft,
      logo: logoPreview || draft.logo || "",
    });

    setLogoFileName("");
    setIsEditing(false);
  };

  return (
    <main className="company-profile-page">
      {/* PAGE HEADER */}
      <div className="company-profile-page-header">
        <div>
          <p className="company-profile-eyebrow">
            COMPANY PROFILE
          </p>

          <h1>Company Profile</h1>

          <p>
            Manage your company's public information,
            contact details and verification status.
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            className="company-profile-edit-button"
            onClick={handleEdit}
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        ) : (
          <div className="company-profile-edit-actions">
            <button
              type="button"
              className="company-profile-cancel-button"
              onClick={handleCancel}
            >
              <X size={17} />
              Cancel
            </button>

            <button
              type="submit"
              form="company-profile-form"
              className="company-profile-save-button"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* COMPANY HERO */}
      <section className="company-profile-hero">
        <div className="company-profile-company-logo">
          {company.logo ? (
            <img
              src={company.logo}
              alt={`${company.name} logo`}
            />
          ) : (
            <Building2 size={34} strokeWidth={1.7} />
          )}
        </div>

        <div className="company-profile-company-main">
          <div className="company-profile-company-title">
            <h2>{company.name}</h2>

            <span className="company-profile-verified">
              <BadgeCheck size={15} />
              Verified
            </span>
          </div>

          <p className="company-profile-tagline">
            {company.tagline}
          </p>

          <p className="company-profile-description">
            {company.description}
          </p>
        </div>
      </section>

      {/* TABS */}
      <div className="company-profile-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={
              activeTab === tab
                ? "company-profile-tab active"
                : "company-profile-tab"
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === "Overview" && (
        <>
          {isEditing ? (
            <form
              id="company-profile-form"
              className="company-profile-edit-form"
              onSubmit={handleSave}
            >
              <section className="company-profile-card company-profile-edit-card">
                <div className="company-profile-card-heading">
                  <div>
                    <h3>Company Information</h3>
                    <p>
                      Update the information visible on your
                      company profile.
                    </p>
                  </div>
                </div>

                <div className="company-profile-form-grid">
                  <div className="company-profile-form-group">
                    <label htmlFor="name">Company Name</label>
                    <input
                      id="name"
                      name="name"
                      value={draft.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="company-profile-form-group">
                    <label htmlFor="tagline">Tagline</label>
                    <input
                      id="tagline"
                      name="tagline"
                      value={draft.tagline}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group full">
                    <label htmlFor="description">
                      Company Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      value={draft.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group">
                    <label htmlFor="industry">Industry</label>
                    <input
                      id="industry"
                      name="industry"
                      value={draft.industry}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group">
                    <label htmlFor="companySize">
                      Company Size
                    </label>
                    <input
                      id="companySize"
                      name="companySize"
                      value={draft.companySize}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group">
                    <label htmlFor="foundedYear">
                      Founded Year
                    </label>
                    <input
                      id="foundedYear"
                      name="foundedYear"
                      value={draft.foundedYear}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      value={draft.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group">
                    <label htmlFor="headOffice">
                      Head Office
                    </label>
                    <input
                      id="headOffice"
                      name="headOffice"
                      value={draft.headOffice}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group">
                    <label htmlFor="workLocations">
                      Work Locations
                    </label>
                    <input
                      id="workLocations"
                      name="workLocations"
                      value={draft.workLocations}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group">
                    <label htmlFor="email">Official Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={draft.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      value={draft.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group full">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      value={draft.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="company-profile-form-group full">
                    <label>Company Logo</label>

                    <div className="company-profile-logo-editor">
                      <div className="company-profile-logo-editor-preview">
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Company logo preview"
                          />
                        ) : (
                          <Building2 size={30} strokeWidth={1.7} />
                        )}
                      </div>

                      <div className="company-profile-logo-editor-content">
                        <strong>Upload company logo</strong>
                        <span>
                          PNG, JPG, JPEG or WEBP · Maximum 5 MB
                        </span>

                        <label
                          htmlFor="companyLogo"
                          className="company-profile-logo-upload"
                        >
                          <Upload size={15} />
                          Choose Logo
                        </label>

                        <input
                          id="companyLogo"
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/webp"
                          onChange={handleLogoChange}
                          hidden
                        />

                        {logoFileName && (
                          <small>
                            Selected: {logoFileName}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          ) : (
            <div className="company-profile-overview-grid">
              {/* BASIC INFORMATION */}
              <section className="company-profile-card">
                <div className="company-profile-card-heading">
                  <div>
                    <h3>Basic Information</h3>
                    <p>Company overview and organization details.</p>
                  </div>
                </div>

                <div className="company-profile-info-list">
                  <InfoRow
                    icon={<Building2 size={17} />}
                    label="Industry"
                    value={company.industry}
                  />

                  <InfoRow
                    icon={<Users size={17} />}
                    label="Company Size"
                    value={company.companySize}
                  />

                  <InfoRow
                    icon={<CalendarDays size={17} />}
                    label="Founded Year"
                    value={company.foundedYear}
                  />

                  <InfoRow
                    icon={<Globe size={17} />}
                    label="Website"
                    value={company.website}
                    link
                  />

                  <InfoRow
                    icon={<MapPin size={17} />}
                    label="Head Office"
                    value={company.headOffice}
                  />

                  <InfoRow
                    icon={<MapPin size={17} />}
                    label="Work Locations"
                    value={company.workLocations}
                  />
                </div>
              </section>

              {/* RIGHT COLUMN */}
              <div className="company-profile-right-column">
                {/* CONTACT */}
                <section className="company-profile-card">
                  <div className="company-profile-card-heading">
                    <div>
                      <h3>Contact Information</h3>
                      <p>Official company contact details.</p>
                    </div>
                  </div>

                  <div className="company-profile-info-list">
                    <InfoRow
                      icon={<Mail size={17} />}
                      label="Official Email"
                      value={company.email}
                      link
                    />

                    <InfoRow
                      icon={<Phone size={17} />}
                      label="Phone"
                      value={company.phone}
                    />

                    <InfoRow
                      icon={<MapPin size={17} />}
                      label="Address"
                      value={company.address}
                    />
                  </div>
                </section>

                {/* STATUS */}
                <section className="company-profile-card">
                  <div className="company-profile-card-heading">
                    <div>
                      <h3>Company Status</h3>
                      <p>Verification and account status.</p>
                    </div>
                  </div>

                  <div className="company-profile-status-list">
                    <StatusItem text="Email Verified" />
                    <StatusItem text="Company Documents Verified" />
                    <StatusItem text="Approved by Admin" />
                  </div>
                </section>
              </div>
            </div>
          )}
        </>
      )}

      {/* DETAILS */}
      {activeTab === "Details" && (
        <section className="company-profile-card company-profile-details-tab">
          <div className="company-profile-card-heading">
            <div>
              <h3>Company Details</h3>
              <p>Key organization details and operating information.</p>
            </div>
          </div>

          <div className="company-profile-detail-grid">
            <DetailCard
              icon={<Building2 size={18} />}
              label="Industry"
              value={company.industry}
            />
            <DetailCard
              icon={<Users size={18} />}
              label="Company Size"
              value={company.companySize}
            />
            <DetailCard
              icon={<CalendarDays size={18} />}
              label="Founded"
              value={company.foundedYear}
            />
            <DetailCard
              icon={<MapPin size={18} />}
              label="Head Office"
              value={company.headOffice}
            />
            <DetailCard
              icon={<MapPin size={18} />}
              label="Work Locations"
              value={company.workLocations}
            />
            <DetailCard
              icon={<Globe size={18} />}
              label="Website"
              value={company.website}
              link
            />
          </div>
        </section>
      )}

      {/* TEAM MEMBERS */}
      {activeTab === "Team Members" && (
        <section className="company-profile-card company-profile-team-tab">
          <div className="company-profile-card-heading">
            <div>
              <h3>Team Members</h3>
              <p>Authorized company contacts and recruitment team members.</p>
            </div>
          </div>

          <div className="company-profile-team-list">
            <TeamMember
              initials="AS"
              name="Amit Sharma"
              role="HR & Recruitment Lead"
              email={company.email}
              status="Active"
            />
            <TeamMember
              initials="RK"
              name="Riya Kapoor"
              role="Talent Acquisition Manager"
              email="talent@technova.com"
              status="Active"
            />
            <TeamMember
              initials="VN"
              name="Vikram Nair"
              role="Industry Relations"
              email="relations@technova.com"
              status="Active"
            />
          </div>
        </section>
      )}

      {/* MEDIA */}
      {activeTab === "Media" && (
        <section className="company-profile-card company-profile-media-tab">
          <div className="company-profile-card-heading">
            <div>
              <h3>Company Media</h3>
              <p>Brand assets currently associated with this company profile.</p>
            </div>
          </div>

          <div className="company-profile-media-grid">
            <div className="company-profile-media-preview">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                />
              ) : (
                <Building2 size={42} strokeWidth={1.6} />
              )}
            </div>

            <div className="company-profile-media-info">
              <span className="company-profile-media-label">
                COMPANY LOGO
              </span>
              <h3>{company.name}</h3>
              <p>
                This logo is shown on your company profile and can be
                replaced from Edit Profile.
              </p>

              <button
                type="button"
                className="company-profile-media-edit"
                onClick={handleEdit}
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            </div>
          </div>
        </section>
      )}

      {/* VERIFICATION */}
      {activeTab === "Verification" && (
        <section className="company-profile-card company-profile-verification-card">
          <div className="company-profile-card-heading">
            <div>
              <h3>Verification</h3>
              <p>
                Your company verification status and submitted
                documents.
              </p>
            </div>
          </div>

          <div className="company-profile-verification-summary">
            <div className="company-profile-verification-summary-icon">
              <ShieldCheck size={24} />
            </div>

            <div>
              <strong>Company profile verified</strong>
              <p>
                Your core company information has passed the available
                verification checks.
              </p>
            </div>

            <span className="company-profile-verification-badge">
              Verified
            </span>
          </div>

          <div className="company-profile-verification-items">
            <VerificationItem
              title="Email Verification"
              description={`Official company email ${company.email} has been verified.`}
            />

            <VerificationItem
              title="Company Documents"
              description="Company registration documents have been verified."
            />

            <VerificationItem
              title="Admin Approval"
              description="Company profile has been approved by NEXORA administration."
            />
          </div>
        </section>
      )}
    </main>
  );
}

function InfoRow({ icon, label, value, link = false }) {
  return (
    <div className="company-profile-info-row">
      <span className="company-profile-info-icon">
        {icon}
      </span>

      <div className="company-profile-info-content">
        <span className="company-profile-info-label">
          {label}
        </span>

        {link ? (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="company-profile-info-value company-profile-link"
          >
            {value}
          </a>
        ) : (
          <span className="company-profile-info-value">
            {value}
          </span>
        )}
      </div>
    </div>
  );
}

function StatusItem({ text }) {
  return (
    <div className="company-profile-status-item">
      <CheckCircle2 size={18} />
      <span>{text}</span>
    </div>
  );
}

function DetailCard({ icon, label, value, link = false }) {
  return (
    <div className="company-profile-detail-card">
      <div className="company-profile-detail-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>

        {link ? (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="company-profile-link"
          >
            {value}
          </a>
        ) : (
          <strong>{value}</strong>
        )}
      </div>
    </div>
  );
}

function TeamMember({ initials, name, role, email, status }) {
  return (
    <article className="company-profile-team-member">
      <div className="company-profile-team-avatar">
        {initials}
      </div>

      <div className="company-profile-team-info">
        <strong>{name}</strong>
        <span>{role}</span>

        <a
          href={`mailto:${email}`}
          className="company-profile-link"
        >
          {email}
        </a>
      </div>

      <span className="company-profile-team-status">
        <CheckCircle2 size={13} />
        {status}
      </span>
    </article>
  );
}

function VerificationItem({ title, description }) {
  return (
    <div className="company-profile-verification-item">
      <div className="company-profile-verification-icon">
        <CheckCircle2 size={19} />
      </div>

      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}