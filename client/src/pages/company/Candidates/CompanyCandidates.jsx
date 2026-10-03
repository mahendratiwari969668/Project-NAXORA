import { useMemo, useState } from "react";
import {
  Bookmark,
  BriefcaseBusiness,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  UserRound,
  X,
} from "lucide-react";

import "./CompanyCandidates.css";

const candidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    initials: "RS",
    avatarClass: "avatar-blue",
    education: "BCA",
    graduation: "2027",
    institute: "MGKVP, Varanasi",
    location: "Varanasi, UP",
    match: 92,
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "JavaScript",
      "+2",
    ],
    projects: 3,
    experience: "0-1 year",
    availability: "Immediate",
  },
  {
    id: 2,
    name: "Priya Singh",
    initials: "PS",
    avatarClass: "avatar-purple",
    education: "B.Tech",
    graduation: "2025",
    institute: "IIT (BHU), Varanasi",
    location: "Varanasi, UP",
    match: 87,
    skills: [
      "Python",
      "Django",
      "React",
      "SQL",
      "Git",
      "+2",
    ],
    projects: 4,
    experience: "1-2 years",
    availability: "Within 1 month",
  },
  {
    id: 3,
    name: "Aman Kumar",
    initials: "AK",
    avatarClass: "avatar-orange",
    education: "BCA",
    graduation: "2027",
    institute: "MGKVP, Varanasi",
    location: "Varanasi, UP",
    match: 81,
    skills: [
      "Java",
      "Spring Boot",
      "MySQL",
      "React",
      "Git",
      "+1",
    ],
    projects: 2,
    experience: "Fresher",
    availability: "Immediate",
  },
  {
    id: 4,
    name: "Sneha Verma",
    initials: "SV",
    avatarClass: "avatar-green",
    education: "B.Tech",
    graduation: "2026",
    institute: "AKTU, Lucknow",
    location: "Lucknow, UP",
    match: 78,
    skills: [
      "React",
      "TypeScript",
      "Figma",
      "CSS",
      "Git",
      "+2",
    ],
    projects: 5,
    experience: "0-1 year",
    availability: "Within 1 month",
  },
  {
    id: 5,
    name: "Arjun Patel",
    initials: "AP",
    avatarClass: "avatar-cyan",
    education: "B.Tech",
    graduation: "2026",
    institute: "BHU, Varanasi",
    location: "Varanasi, UP",
    match: 75,
    skills: [
      "Python",
      "AWS",
      "Docker",
      "Node.js",
      "SQL",
      "+1",
    ],
    projects: 3,
    experience: "0-1 year",
    availability: "Immediate",
  },
];

const skillOptions = [
  ["JavaScript", 420],
  ["React", 380],
  ["Node.js", 310],
  ["Python", 290],
  ["Java", 260],
];

const educationOptions = [
  ["BCA", 680],
  ["B.Tech", 420],
  ["MCA", 120],
  ["B.Sc", 80],
];

const graduationOptions = [
  ["2025", 120],
  ["2026", 480],
  ["2027", 620],
  ["2028", 220],
];

const locationOptions = [
  ["Bengaluru", "Mumbai"],
  ["Delhi", "Mumbai"],
];

export default function CompanyCandidates() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Best Match");

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedEducation, setSelectedEducation] =
    useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState("");
  const [selectedAvailability, setSelectedAvailability] =
    useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedCandidate, setSelectedCandidate] =
    useState(null);

  const [shortlisted, setShortlisted] = useState([]);
  const [saved, setSaved] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredCandidates = useMemo(() => {
    let result = [...candidates];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((candidate) => {
        const searchableText = [
          candidate.name,
          candidate.education,
          candidate.institute,
          candidate.location,
          ...candidate.skills,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    if (selectedSkills.length > 0) {
      result = result.filter((candidate) =>
        selectedSkills.some((skill) =>
          candidate.skills.includes(skill)
        )
      );
    }

    if (selectedEducation.length > 0) {
      result = result.filter((candidate) =>
        selectedEducation.includes(candidate.education)
      );
    }

    if (selectedYear) {
      result = result.filter(
        (candidate) =>
          candidate.graduation === selectedYear
      );
    }

    if (selectedLocation) {
      result = result.filter((candidate) =>
        candidate.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedAvailability.length > 0) {
      result = result.filter((candidate) =>
        selectedAvailability.includes(candidate.availability)
      );
    }

    if (sort === "Best Match") {
      result.sort((a, b) => b.match - a.match);
    }

    if (sort === "Most Experienced") {
      result.sort((a, b) =>
        b.experience.localeCompare(a.experience)
      );
    }

    if (sort === "Most Projects") {
      result.sort((a, b) => b.projects - a.projects);
    }

    return result;
  }, [
    search,
    sort,
    selectedSkills,
    selectedEducation,
    selectedYear,
    selectedLocation,
    selectedAvailability,
  ]);

  const toggleSkill = (skill) => {
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );

    setCurrentPage(1);
  };

  const toggleEducation = (education) => {
    setSelectedEducation((current) =>
      current.includes(education)
        ? current.filter((item) => item !== education)
        : [...current, education]
    );

    setCurrentPage(1);
  };

  const toggleShortlist = (id) => {
    setShortlisted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleSaved = (id) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleAvailability = (availability) => {
    setSelectedAvailability((current) =>
      current.includes(availability)
        ? current.filter((item) => item !== availability)
        : [...current, availability]
    );
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setShowSortMenu(false);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedEducation([]);
    setSelectedYear("");
    setSelectedLocation("");
    setSelectedAvailability([]);
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <main className="company-candidates-page">
      {/* HEADER */}
      <div className="company-candidates-header">
        <div>
          <p className="company-candidates-eyebrow">
            TALENT DISCOVERY
          </p>

          <h1>Candidates</h1>

          <p>
            Discover students and professionals based on
            skills, education and career fit.
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <section className="company-candidates-search-bar">
        <div className="company-candidates-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search candidates by name, skills, education..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div
          className={
            showSortMenu
              ? "company-candidates-sort open"
              : "company-candidates-sort"
          }
        >
          <span>Sort by:</span>

          <button
            type="button"
            className="company-candidates-sort-trigger"
            onClick={() => setShowSortMenu((current) => !current)}
            aria-expanded={showSortMenu}
          >
            <strong>{sort}</strong>
            <ChevronDown
              size={15}
              className={
                showSortMenu
                  ? "company-candidates-sort-chevron rotated"
                  : "company-candidates-sort-chevron"
              }
            />
          </button>

          {showSortMenu && (
            <div className="company-candidates-sort-menu">
              {["Best Match", "Most Experienced", "Most Projects"].map(
                (option) => (
                  <button
                    type="button"
                    key={option}
                    className={
                      sort === option
                        ? "company-candidates-sort-option active"
                        : "company-candidates-sort-option"
                    }
                    onClick={() => handleSortChange(option)}
                  >
                    <span>{option}</span>
                    {sort === option && <span className="sort-check">✓</span>}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="company-candidates-layout">
        {/* FILTER SIDEBAR */}
        <aside className="company-candidates-filters">
          <div className="company-candidates-filter-header">
            <div>
              <SlidersHorizontal size={16} />
              <h3>Filters</h3>
            </div>

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>

          {/* SKILLS */}
          <FilterSection title="Skills">
            {skillOptions.map(([skill, count]) => (
              <CheckboxItem
                key={skill}
                label={skill}
                count={count}
                checked={selectedSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
            ))}
          </FilterSection>

          {/* EDUCATION */}
          <FilterSection title="Education">
            {educationOptions.map(
              ([education, count]) => (
                <CheckboxItem
                  key={education}
                  label={education}
                  count={count}
                  checked={selectedEducation.includes(
                    education
                  )}
                  onChange={() =>
                    toggleEducation(education)
                  }
                />
              )
            )}
          </FilterSection>

          {/* GRADUATION YEAR */}
          <FilterSection title="Graduation Year">
            {graduationOptions.map(
              ([year, count]) => (
                <CheckboxItem
                  key={year}
                  label={year}
                  count={count}
                  checked={selectedYear === year}
                  onChange={() =>
                    setSelectedYear(
                      selectedYear === year ? "" : year
                    )
                  }
                />
              )
            )}
          </FilterSection>

          {/* LOCATION */}
          <FilterSection title="Location">
            {locationOptions.map(
              ([city, region]) => (
                <CheckboxItem
                  key={city}
                  label={city}
                  count={region}
                  checked={selectedLocation === city}
                  onChange={() =>
                    setSelectedLocation(
                      selectedLocation === city
                        ? ""
                        : city
                    )
                  }
                />
              )
            )}
          </FilterSection>

          {/* AVAILABILITY */}
          <FilterSection title="Availability">
            <CheckboxItem
              label="Immediate"
              count=""
              checked={selectedAvailability.includes("Immediate")}
              onChange={() => toggleAvailability("Immediate")}
            />

            <CheckboxItem
              label="Within 1 month"
              count=""
              checked={selectedAvailability.includes("Within 1 month")}
              onChange={() => toggleAvailability("Within 1 month")}
            />
          </FilterSection>
        </aside>

        {/* CANDIDATE RESULTS */}
        <section className="company-candidates-results">
          <div className="company-candidates-results-header">
            <div>
              <h2>
                {filteredCandidates.length.toLocaleString()}{" "}
                Candidates Found
              </h2>

              <span>
                Matching your current search criteria
              </span>
            </div>

            {shortlisted.length > 0 && (
              <div className="company-candidates-shortlist-count">
                <Star size={14} />
                {shortlisted.length} Shortlisted
              </div>
            )}
          </div>

          <div className="company-candidates-list">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isShortlisted={shortlisted.includes(
                    candidate.id
                  )}
                  isSaved={saved.includes(candidate.id)}
                  onShortlist={() =>
                    toggleShortlist(candidate.id)
                  }
                  onSave={() =>
                    toggleSaved(candidate.id)
                  }
                  onView={() => setSelectedCandidate(candidate)}
                />
              ))
            ) : (
              <div className="company-candidates-empty">
                <UserRound size={30} />

                <h3>No candidates found</h3>

                <p>
                  Try changing your search or filters to
                  discover more candidates.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {filteredCandidates.length > 0 && (
            <div className="company-candidates-pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
              >
                <ChevronLeft size={15} />
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={
                    currentPage === page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>
              ))}

              <span>...</span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(142, page + 1)
                  )
                }
              >
                142
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(142, page + 1)
                  )
                }
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}
        </section>
      </div>

      {selectedCandidate && (
        <CandidateProfileModal
          candidate={selectedCandidate}
          isShortlisted={shortlisted.includes(selectedCandidate.id)}
          isSaved={saved.includes(selectedCandidate.id)}
          onClose={() => setSelectedCandidate(null)}
          onShortlist={(id) => toggleShortlist(id)}
          onSave={(id) => toggleSaved(id)}
        />
      )}
    </main>
  );
}

function CandidateProfileModal({
  candidate,
  isShortlisted,
  isSaved,
  onClose,
  onShortlist,
  onSave,
}) {
  if (!candidate) {
    return null;
  }

  return (
    <div
      className="company-candidate-modal-overlay"
      onClick={onClose}
    >
      <section
        className="company-candidate-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="candidate-profile-title"
      >
        <div className="company-candidate-modal-header">
          <div className="company-candidate-modal-identity">
            <div
              className={`company-candidate-modal-avatar ${candidate.avatarClass}`}
            >
              {candidate.initials}
            </div>

            <div>
              <p className="company-candidate-modal-eyebrow">
                CANDIDATE PROFILE
              </p>
              <h2 id="candidate-profile-title">{candidate.name}</h2>
              <span>
                {candidate.education} • {candidate.graduation} •{" "}
                {candidate.institute}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="company-candidate-modal-close"
            onClick={onClose}
            aria-label="Close candidate profile"
          >
            <X size={18} />
          </button>
        </div>

        <div className="company-candidate-modal-summary">
          <div>
            <span>Match Score</span>
            <strong>{candidate.match}%</strong>
          </div>
          <div>
            <span>Experience</span>
            <strong>{candidate.experience}</strong>
          </div>
          <div>
            <span>Projects</span>
            <strong>{candidate.projects}</strong>
          </div>
          <div>
            <span>Availability</span>
            <strong>{candidate.availability}</strong>
          </div>
        </div>

        <div className="company-candidate-modal-section">
          <div className="company-candidate-modal-section-heading">
            <h3>Skills</h3>
            <span>{candidate.skills.length} listed</span>
          </div>

          <div className="company-candidate-modal-skills">
            {candidate.skills
              .filter((skill) => !skill.startsWith("+"))
              .map((skill, index) => (
                <span key={`${skill}-${index}`}>{skill}</span>
              ))}
          </div>
        </div>

        <div className="company-candidate-modal-section">
          <div className="company-candidate-modal-section-heading">
            <h3>Candidate Information</h3>
          </div>

          <div className="company-candidate-modal-info-grid">
            <div>
              <span>Education</span>
              <strong>{candidate.education}</strong>
            </div>
            <div>
              <span>Graduation Year</span>
              <strong>{candidate.graduation}</strong>
            </div>
            <div>
              <span>Institute</span>
              <strong>{candidate.institute}</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>{candidate.location}</strong>
            </div>
          </div>
        </div>

        <div className="company-candidate-modal-actions">
          <button
            type="button"
            className={
              isSaved
                ? "company-candidate-modal-secondary saved"
                : "company-candidate-modal-secondary"
            }
            onClick={() => onSave(candidate.id)}
          >
            <Bookmark
              size={15}
              fill={isSaved ? "currentColor" : "none"}
            />
            {isSaved ? "Saved" : "Save Candidate"}
          </button>

          <button
            type="button"
            className={
              isShortlisted
                ? "company-candidate-modal-primary selected"
                : "company-candidate-modal-primary"
            }
            onClick={() => onShortlist(candidate.id)}
          >
            <Star size={15} fill="currentColor" />
            {isShortlisted ? "Shortlisted" : "Shortlist Candidate"}
          </button>
        </div>
      </section>
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="company-candidates-filter-section">
      <h4>{title}</h4>

      <div className="company-candidates-filter-options">
        {children}
      </div>
    </div>
  );
}

function CheckboxItem({
  label,
  count,
  checked = false,
  onChange = () => {},
}) {
  return (
    <label className="company-candidates-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      <span className="company-candidates-checkmark" />

      <span className="company-candidates-checkbox-label">
        {label}
      </span>

      {count !== "" && (
        <span className="company-candidates-checkbox-count">
          {typeof count === "number"
            ? `(${count})`
            : count}
        </span>
      )}
    </label>
  );
}

function CandidateCard({
  candidate,
  isShortlisted,
  isSaved,
  onShortlist,
  onSave,
  onView,
}) {
  return (
    <article className="company-candidate-card">
      <div
        className={`company-candidate-avatar ${candidate.avatarClass}`}
      >
        {candidate.initials}
      </div>

      <div className="company-candidate-main">
        <div className="company-candidate-top">
          <div>
            <div className="company-candidate-name-row">
              <h3>{candidate.name}</h3>

              <span className="company-candidate-match">
                {candidate.match}% Match
              </span>
            </div>

            <p className="company-candidate-education">
              {candidate.education} •{" "}
              {candidate.graduation} •{" "}
              {candidate.institute}
            </p>

            <p className="company-candidate-location">
              <MapPin size={12} />
              {candidate.location}
            </p>
          </div>

          <button
            type="button"
            className={
              isSaved
                ? "company-candidate-save saved"
                : "company-candidate-save"
            }
            onClick={onSave}
            aria-label="Save candidate"
          >
            <Bookmark
              size={17}
              fill={isSaved ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="company-candidate-skills">
          {candidate.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <div className="company-candidate-meta">
          <span>
            <BriefcaseBusiness size={13} />
            {candidate.experience}
          </span>

          <span>
            <GraduationCap size={13} />
            {candidate.projects} Projects
          </span>

          <span>
            <span className="company-candidate-availability-dot" />
            {candidate.availability}
          </span>
        </div>
      </div>

      <div className="company-candidate-actions">
        <button
          type="button"
          className="company-candidate-view"
          onClick={onView}
        >
          View Profile
        </button>

        <button
          type="button"
          className={
            isShortlisted
              ? "company-candidate-shortlist selected"
              : "company-candidate-shortlist"
          }
          onClick={onShortlist}
        >
          {isShortlisted ? "Shortlisted" : "Shortlist"}
        </button>
      </div>
    </article>
  );
}