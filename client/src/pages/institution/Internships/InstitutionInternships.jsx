import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Plus,
  X,
  ChevronDown,
  Clock3,
  MapPin,
  Search,
} from "lucide-react";

import "./InstitutionInternships.css";

const opportunities = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechNova",
    location: "Remote",
    duration: "3 months",
    stipend: "₹15,000/mo",
    deadline: "18 Oct 2025",
    applications: 84,
    status: "Open",
    skills: ["React", "JavaScript", "Git", "HTML", "CSS"],
    color: "blue",
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "CloudSoft",
    location: "Bengaluru",
    duration: "6 months",
    stipend: "₹20,000/mo",
    deadline: "22 Oct 2025",
    applications: 56,
    status: "Open",
    skills: ["Node.js", "MongoDB", "Express", "API"],
    color: "navy",
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataTech",
    location: "Hybrid",
    duration: "3 months",
    stipend: "₹18,000/mo",
    deadline: "25 Oct 2025",
    applications: 38,
    status: "Open",
    skills: ["Python", "SQL", "Data Analytics", "Excel"],
    color: "cyan",
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    company: "PixelWorks",
    location: "Remote",
    duration: "3 months",
    stipend: "₹12,000/mo",
    deadline: "28 Oct 2025",
    applications: 31,
    status: "Open",
    skills: ["Figma", "UI Design", "UX Research"],
    color: "violet",
  },
  {
    id: 5,
    title: "Cloud Engineering Intern",
    company: "SkyLabs",
    location: "Hyderabad",
    duration: "6 months",
    stipend: "₹22,000/mo",
    deadline: "30 Oct 2025",
    applications: 27,
    status: "Closing Soon",
    skills: ["AWS", "Docker", "Linux", "Cloud"],
    color: "orange",
  },
];

const companies = [
  "All Companies",
  "TechNova",
  "CloudSoft",
  "DataTech",
  "PixelWorks",
  "SkyLabs",
];

const locations = [
  "All Locations",
  "Remote",
  "Bengaluru",
  "Hybrid",
  "Hyderabad",
];

const skillFilters = [
  "All Skills",
  "React",
  "Python",
  "Node.js",
  "AWS",
  "Figma",
];

const statuses = [
  "All Status",
  "Open",
  "Closing Soon",
];

export default function InstitutionInternships() {
  const [activeTab, setActiveTab] = useState("opportunities");

  const [company, setCompany] = useState("All Companies");
  const [location, setLocation] = useState("All Locations");
  const [skill, setSkill] = useState("All Skills");
  const [status, setStatus] = useState("All Status");
  const [search, setSearch] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showCreateDrive, setShowCreateDrive] = useState(false);
  const [createdDrives, setCreatedDrives] = useState([]);
  const [createDriveForm, setCreateDriveForm] = useState({
    title: "",
    company: "",
    location: "Remote",
    duration: "",
    stipend: "",
    deadline: "",
    skills: "",
  });

  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...createdDrives, ...opportunities].filter((item) => {
      const matchesCompany =
        company === "All Companies" ||
        item.company === company;

      const matchesLocation =
        location === "All Locations" ||
        item.location === location;

      const matchesSkill =
        skill === "All Skills" ||
        item.skills.includes(skill);

      const matchesStatus =
        status === "All Status" ||
        item.status === status;

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query) ||
        item.skills.some((itemSkill) =>
          itemSkill.toLowerCase().includes(query)
        );

      return (
        matchesCompany &&
        matchesLocation &&
        matchesSkill &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    company,
    location,
    skill,
    status,
    search,
    createdDrives,
  ]);

  const handleCreateDriveChange = (field, value) => {
    setCreateDriveForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreateDrive = (event) => {
    event.preventDefault();

    const skills = createDriveForm.skills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (
      !createDriveForm.title.trim() ||
      !createDriveForm.company.trim() ||
      !createDriveForm.duration.trim() ||
      !createDriveForm.stipend.trim() ||
      !createDriveForm.deadline.trim()
    ) {
      return;
    }

    const newDrive = {
      id: `created-${Date.now()}`,
      title: createDriveForm.title.trim(),
      company: createDriveForm.company.trim(),
      location: createDriveForm.location,
      duration: createDriveForm.duration.trim(),
      stipend: createDriveForm.stipend.trim(),
      deadline: createDriveForm.deadline.trim(),
      applications: 0,
      status: "Open",
      skills: skills.length ? skills : ["General"],
      color: "blue",
    };

    setCreatedDrives((current) => [newDrive, ...current]);
    setCreateDriveForm({
      title: "",
      company: "",
      location: "Remote",
      duration: "",
      stipend: "",
      deadline: "",
      skills: "",
    });
    setShowCreateDrive(false);
    setActiveTab("opportunities");
  };

  return (
    <div className="institution-internships-page">

      {/* =========================
          TABS
      ========================== */}

      <nav className="institution-internship-tabs">

        <button
          type="button"
          className={
            activeTab === "opportunities"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("opportunities")
          }
        >
          Opportunities
        </button>

        <button
          type="button"
          className={
            activeTab === "applications"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("applications")
          }
        >
          Student Applications
        </button>

        <button
          type="button"
          className={
            activeTab === "tracking"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("tracking")
          }
        >
          Internship Tracking
        </button>

      </nav>


      {/* =========================
          OPPORTUNITIES
      ========================== */}

      {activeTab === "opportunities" && (
        <>
          <section className="institution-internship-header">

            <div>
              <p className="institution-internship-eyebrow">
                INTERNSHIPS
              </p>

              <h1>Internship Opportunities</h1>

              <p>
                View and manage available internship
                opportunities from connected companies.
              </p>
            </div>

            <button
              type="button"
              className="institution-create-drive-button"
              onClick={() => setShowCreateDrive(true)}
            >
              <Plus size={16} />
              Create Drive
            </button>

          </section>


          {/* FILTERS */}

          <section className="institution-internship-toolbar">

            <FilterSelect
              value={company}
              onChange={setCompany}
              options={companies}
            />

            <FilterSelect
              value={location}
              onChange={setLocation}
              options={locations}
            />

            <FilterSelect
              value={skill}
              onChange={setSkill}
              options={skillFilters}
            />

            <FilterSelect
              value={status}
              onChange={setStatus}
              options={statuses}
            />

            <div className="institution-internship-search">
              <Search size={16} />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search opportunities..."
              />
            </div>

          </section>


          {/* OPPORTUNITY LIST */}

          <section className="institution-opportunity-list">

            {filteredOpportunities.length > 0 ? (
              filteredOpportunities.map((item) => (
                <article
                  className="institution-opportunity-card"
                  key={item.id}
                >

                  <div
                    className={`institution-company-icon ${item.color}`}
                  >
                    <BriefcaseBusiness size={21} />
                  </div>


                  <div className="institution-opportunity-main">

                    <div className="institution-opportunity-title-row">
                      <div>
                        <h2>{item.title}</h2>

                        <div className="institution-opportunity-company">
                          <span>
                            <BriefcaseBusiness size={12} />
                            {item.company}
                          </span>

                          <span>
                            <MapPin size={12} />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`institution-opportunity-status ${
                          item.status === "Open"
                            ? "open"
                            : "closing"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>


                    {/* SKILLS */}

                    <div className="institution-opportunity-skills">
                      {item.skills.map((itemSkill) => (
                        <span key={itemSkill}>
                          {itemSkill}
                        </span>
                      ))}
                    </div>


                    {/* META */}

                    <div className="institution-opportunity-meta">

                      <span>
                        <Clock3 size={13} />
                        {item.duration}
                      </span>

                      <span className="meta-divider">
                        |
                      </span>

                      <span>
                        Stipend: {item.stipend}
                      </span>

                      <span className="meta-divider">
                        |
                      </span>

                      <span>
                        <CalendarDays size={13} />
                        Deadline: {item.deadline}
                      </span>

                    </div>

                  </div>


                  {/* RIGHT */}

                  <div className="institution-opportunity-right">

                    <div className="institution-application-count">
                      <strong>
                        {item.applications}
                      </strong>

                      <span>
                        Applications
                      </span>
                    </div>

                    <button
                      type="button"
                      className="institution-view-opportunity"
                      onClick={() => setSelectedOpportunity(item)}
                    >
                      View Details
                    </button>

                  </div>

                </article>
              ))
            ) : (
              <div className="institution-opportunity-empty">

                <BriefcaseBusiness size={25} />

                <strong>
                  No internship opportunities found
                </strong>

                <span>
                  Try changing your filters or search.
                </span>

              </div>
            )}

          </section>
        </>
      )}


      {/* =========================
          APPLICATIONS
      ========================== */}

      {activeTab === "applications" && (
        <section className="institution-internship-placeholder">

          <div className="institution-placeholder-icon">
            <BriefcaseBusiness size={24} />
          </div>

          <p>STUDENT APPLICATIONS</p>

          <h1>Application Management</h1>

          <span>
            Student internship applications will appear
            here once connected with the backend.
          </span>

        </section>
      )}


      {/* =========================
          TRACKING
      ========================== */}

      {activeTab === "tracking" && (
        <section className="institution-internship-placeholder">

          <div className="institution-placeholder-icon tracking">
            <CalendarDays size={24} />
          </div>

          <p>INTERNSHIP TRACKING</p>

          <h1>Internship Tracking</h1>

          <span>
            Track active internships, joining dates,
            completion status and student outcomes here.
          </span>

        </section>
      )}

      {/* =========================
          OPPORTUNITY DETAILS MODAL
      ========================== */}

      {selectedOpportunity && (
        <div
          className="institution-opportunity-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setSelectedOpportunity(null);
            }
          }}
        >
          <section
            className="institution-opportunity-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="institution-opportunity-modal-title"
          >
            <div className="institution-opportunity-modal-header">
              <div>
                <span className="institution-opportunity-modal-eyebrow">
                  INTERNSHIP OPPORTUNITY
                </span>

                <h2 id="institution-opportunity-modal-title">
                  {selectedOpportunity.title}
                </h2>

                <div className="institution-opportunity-modal-company">
                  <BriefcaseBusiness size={14} />
                  {selectedOpportunity.company}
                  <span>|</span>
                  <MapPin size={14} />
                  {selectedOpportunity.location}
                </div>
              </div>

              <button
                type="button"
                className="institution-opportunity-modal-close"
                onClick={() => setSelectedOpportunity(null)}
                aria-label="Close internship details"
              >
                ×
              </button>
            </div>

            <div className="institution-opportunity-modal-body">
              <div className="institution-opportunity-modal-status-row">
                <span
                  className={`institution-opportunity-status ${
                    selectedOpportunity.status === "Open"
                      ? "open"
                      : "closing"
                  }`}
                >
                  {selectedOpportunity.status}
                </span>

                <span className="institution-opportunity-modal-applications">
                  <strong>
                    {selectedOpportunity.applications}
                  </strong>
                  applications
                </span>
              </div>

              <div className="institution-opportunity-modal-grid">
                <div>
                  <span>Duration</span>
                  <strong>
                    {selectedOpportunity.duration}
                  </strong>
                </div>

                <div>
                  <span>Stipend</span>
                  <strong>
                    {selectedOpportunity.stipend}
                  </strong>
                </div>

                <div>
                  <span>Application Deadline</span>
                  <strong>
                    {selectedOpportunity.deadline}
                  </strong>
                </div>

                <div>
                  <span>Work Mode</span>
                  <strong>
                    {selectedOpportunity.location}
                  </strong>
                </div>
              </div>

              <div className="institution-opportunity-modal-section">
                <span>Required Skills</span>

                <div className="institution-opportunity-modal-skills">
                  {selectedOpportunity.skills.map(
                    (itemSkill) => (
                      <span key={itemSkill}>
                        {itemSkill}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="institution-opportunity-modal-note">
                <strong>Institution view</strong>
                <p>
                  This opportunity is currently available from the
                  connected company workspace. Student applications
                  and internship progress will be populated from the
                  backend once the institution workflow is connected.
                </p>
              </div>
            </div>

            <div className="institution-opportunity-modal-footer">
              <button
                type="button"
                className="institution-opportunity-modal-secondary"
                onClick={() => setSelectedOpportunity(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}

      {showCreateDrive && (
        <div
          className="institution-create-drive-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCreateDrive(false);
            }
          }}
        >
          <section
            className="institution-create-drive-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="institution-create-drive-title"
          >
            <div className="institution-create-drive-header">
              <div>
                <span className="institution-create-drive-eyebrow">
                  NEW INTERNSHIP
                </span>
                <h2 id="institution-create-drive-title">
                  Create Internship Drive
                </h2>
                <p>
                  Add an internship opportunity for students to discover.
                </p>
              </div>

              <button
                type="button"
                className="institution-create-drive-close"
                onClick={() => setShowCreateDrive(false)}
                aria-label="Close create drive"
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="institution-create-drive-form"
              onSubmit={handleCreateDrive}
            >
              <div className="institution-create-drive-grid">
                <label>
                  <span>Internship Title</span>
                  <input
                    type="text"
                    value={createDriveForm.title}
                    onChange={(event) =>
                      handleCreateDriveChange("title", event.target.value)
                    }
                    placeholder="e.g. Frontend Developer Intern"
                    required
                  />
                </label>

                <label>
                  <span>Company</span>
                  <input
                    type="text"
                    value={createDriveForm.company}
                    onChange={(event) =>
                      handleCreateDriveChange("company", event.target.value)
                    }
                    placeholder="e.g. TechNova"
                    required
                  />
                </label>

                <label>
                  <span>Location / Work Mode</span>
                  <select
                    value={createDriveForm.location}
                    onChange={(event) =>
                      handleCreateDriveChange("location", event.target.value)
                    }
                  >
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Bengaluru</option>
                    <option>Hyderabad</option>
                    <option>On-site</option>
                  </select>
                </label>

                <label>
                  <span>Duration</span>
                  <input
                    type="text"
                    value={createDriveForm.duration}
                    onChange={(event) =>
                      handleCreateDriveChange("duration", event.target.value)
                    }
                    placeholder="e.g. 3 months"
                    required
                  />
                </label>

                <label>
                  <span>Stipend</span>
                  <input
                    type="text"
                    value={createDriveForm.stipend}
                    onChange={(event) =>
                      handleCreateDriveChange("stipend", event.target.value)
                    }
                    placeholder="e.g. ₹15,000/mo"
                    required
                  />
                </label>

                <label>
                  <span>Application Deadline</span>
                  <input
                    type="text"
                    value={createDriveForm.deadline}
                    onChange={(event) =>
                      handleCreateDriveChange("deadline", event.target.value)
                    }
                    placeholder="e.g. 30 Oct 2026"
                    required
                  />
                </label>

                <label className="institution-create-drive-field-full">
                  <span>Required Skills</span>
                  <input
                    type="text"
                    value={createDriveForm.skills}
                    onChange={(event) =>
                      handleCreateDriveChange("skills", event.target.value)
                    }
                    placeholder="React, JavaScript, Git"
                  />
                  <small>Separate skills with commas.</small>
                </label>
              </div>

              <div className="institution-create-drive-footer">
                <button
                  type="button"
                  className="institution-create-drive-cancel"
                  onClick={() => setShowCreateDrive(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="institution-create-drive-submit"
                >
                  <CheckCircle2 size={16} />
                  Create Drive
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

    </div>
  );
}


/* =========================================================
   FILTER COMPONENT
========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="institution-internship-filter">

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown size={14} />

    </div>
  );
}