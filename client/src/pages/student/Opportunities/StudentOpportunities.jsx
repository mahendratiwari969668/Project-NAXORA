import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import "./StudentOpportunities.css";

/* =========================================================
   OPPORTUNITY SECTIONS
========================================================= */

const opportunitySections = [
  {
    label: "All Opportunities",
  },
  {
    label: "Internships",
  },
  {
    label: "Jobs",
  },
  {
    label: "Saved",
  },
];

/* =========================================================
   DEMO OPPORTUNITIES
========================================================= */

const opportunities = [
  {
    id: 1,
    type: "Internship",
    title: "Frontend Development Intern",
    company: "Technology Company",
    location: "Remote",
    mode: "Remote",
    duration: "3–6 months",
    posted: "Recently posted",
    skills: ["React", "JavaScript", "CSS"],
    description:
      "Work with a development team to build responsive web experiences and contribute to real product features.",
    featured: true,
    eligibility:
      "Students pursuing BCA, B.Tech, MCA or related computer science programs.",
    fullDescription:
      "This internship gives students an opportunity to work with a development team on responsive web experiences and real product features. You will collaborate with developers, improve existing interfaces and contribute to frontend implementation.",
    responsibilities: [
      "Build responsive user interfaces.",
      "Work with React and JavaScript.",
      "Collaborate with developers and designers.",
      "Fix UI issues and improve existing components.",
    ],
  },
  {
    id: 2,
    type: "Job",
    title: "Junior Web Developer",
    company: "Product & Technology Team",
    location: "Noida, India",
    mode: "Hybrid",
    duration: "Full-time",
    posted: "Recently posted",
    skills: ["HTML", "CSS", "JavaScript", "Git"],
    description:
      "Join a product team working on modern web applications and user-facing digital experiences.",
    featured: false,
    eligibility:
      "Graduates or final-year students with strong frontend fundamentals.",
    fullDescription:
      "Join a product-focused engineering team working on modern web applications and user-facing digital experiences. The role involves developing frontend features and collaborating with the wider technology team.",
    responsibilities: [
      "Develop and maintain web interfaces.",
      "Write clean HTML, CSS and JavaScript.",
      "Use Git for version control.",
      "Collaborate with the product and engineering teams.",
    ],
  },
  {
    id: 3,
    type: "Internship",
    title: "Full Stack Developer Intern",
    company: "Software Solutions",
    location: "Bengaluru, India",
    mode: "On-site",
    duration: "6 months",
    posted: "Recently posted",
    skills: ["Node.js", "Express", "MongoDB"],
    description:
      "Assist in developing backend services and web applications while working closely with experienced developers.",
    featured: false,
    eligibility:
      "Students with knowledge of JavaScript, Node.js and database fundamentals.",
    fullDescription:
      "Work alongside experienced developers to build backend services and complete web applications. You will get practical exposure to APIs, server-side JavaScript and database-driven applications.",
    responsibilities: [
      "Build REST API features.",
      "Work with Node.js and Express.",
      "Work with MongoDB databases.",
      "Test and debug backend functionality.",
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function StudentOpportunities() {
  const navigate = useNavigate();
  const { opportunityId } = useParams();

  /* =======================================================
     GENERAL STATE
  ======================================================= */

  const [activeSection, setActiveSection] =
    useState("All Opportunities");

  const [search, setSearch] = useState("");

  const [activeType, setActiveType] = useState("All");

  const [activeMode, setActiveMode] = useState("All");

  const [activeSkill, setActiveSkill] = useState("All");

  const [savedIds, setSavedIds] = useState([]);

  /* =======================================================
     FILTER MODAL STATE
  ======================================================= */

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [draftType, setDraftType] = useState("All");

  const [draftMode, setDraftMode] = useState("All");

  const [draftSkill, setDraftSkill] = useState("All");

  /* =======================================================
     SORT STATE
  ======================================================= */

  const [sortOrder, setSortOrder] = useState("recent");

  const [isSortOpen, setIsSortOpen] = useState(false);

  /* =======================================================
     SAVE / UNSAVE
  ======================================================= */

  const toggleSaved = (id) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  /* =======================================================
     FILTER HELPERS
  ======================================================= */

  const allSkills = [
    ...new Set(opportunities.flatMap((item) => item.skills)),
  ];

  const allModes = [
    ...new Set(opportunities.map((item) => item.mode)),
  ];

  /* =======================================================
     APPLY FILTERS
  ======================================================= */

  const applyFilters = () => {
    setActiveType(draftType);
    setActiveMode(draftMode);
    setActiveSkill(draftSkill);
    setIsFilterOpen(false);
  };

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setActiveType("All");
    setActiveMode("All");
    setActiveSkill("All");
    setDraftType("All");
    setDraftMode("All");
    setDraftSkill("All");
    setActiveSection("All Opportunities");
    setIsFilterOpen(false);
  };

  /* =======================================================
     OPEN FILTER MODAL
  ======================================================= */

  const openFilters = () => {
    setDraftType(activeType);
    setDraftMode(activeMode);
    setDraftSkill(activeSkill);
    setIsFilterOpen(true);
  };

  /* =======================================================
     SORT
  ======================================================= */

  const changeSort = (value) => {
    setSortOrder(value);
    setIsSortOpen(false);
  };

  /* =======================================================
     FILTER OPPORTUNITIES
  ======================================================= */

  const filteredOpportunities = opportunities
    .filter((item) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        item.title.toLowerCase().includes(searchValue) ||
        item.company.toLowerCase().includes(searchValue) ||
        item.skills.some((skill) =>
          skill.toLowerCase().includes(searchValue)
        );

      const matchesType =
        activeType === "All" || item.type === activeType;

      const matchesMode =
        activeMode === "All" || item.mode === activeMode;

      const matchesSkill =
        activeSkill === "All" ||
        item.skills.some(
          (skill) => skill.toLowerCase() === activeSkill.toLowerCase()
        );

      const matchesSaved =
        activeSection !== "Saved" ||
        savedIds.includes(item.id);

      const matchesSection =
        activeSection === "All Opportunities" ||
        activeSection === "Saved" ||
        item.type === activeSection.slice(0, -1);

      return (
        matchesSearch &&
        matchesType &&
        matchesMode &&
        matchesSkill &&
        matchesSaved &&
        matchesSection
      );
    })
    .sort((a, b) => {
      if (sortOrder === "title") {
        return a.title.localeCompare(b.title);
      }

      if (sortOrder === "company") {
        return a.company.localeCompare(b.company);
      }

      return a.id - b.id;
    });

  /* =======================================================
     DETAILS PAGE
  ======================================================= */

  if (opportunityId) {
    const opportunity = opportunities.find(
      (item) => String(item.id) === String(opportunityId)
    );

    if (!opportunity) {
      return (
        <div className="student-opportunities-page">
          <main className="opportunities-main">
            <section className="opportunity-details-not-found">
              <div className="opportunity-details-not-found-icon">
                <Search size={26} />
              </div>

              <h2>Opportunity not found</h2>

              <p>
                The opportunity you are looking for does not exist
                or is no longer available.
              </p>

              <button
                type="button"
                onClick={() => navigate("/student/opportunities")}
              >
                <ArrowLeft size={16} />
                Back to Opportunities
              </button>
            </section>
          </main>
        </div>
      );
    }

    const isSaved = savedIds.includes(opportunity.id);

    return (
      <div className="student-opportunities-page">
        <main className="opportunities-main">
          {/* BACK */}

          <button
            type="button"
            className="opportunity-details-back"
            onClick={() => navigate("/student/opportunities")}
          >
            <ArrowLeft size={17} />
            Back to Opportunities
          </button>

          {/* DETAILS HEADER */}

          <section className="opportunity-details-card">
            <div className="opportunity-details-header">
              <div className="opportunity-details-company-icon">
                <Building2 size={28} />
              </div>

              <div className="opportunity-details-title">
                <div className="opportunity-meta">
                  <span className="opportunity-type">
                    {opportunity.type}
                  </span>

                  {opportunity.featured && (
                    <span className="opportunity-featured">
                      Featured
                    </span>
                  )}
                </div>

                <h1>{opportunity.title}</h1>

                <p>{opportunity.company}</p>
              </div>

              <button
                type="button"
                className={`opportunity-save ${
                  isSaved ? "saved" : ""
                }`}
                onClick={() => toggleSaved(opportunity.id)}
                aria-label={
                  isSaved
                    ? "Remove from saved"
                    : "Save opportunity"
                }
              >
                <Bookmark
                  size={20}
                  fill={isSaved ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* DETAILS META */}

            <div className="opportunity-details-meta">
              <span>
                <MapPin size={17} />
                {opportunity.location}
              </span>

              <span>
                <BriefcaseBusiness size={17} />
                {opportunity.mode}
              </span>

              <span>
                <Clock3 size={17} />
                {opportunity.duration}
              </span>
            </div>

            {/* CONTENT */}

            <div className="opportunity-details-content">
              <div className="opportunity-details-main">
                <section>
                  <span className="opportunity-details-eyebrow">
                    ABOUT THE OPPORTUNITY
                  </span>

                  <h2>Role overview</h2>

                  <p>{opportunity.fullDescription}</p>
                </section>

                <section>
                  <span className="opportunity-details-eyebrow">
                    RESPONSIBILITIES
                  </span>

                  <h2>What you will work on</h2>

                  <div className="opportunity-responsibility-list">
                    {opportunity.responsibilities.map(
                      (item, index) => (
                        <div key={index}>
                          <CheckCircle2 size={18} />
                          <span>{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </section>

                <section>
                  <span className="opportunity-details-eyebrow">
                    REQUIRED SKILLS
                  </span>

                  <h2>Skills</h2>

                  <div className="opportunity-details-skills">
                    {opportunity.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </section>
              </div>

              {/* SIDE INFO */}

              <aside className="opportunity-details-sidebar">
                <div className="opportunity-detail-side-card">
                  <span>OPPORTUNITY TYPE</span>
                  <strong>{opportunity.type}</strong>
                </div>

                <div className="opportunity-detail-side-card">
                  <span>LOCATION</span>
                  <strong>{opportunity.location}</strong>
                </div>

                <div className="opportunity-detail-side-card">
                  <span>DURATION</span>
                  <strong>{opportunity.duration}</strong>
                </div>

                <div className="opportunity-detail-side-card">
                  <span>ELIGIBILITY</span>
                  <p>{opportunity.eligibility}</p>
                </div>

                <button
                  type="button"
                  className="opportunity-apply-button"
                  onClick={() => {
                    alert(
                      "Application submission will be connected to the backend later."
                    );
                  }}
                >
                  Apply Now
                  <ArrowRight size={17} />
                </button>
              </aside>
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* =======================================================
     MAIN OPPORTUNITIES PAGE
  ======================================================= */

  return (
    <div className="student-opportunities-page">
      <main className="opportunities-main">
        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <section className="opportunities-heading">
          <div>
            <span className="opportunities-eyebrow">
              CAREER OPPORTUNITIES
            </span>

            <h1>Find your next opportunity</h1>

            <p>
              Discover internships and jobs that match your
              skills, interests and career direction.
            </p>
          </div>

          <div className="opportunities-heading-status">
            <BriefcaseBusiness size={17} />
            Opportunity workspace
          </div>
        </section>

        {/* =================================================
            SEARCH
        ================================================= */}

        <section className="opportunities-search-card">
          <div className="opportunities-search-box">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search by role, company or skill..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button
            type="button"
            className={`opportunities-filter-button ${
              activeType !== "All" ||
              activeMode !== "All" ||
              activeSkill !== "All"
                ? "active"
                : ""
            }`}
            onClick={openFilters}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </section>

        {/* =================================================
            BODY
        ================================================= */}

        <section className="opportunities-layout">
          {/* =================================================
              OPPORTUNITY SECTION NAVIGATION
          ================================================= */}

          <aside className="opportunities-section-sidebar">
            <div className="opportunities-section-title">
              OPPORTUNITIES
            </div>

            <nav>
              {opportunitySections.map((section) => (
                <button
                  type="button"
                  key={section.label}
                  className={`opportunities-section-item ${
                    activeSection === section.label
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveSection(section.label)
                  }
                >
                  <span>{section.label}</span>

                  {activeSection === section.label && (
                    <ChevronRight size={16} />
                  )}
                </button>
              ))}
            </nav>

            {/* QUICK FILTERS */}

            <div className="opportunities-filter-panel">
              <div className="opportunities-filter-heading">
                <Filter size={16} />
                <strong>Quick filters</strong>
              </div>

              <button
                type="button"
                className={
                  activeType === "All" ? "selected" : ""
                }
                onClick={() => setActiveType("All")}
              >
                All types
              </button>

              <button
                type="button"
                className={
                  activeType === "Internship"
                    ? "selected"
                    : ""
                }
                onClick={() => setActiveType("Internship")}
              >
                Internships
              </button>

              <button
                type="button"
                className={
                  activeType === "Job" ? "selected" : ""
                }
                onClick={() => setActiveType("Job")}
              >
                Jobs
              </button>
            </div>
          </aside>

          {/* =================================================
              RESULTS
          ================================================= */}

          <div className="opportunities-results">
            <div className="opportunities-results-header">
              <div>
                <span>DISCOVER</span>

                <h2>{activeSection}</h2>
              </div>

              <div className="opportunities-sort-wrapper">
                <button
                  type="button"
                  className="opportunities-sort-button"
                  onClick={() =>
                    setIsSortOpen((current) => !current)
                  }
                >
                  {sortOrder === "recent"
                    ? "Recently posted"
                    : sortOrder === "title"
                    ? "Title"
                    : "Company"}

                  <ChevronDown size={17} />
                </button>

                {isSortOpen && (
                  <div className="opportunities-sort-menu">
                    <button
                      type="button"
                      onClick={() => changeSort("recent")}
                    >
                      Recently posted
                    </button>

                    <button
                      type="button"
                      onClick={() => changeSort("title")}
                    >
                      Title
                    </button>

                    <button
                      type="button"
                      onClick={() => changeSort("company")}
                    >
                      Company
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ACTIVE FILTERS */}

            {(activeType !== "All" ||
              activeMode !== "All" ||
              activeSkill !== "All" ||
              search) && (
              <div className="opportunities-active-filters">
                {search && (
                  <span>
                    Search: <strong>{search}</strong>
                  </span>
                )}

                {activeType !== "All" && (
                  <span>
                    Type: <strong>{activeType}</strong>
                  </span>
                )}

                {activeMode !== "All" && (
                  <span>
                    Mode: <strong>{activeMode}</strong>
                  </span>
                )}

                {activeSkill !== "All" && (
                  <span>
                    Skill: <strong>{activeSkill}</strong>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              </div>
            )}

            {/* OPPORTUNITY LIST */}

            {filteredOpportunities.length > 0 ? (
              <div className="opportunities-list">
                {filteredOpportunities.map(
                  (opportunity) => (
                    <article
                      className={`opportunity-card ${
                        opportunity.featured ? "featured" : ""
                      }`}
                      key={opportunity.id}
                    >
                      {/* CARD TOP */}

                      <div className="opportunity-card-top">
                        <div className="opportunity-company-icon">
                          <Building2 size={23} />
                        </div>

                        <div className="opportunity-main-info">
                          <div className="opportunity-meta">
                            <span className="opportunity-type">
                              {opportunity.type}
                            </span>

                            {opportunity.featured && (
                              <span className="opportunity-featured">
                                Featured
                              </span>
                            )}
                          </div>

                          <h3>{opportunity.title}</h3>

                          <p className="opportunity-company">
                            {opportunity.company}
                          </p>
                        </div>

                        {/* SAVE */}

                        <button
                          type="button"
                          className={`opportunity-save ${
                            savedIds.includes(opportunity.id)
                              ? "saved"
                              : ""
                          }`}
                          onClick={() =>
                            toggleSaved(opportunity.id)
                          }
                          aria-label={
                            savedIds.includes(opportunity.id)
                              ? "Remove from saved"
                              : "Save opportunity"
                          }
                        >
                          <Bookmark
                            size={19}
                            fill={
                              savedIds.includes(
                                opportunity.id
                              )
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>

                      {/* DESCRIPTION */}

                      <p className="opportunity-description">
                        {opportunity.description}
                      </p>

                      {/* DETAILS */}

                      <div className="opportunity-details">
                        <span>
                          <MapPin size={16} />
                          {opportunity.location}
                        </span>

                        <span>
                          <BriefcaseBusiness size={16} />
                          {opportunity.mode}
                        </span>

                        <span>
                          <Clock3 size={16} />
                          {opportunity.duration}
                        </span>
                      </div>

                      {/* BOTTOM */}

                      <div className="opportunity-card-bottom">
                        <div className="opportunity-skills">
                          {opportunity.skills.map((skill) => (
                            <span key={skill}>{skill}</span>
                          ))}
                        </div>

                        <div className="opportunity-card-action">
                          <small>
                            {opportunity.posted}
                          </small>

                          <Link
                            to={`/student/opportunities/${opportunity.id}`}
                          >
                            View Details
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            ) : (
              /* EMPTY STATE */

              <div className="opportunities-empty">
                <div className="opportunities-empty-icon">
                  <Search size={26} />
                </div>

                <h3>No opportunities found</h3>

                <p>
                  Try changing your search or filters to
                  discover more opportunities.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* =================================================
                CAREER TIP
            ================================================= */}

            <div className="opportunities-bottom-tip">
              <div className="opportunities-bottom-tip-icon">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <strong>Keep your profile updated</strong>

                <p>
                  A complete profile helps you present your
                  skills and experience clearly when applying
                  to opportunities.
                </p>
              </div>

              <Link to="/student/profile">
                Update Profile
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FILTER MODAL
      ====================================================== */}

      {isFilterOpen && (
        <div
          className="opportunities-filter-overlay"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="opportunities-filter-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="opportunities-filter-modal-header">
              <div>
                <span>FILTER OPPORTUNITIES</span>
                <h2>Refine your search</h2>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* TYPE */}

            <div className="opportunities-filter-field">
              <label htmlFor="opportunity-type">
                Opportunity Type
              </label>

              <select
                id="opportunity-type"
                value={draftType}
                onChange={(event) =>
                  setDraftType(event.target.value)
                }
              >
                <option value="All">All types</option>
                <option value="Internship">
                  Internships
                </option>
                <option value="Job">Jobs</option>
              </select>
            </div>

            {/* MODE */}

            <div className="opportunities-filter-field">
              <label htmlFor="opportunity-mode">
                Work Mode
              </label>

              <select
                id="opportunity-mode"
                value={draftMode}
                onChange={(event) =>
                  setDraftMode(event.target.value)
                }
              >
                <option value="All">All modes</option>

                {allModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            {/* SKILL */}

            <div className="opportunities-filter-field">
              <label htmlFor="opportunity-skill">
                Skill
              </label>

              <select
                id="opportunity-skill"
                value={draftSkill}
                onChange={(event) =>
                  setDraftSkill(event.target.value)
                }
              >
                <option value="All">All skills</option>

                {allSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* ACTIONS */}

            <div className="opportunities-filter-modal-actions">
              <button
                type="button"
                className="filter-clear-button"
                onClick={() => {
                  setDraftType("All");
                  setDraftMode("All");
                  setDraftSkill("All");
                }}
              >
                Reset
              </button>

              <button
                type="button"
                className="filter-apply-button"
                onClick={applyFilters}
              >
                Apply Filters
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}