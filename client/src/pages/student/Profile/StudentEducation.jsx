import { useState } from "react";

import {
  BookOpen,
  Building2,
  CalendarDays,
  GraduationCap,
  MapPin,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import "./StudentEducation.css";

const currentYear = new Date().getFullYear();

const yearOptions = Array.from(
  { length: 16 },
  (_, index) => currentYear + 5 - index
);

const initialEducation = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  location: "",
  startYear: "",
  endYear: "",
};

export default function StudentEducation() {
  const [education, setEducation] = useState(null);

  const [formData, setFormData] = useState(
    initialEducation
  );

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const handleOpenAddForm = () => {
    setFormData(initialEducation);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = () => {
    if (!education) return;

    setFormData({
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      location: education.location,
      startYear: education.startYear,
      endYear: education.endYear,
    });

    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setFormData(initialEducation);
    setIsEditing(false);
    setIsFormOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.institution.trim() ||
      !formData.degree.trim() ||
      !formData.fieldOfStudy.trim() ||
      !formData.location.trim() ||
      !formData.startYear ||
      !formData.endYear
    ) {
      return;
    }

    setEducation({
      ...formData,
    });

    setFormData(initialEducation);
    setIsEditing(false);
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    setEducation(null);
    setFormData(initialEducation);
    setIsEditing(false);
    setIsFormOpen(false);
  };

  return (
    <div className="student-education-page">
      <main className="student-education-main">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="education-page-header">
          <div>
            <div className="education-eyebrow">
              PROFILE
            </div>

            <h1>Education</h1>

            <p>
              Add and manage your academic background,
              qualifications and educational achievements.
            </p>
          </div>

          <button
            type="button"
            className="education-add-button"
            onClick={handleOpenAddForm}
          >
            <Plus size={19} />
            Add Education
          </button>
        </div>

        {/* =================================================
            CONTENT GRID
        ================================================= */}

        <div className="education-content-grid">
          {/* =================================================
              LEFT MAIN CARD
          ================================================= */}

          <section className="education-main-card">
            <div className="education-card-header">
              <div>
                <span>ACADEMIC BACKGROUND</span>

                <h2>Your Education</h2>
              </div>

              <GraduationCap size={27} />
            </div>

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!education && (
              <div className="education-empty-state">
                <div className="education-empty-icon">
                  <GraduationCap size={34} />
                </div>

                <h3>
                  No education added yet
                </h3>

                <p>
                  Add your college, degree, course and
                  academic details to complete your profile.
                </p>

                <button
                  type="button"
                  className="education-empty-button"
                  onClick={handleOpenAddForm}
                >
                  <Plus size={19} />
                  Add Your Education
                </button>
              </div>
            )}

            {/* =================================================
                EDUCATION CARD
            ================================================= */}

            {education && (
              <article className="education-entry-card">
                <div className="education-entry-icon">
                  <GraduationCap size={24} />
                </div>

                <div className="education-entry-content">
                  <div className="education-entry-heading">
                    <div>
                      <span className="education-entry-label">
                        EDUCATION
                      </span>

                      <h3>
                        {education.degree}
                      </h3>

                      <p>
                        {education.institution}
                      </p>
                    </div>

                    <div className="education-entry-actions">
                      <button
                        type="button"
                        className="education-icon-button"
                        onClick={handleOpenEditForm}
                        aria-label="Edit education"
                        title="Edit education"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="education-icon-button danger"
                        onClick={handleDelete}
                        aria-label="Delete education"
                        title="Delete education"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="education-entry-details">
                    <span>
                      <BookOpen size={15} />
                      {education.fieldOfStudy}
                    </span>

                    <span>
                      <MapPin size={15} />
                      {education.location}
                    </span>

                    <span>
                      <CalendarDays size={15} />
                      {education.startYear} -{" "}
                      {education.endYear}
                    </span>
                  </div>
                </div>
              </article>
            )}
          </section>

          {/* =================================================
              RIGHT INFO CARD
          ================================================= */}

          <aside className="education-info-card">
            <div className="education-info-icon">
              <BookOpen size={25} />
            </div>

            <span>
              PROFILE TIP
            </span>

            <h3>
              Keep your academic information updated
            </h3>

            <p>
              A complete education profile helps institutions
              and companies understand your academic background.
            </p>
          </aside>
        </div>

        {/* =================================================
            ADD / EDIT EDUCATION FORM
        ================================================= */}

        {isFormOpen && (
          <section className="education-form-card">
            <div className="education-form-header">
              <div>
                <span>EDUCATION DETAILS</span>

                <h2>
                  {isEditing
                    ? "Edit your academic information"
                    : "Add your academic information"}
                </h2>
              </div>

              <div className="education-form-icon">
                {isEditing ? (
                  <Pencil size={20} />
                ) : (
                  <Plus size={20} />
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="education-form-grid">
                {/* Institution */}

                <div className="education-field">
                  <label htmlFor="institution">
                    Institution Name
                  </label>

                  <div className="education-input">
                    <Building2 size={19} />

                    <input
                      id="institution"
                      name="institution"
                      type="text"
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder="Enter college or institution name"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                {/* Degree */}

                <div className="education-field">
                  <label htmlFor="degree">
                    Degree / Course
                  </label>

                  <div className="education-input">
                    <GraduationCap size={19} />

                    <input
                      id="degree"
                      name="degree"
                      type="text"
                      value={formData.degree}
                      onChange={handleChange}
                      placeholder="Example: BCA"
                    />
                  </div>
                </div>

                {/* Field of Study */}

                <div className="education-field">
                  <label htmlFor="fieldOfStudy">
                    Field of Study
                  </label>

                  <div className="education-input">
                    <BookOpen size={19} />

                    <input
                      id="fieldOfStudy"
                      name="fieldOfStudy"
                      type="text"
                      value={formData.fieldOfStudy}
                      onChange={handleChange}
                      placeholder="Example: Computer Applications"
                    />
                  </div>
                </div>

                {/* Location */}

                <div className="education-field">
                  <label htmlFor="location">
                    Location
                  </label>

                  <div className="education-input">
                    <MapPin size={19} />

                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State"
                    />
                  </div>
                </div>

                {/* Start Year */}

                <div className="education-field">
                  <label htmlFor="startYear">
                    Start Year
                  </label>

                  <div className="education-input">
                    <CalendarDays size={19} />

                    <select
                      id="startYear"
                      name="startYear"
                      value={formData.startYear}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select start year
                      </option>

                      {yearOptions.map((year) => (
                        <option
                          key={year}
                          value={year}
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* End Year */}

                <div className="education-field">
                  <label htmlFor="endYear">
                    End Year
                  </label>

                  <div className="education-input">
                    <CalendarDays size={19} />

                    <select
                      id="endYear"
                      name="endYear"
                      value={formData.endYear}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select graduation year
                      </option>

                      {yearOptions.map((year) => (
                        <option
                          key={year}
                          value={year}
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* =================================================
                  FORM ACTIONS
              ================================================= */}

              <div className="education-form-actions">
                <button
                  type="button"
                  className="education-cancel-button"
                  onClick={handleCancel}
                >
                  <X size={16} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="education-save-button"
                >
                  <Save size={16} />

                  {isEditing
                    ? "Update Education"
                    : "Save Education"}
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}