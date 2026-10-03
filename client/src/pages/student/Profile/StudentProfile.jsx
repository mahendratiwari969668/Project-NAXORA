import { useState } from "react";

import {
  CheckCircle2,
  ChevronRight,
  Code2,
  FileText,
  GraduationCap,
  Pencil,
  Award,
  BarChart3,
  UserRound,
  FolderKanban,
  MapPin,
  Mail,
  Phone,
  Globe,
  Save,
  X,
  Link2,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./StudentProfile.css";


/* =========================================================
   PROFILE SECTIONS
   ========================================================= */

const profileSections = [
  {
    label: "Personal Info",
    icon: UserRound,
    to: "/student/profile",
    end: true,
  },
  {
    label: "Education",
    icon: GraduationCap,
    to: "/student/education",
  },
  {
    label: "Skills",
    icon: BarChart3,
    to: "/student/skills",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    to: "/student/projects",
  },
  {
    label: "Certifications",
    icon: Award,
    to: "/student/certifications",
  },
  {
    label: "Resume",
    icon: FileText,
    to: "/student/resume",
  },
];


/* =========================================================
   INITIAL PROFILE
   ========================================================= */

const initialProfile = {
  fullName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",
};


export default function StudentProfile() {

  /* =======================================================
     PROFILE STATE
  ======================================================= */

  const [profile, setProfile] = useState(initialProfile);

  const [editProfile, setEditProfile] =
    useState(initialProfile);

  const [isEditing, setIsEditing] =
    useState(false);


  /* =======================================================
     EDIT PROFILE
  ======================================================= */

  const handleEdit = () => {
    setEditProfile(profile);
    setIsEditing(true);
  };


  /* =======================================================
     CANCEL EDIT
  ======================================================= */

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };


  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setEditProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  const handleSave = (event) => {
    event.preventDefault();

    setProfile(editProfile);
    setIsEditing(false);
  };


  /* =======================================================
     DISPLAY VALUE
  ======================================================= */

  const displayValue = (value) => {
    return value?.trim()
      ? value
      : "Not added yet";
  };


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="student-profile-page">

      <main className="student-profile-main">

        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <section className="profile-page-heading">

          <div>

            <span className="profile-page-eyebrow">
              PROFILE
            </span>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your personal information and showcase
              your skills.
            </p>

          </div>


          <div className="profile-status">
            <CheckCircle2 size={16} />

            <span>
              Profile workspace
            </span>
          </div>

        </section>


        {/* =================================================
            PROFILE WORKSPACE
        ================================================= */}

        <section className="profile-workspace">

          <div className="profile-content">

          {/* =================================================
              PROFILE CONTENT
          ================================================= */}


            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <article className="personal-information-card">

              {/* =================================================
                  CARD HEADER
              ================================================= */}

              <div className="personal-card-header">

                <div>

                  <span>
                    PERSONAL INFORMATION
                  </span>

                  <h2>
                    Personal Information
                  </h2>

                </div>


                {!isEditing && (
                  <button
                    type="button"
                    className="profile-edit-button"
                    onClick={handleEdit}
                  >

                    <Pencil size={16} />

                    Edit

                  </button>
                )}

              </div>


              {/* =================================================
                  EDIT FORM
              ================================================= */}

              {isEditing ? (

                <form
                  className="profile-edit-form"
                  onSubmit={handleSave}
                >

                  <div className="profile-form-grid">


                    {/* FULL NAME */}

                    <div className="profile-form-field">

                      <label htmlFor="fullName">
                        Full Name
                      </label>

                      <div className="profile-input-wrapper">

                        <UserRound size={17} />

                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={editProfile.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />

                      </div>

                    </div>


                    {/* DATE OF BIRTH */}

                    <div className="profile-form-field">

                      <label htmlFor="dateOfBirth">
                        Date of Birth
                      </label>

                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={editProfile.dateOfBirth}
                        onChange={handleChange}
                      />

                    </div>


                    {/* EMAIL */}

                    <div className="profile-form-field">

                      <label htmlFor="email">
                        Email
                      </label>

                      <div className="profile-input-wrapper">

                        <Mail size={17} />

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={editProfile.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />

                      </div>

                    </div>


                    {/* PHONE */}

                    <div className="profile-form-field">

                      <label htmlFor="phone">
                        Phone
                      </label>

                      <div className="profile-input-wrapper">

                        <Phone size={17} />

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={editProfile.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                        />

                      </div>

                    </div>


                    {/* LOCATION */}

                    <div className="profile-form-field">

                      <label htmlFor="location">
                        Location
                      </label>

                      <div className="profile-input-wrapper">

                        <MapPin size={17} />

                        <input
                          id="location"
                          name="location"
                          type="text"
                          value={editProfile.location}
                          onChange={handleChange}
                          placeholder="City, State"
                        />

                      </div>

                    </div>


                    {/* LINKEDIN */}

                    <div className="profile-form-field">

                      <label htmlFor="linkedin">
                        LinkedIn
                      </label>

                      <div className="profile-input-wrapper">

                        <Link2 size={17} />

                        <input
                          id="linkedin"
                          name="linkedin"
                          type="url"
                          value={editProfile.linkedin}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/..."
                        />

                      </div>

                    </div>


                    {/* GITHUB */}

                    <div className="profile-form-field">

                      <label htmlFor="github">
                        GitHub
                      </label>

                      <div className="profile-input-wrapper">

                        <Code2 size={17} />

                        <input
                          id="github"
                          name="github"
                          type="url"
                          value={editProfile.github}
                          onChange={handleChange}
                          placeholder="https://github.com/..."
                        />

                      </div>

                    </div>


                    {/* PORTFOLIO */}

                    <div className="profile-form-field">

                      <label htmlFor="portfolio">
                        Portfolio
                      </label>

                      <div className="profile-input-wrapper">

                        <Globe size={17} />

                        <input
                          id="portfolio"
                          name="portfolio"
                          type="url"
                          value={editProfile.portfolio}
                          onChange={handleChange}
                          placeholder="https://yourportfolio.com"
                        />

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      FORM ACTIONS
                  ================================================= */}

                  <div className="profile-form-actions">

                    <button
                      type="button"
                      className="profile-cancel-button"
                      onClick={handleCancel}
                    >

                      <X size={16} />

                      Cancel

                    </button>


                    <button
                      type="submit"
                      className="profile-save-button"
                    >

                      <Save size={16} />

                      Save Changes

                    </button>

                  </div>

                </form>

              ) : (

                <>

                  {/* =================================================
                      PROFILE INTRO
                  ================================================= */}

                  <div className="personal-intro">

                    <div className="large-profile-avatar">
                      <UserRound size={40} />
                    </div>


                    <div className="personal-intro-content">

                      <h3>

                        {displayValue(
                          profile.fullName
                        ) === "Not added yet"
                          ? "Student Name"
                          : profile.fullName}

                      </h3>


                      <p>
                        BCA Student
                      </p>


                      <div className="intro-contact">

                        <span>

                          <Mail size={15} />

                          {displayValue(
                            profile.email
                          ) === "Not added yet"
                            ? "Add your email"
                            : profile.email}

                        </span>


                        <span>

                          <Phone size={15} />

                          {displayValue(
                            profile.phone
                          ) === "Not added yet"
                            ? "Add your phone"
                            : profile.phone}

                        </span>


                        <span>

                          <MapPin size={15} />

                          {displayValue(
                            profile.location
                          ) === "Not added yet"
                            ? "Add your location"
                            : profile.location}

                        </span>

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      PROFILE DETAILS
                  ================================================= */}

                  <div className="profile-details-grid">

                    <ProfileDetail
                      label="Full Name"
                      value={displayValue(
                        profile.fullName
                      )}
                    />

                    <ProfileDetail
                      label="Date of Birth"
                      value={displayValue(
                        profile.dateOfBirth
                      )}
                    />

                    <ProfileDetail
                      label="Email"
                      value={displayValue(
                        profile.email
                      )}
                    />

                    <ProfileDetail
                      label="Phone"
                      value={displayValue(
                        profile.phone
                      )}
                    />

                    <ProfileDetail
                      label="Location"
                      value={displayValue(
                        profile.location
                      )}
                    />

                    <ProfileDetail
                      label="LinkedIn"
                      value={displayValue(
                        profile.linkedin
                      )}
                      icon={<Link2 size={15} />}
                    />

                    <ProfileDetail
                      label="GitHub"
                      value={displayValue(
                        profile.github
                      )}
                      icon={<Code2 size={15} />}
                    />

                    <ProfileDetail
                      label="Portfolio"
                      value={displayValue(
                        profile.portfolio
                      )}
                      icon={<Globe size={15} />}
                    />

                  </div>

                </>

              )}


              {/* =================================================
                  EDUCATION
              ================================================= */}

              <div className="profile-preview-section">

                <div className="preview-section-heading">

                  <div>

                    <span>
                      EDUCATION
                    </span>

                    <h3>
                      Education
                    </h3>

                  </div>


                  <NavLink to="/student/education">
                    Add
                  </NavLink>

                </div>


                <div className="profile-empty-state">

                  <GraduationCap size={23} />

                  <div>

                    <strong>
                      Add your education details
                    </strong>

                    <p>
                      College, course, department and
                      graduation information will appear here.
                    </p>

                  </div>

                </div>

              </div>


              {/* =================================================
                  SKILLS
              ================================================= */}

              <div className="profile-preview-section">

                <div className="preview-section-heading">

                  <div>

                    <span>
                      SKILLS
                    </span>

                    <h3>
                      Your Skills
                    </h3>

                  </div>


                  <NavLink to="/student/skills">
                    Add
                  </NavLink>

                </div>


                <div className="profile-skills-empty">

                  <BarChart3 size={22} />

                  <span>
                    Add your technical and professional skills
                    to build your skill profile.
                  </span>

                </div>

              </div>


              {/* =================================================
                  PROJECTS
              ================================================= */}

              <div className="profile-preview-section">

                <div className="preview-section-heading">

                  <div>

                    <span>
                      PROJECTS
                    </span>

                    <h3>
                      Projects
                    </h3>

                  </div>


                  <NavLink to="/student/projects">
                    Add
                  </NavLink>

                </div>


                <div className="profile-empty-state">

                  <FolderKanban size={23} />

                  <div>

                    <strong>
                      Showcase your projects
                    </strong>

                    <p>
                      Add academic, personal or professional
                      projects to strengthen your profile.
                    </p>

                  </div>

                </div>

              </div>


              {/* =================================================
                  CERTIFICATIONS PREVIEW
              ================================================= */}

              <div className="profile-preview-section">

                <div className="preview-section-heading">

                  <div>

                    <span>
                      CERTIFICATIONS
                    </span>

                    <h3>
                      Certifications
                    </h3>

                  </div>


                  <NavLink to="/student/certifications">
                    Add
                  </NavLink>

                </div>


                <div className="profile-empty-state">

                  <Award size={23} />

                  <div>

                    <strong>
                      Add your certifications
                    </strong>

                    <p>
                      Showcase certificates and credentials
                      you've earned.
                    </p>

                  </div>

                </div>

              </div>


              {/* =================================================
                  RESUME PREVIEW
              ================================================= */}

              <div className="profile-preview-section">

                <div className="preview-section-heading">

                  <div>

                    <span>
                      RESUME
                    </span>

                    <h3>
                      Professional Resume
                    </h3>

                  </div>


                  <NavLink to="/student/resume">
                    Manage
                  </NavLink>

                </div>


                <div className="profile-empty-state">

                  <FileText size={23} />

                  <div>

                    <strong>
                      Build your professional resume
                    </strong>

                    <p>
                      Upload and manage your resume for
                      internship and job opportunities.
                    </p>

                  </div>

                </div>

              </div>

            </article>

          </div>

        </section>

      </main>

    </div>
  );
}


/* =========================================================
   PROFILE DETAIL COMPONENT
   ========================================================= */

function ProfileDetail({
  label,
  value,
  icon,
}) {

  return (
    <div className="profile-detail">

      <span>
        {label}
      </span>

      <strong>

        {icon}

        {value}

      </strong>

    </div>
  );
}