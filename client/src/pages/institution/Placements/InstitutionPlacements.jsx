import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  MapPin,
  Search,
  X,
} from "lucide-react";

import "./InstitutionPlacements.css";
import PlacementApplications from "./Applications/PlacementApplications";
import PlacementShortlisted from "./Shortlisted/PlacementShortlisted";
import PlacementRecords from "./Records/PlacementRecords";

const drives = [
  {
    id: 1,
    role: "Software Engineer",
    company: "TechCorp",
    department: "BCA, B.Tech",
    batch: "2026, 2027",
    package: "₹8-12 LPA",
    mode: "On Campus",
    date: "12",
    month: "Oct",
    year: "2025",
    status: "Upcoming",
    eligible: 120,
    color: "red",
  },
  {
    id: 2,
    role: "Associate Developer",
    company: "InnovateLab",
    department: "BCA, B.Sc CS",
    batch: "2026",
    package: "₹6-8 LPA",
    mode: "Hybrid",
    date: "28",
    month: "Oct",
    year: "2025",
    status: "Upcoming",
    eligible: 86,
    color: "orange",
  },
  {
    id: 3,
    role: "Data Analyst",
    company: "DataTech",
    department: "BCA, B.Sc IT",
    batch: "2026",
    package: "₹5-7 LPA",
    mode: "On Campus",
    date: "10",
    month: "Nov",
    year: "2025",
    status: "Scheduled",
    eligible: 64,
    color: "blue",
  },
  {
    id: 4,
    role: "Full Stack Developer",
    company: "WebSolve",
    department: "BCA, B.Tech",
    batch: "2026, 2027",
    package: "₹7-10 LPA",
    mode: "Hybrid",
    date: "22",
    month: "Nov",
    year: "2025",
    status: "Scheduled",
    eligible: 98,
    color: "red",
  },
];

const statuses = [
  "All Status",
  "Upcoming",
  "Scheduled",
  "Completed",
];

export default function InstitutionPlacements() {
  const [activeTab, setActiveTab] = useState("drives");
  const [status, setStatus] = useState("All Status");
  const [search, setSearch] = useState("");
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [placementDrives, setPlacementDrives] = useState(drives);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [isCreateDriveOpen, setIsCreateDriveOpen] = useState(false);
  const [newDrive, setNewDrive] = useState({
    role: "",
    company: "",
    department: "",
    batch: "",
    package: "",
    mode: "On Campus",
    date: "",
    month: "",
    year: "2026",
    status: "Upcoming",
  });

  const filteredDrives = useMemo(() => {
    const query = search.trim().toLowerCase();

    return placementDrives.filter((drive) => {
      const matchesStatus =
        status === "All Status" ||
        drive.status === status;

      const matchesSearch =
        !query ||
        drive.role.toLowerCase().includes(query) ||
        drive.company.toLowerCase().includes(query) ||
        drive.department.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [placementDrives, status, search]);

  const handleCreateDrive = (event) => {
    event.preventDefault();

    const requiredFields = [
      newDrive.role,
      newDrive.company,
      newDrive.department,
      newDrive.batch,
      newDrive.package,
      newDrive.date,
      newDrive.month,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      return;
    }

    const createdDrive = {
      id: Date.now(),
      role: newDrive.role.trim(),
      company: newDrive.company.trim(),
      department: newDrive.department.trim(),
      batch: newDrive.batch.trim(),
      package: newDrive.package.trim(),
      mode: newDrive.mode,
      date: newDrive.date.trim(),
      month: newDrive.month.trim(),
      year: newDrive.year.trim() || "2026",
      status: newDrive.status,
      eligible: 0,
      color: "blue",
    };

    setPlacementDrives((current) => [createdDrive, ...current]);
    setIsCreateDriveOpen(false);
    setNewDrive({
      role: "",
      company: "",
      department: "",
      batch: "",
      package: "",
      mode: "On Campus",
      date: "",
      month: "",
      year: "2026",
      status: "Upcoming",
    });
  };

  const handleNewDriveChange = (field, value) => {
    setNewDrive((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="institution-placements-page">

      {/* =========================
          TABS
      ========================== */}

      <nav className="institution-placement-tabs">

        <button
          type="button"
          className={activeTab === "drives" ? "active" : ""}
          onClick={() => setActiveTab("drives")}
        >
          Placement Drives
        </button>

        <button
          type="button"
          className={activeTab === "applications" ? "active" : ""}
          onClick={() => setActiveTab("applications")}
        >
          Applications
        </button>

        <button
          type="button"
          className={activeTab === "shortlisted" ? "active" : ""}
          onClick={() => setActiveTab("shortlisted")}
        >
          Shortlisted
        </button>

        <button
          type="button"
          className={activeTab === "records" ? "active" : ""}
          onClick={() => setActiveTab("records")}
        >
          Placement Records
        </button>

      </nav>


      {/* =========================
          PLACEMENT DRIVES
      ========================== */}

      {activeTab === "drives" && (
        <>
          <section className="institution-placement-header">

            <div>
              <p className="institution-placement-eyebrow">
                PLACEMENTS
              </p>

              <h1>Placement Drives</h1>

              <p>
                Manage and track campus placement drives.
              </p>
            </div>

            <button
              type="button"
              className="institution-create-drive"
              onClick={() => setIsCreateDriveOpen(true)}
            >
              <span>+</span>
              Create Drive
            </button>

          </section>


          {/* FILTER BAR */}

          <section className="institution-placement-toolbar">

            <div className="institution-placement-filter">

              <button
                type="button"
                className={`institution-placement-filter-trigger ${
                  statusMenuOpen ? "open" : ""
                }`}
                onClick={() =>
                  setStatusMenuOpen((current) => !current)
                }
                aria-haspopup="listbox"
                aria-expanded={statusMenuOpen}
              >
                <span>{status}</span>
                <ChevronDown size={15} />
              </button>

              {statusMenuOpen && (
                <div
                  className="institution-placement-filter-menu"
                  role="listbox"
                  aria-label="Placement status"
                >
                  {statuses.map((item) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={status === item}
                      className={
                        status === item ? "selected" : ""
                      }
                      key={item}
                      onClick={() => {
                        setStatus(item);
                        setStatusMenuOpen(false);
                      }}
                    >
                      <span>{item}</span>
                      {status === item && (
                        <span className="institution-placement-filter-check">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

            </div>


            <div className="institution-placement-search">

              <Search size={16} />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search drives by company or role..."
              />

            </div>

          </section>


          {/* DRIVE LIST */}

          <section className="institution-placement-list">

            {filteredDrives.length > 0 ? (
              filteredDrives.map((drive) => (
                <article
                  className="institution-placement-card"
                  key={drive.id}
                >

                  {/* COMPANY ICON */}

                  <div
                    className={`institution-placement-company-icon ${drive.color}`}
                  >
                    <BriefcaseBusiness size={21} />
                  </div>


                  {/* MAIN CONTENT */}

                  <div className="institution-placement-main">

                    <h2>{drive.role}</h2>

                    <div className="institution-placement-company">
                      {drive.company}
                    </div>

                    <div className="institution-placement-details">

                      <span>
                        {drive.department}
                      </span>

                      <span className="placement-divider">
                        |
                      </span>

                      <span>
                        {drive.batch}
                      </span>

                      <span className="placement-divider">
                        |
                      </span>

                      <span>
                        {drive.package}
                      </span>

                      <span className="placement-divider">
                        |
                      </span>

                      <span>
                        <MapPin size={11} />
                        {drive.mode}
                      </span>

                    </div>

                  </div>


                  {/* DATE */}

                  <div className="institution-placement-date">

                    <CalendarDays size={14} />

                    <strong>{drive.date}</strong>

                    <span>
                      {drive.month}
                    </span>

                    <span>
                      {drive.year}
                    </span>

                  </div>


                  {/* STATUS */}

                  <div className="institution-placement-status-wrap">

                    <span
                      className={`institution-placement-status ${
                        drive.status.toLowerCase()
                      }`}
                    >
                      {drive.status}
                    </span>

                  </div>


                  {/* ELIGIBLE */}

                  <div className="institution-placement-eligible">

                    <strong>
                      {drive.eligible}
                    </strong>

                    <span>
                      Eligible Students
                    </span>

                  </div>


                  {/* ACTION */}

                  <button
                    type="button"
                    className="institution-placement-details-button"
                    onClick={() => setSelectedDrive(drive)}
                  >
                    View Details
                    <span>›</span>
                  </button>

                </article>
              ))
            ) : (
              <div className="institution-placement-empty">

                <GraduationCap size={26} />

                <strong>
                  No placement drives found
                </strong>

                <span>
                  Try changing the status or search query.
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
        <PlacementApplications />
      )}


      {/* =========================
          SHORTLISTED
      ========================== */}

      {activeTab === "shortlisted" && (
        <PlacementShortlisted />
      )}


      {/* =========================
          RECORDS
      ========================== */}

      {activeTab === "records" && (
        <PlacementRecords />
      )}

      {/* =========================================================
          CREATE DRIVE MODAL
      ========================================================== */}

      {isCreateDriveOpen && (
        <div
          className="institution-placement-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsCreateDriveOpen(false);
            }
          }}
        >
          <section
            className="institution-placement-modal institution-placement-create-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="institution-create-drive-title"
          >
            <div className="institution-placement-modal-header">
              <div>
                <span className="institution-placement-modal-eyebrow">
                  PLACEMENTS
                </span>
                <h2 id="institution-create-drive-title">
                  Create Placement Drive
                </h2>
                <p>
                  Add a new campus placement drive to your institution workspace.
                </p>
              </div>

              <button
                type="button"
                className="institution-placement-modal-close"
                onClick={() => setIsCreateDriveOpen(false)}
                aria-label="Close create placement drive"
              >
                <X size={17} />
              </button>
            </div>

            <form
              className="institution-placement-create-form"
              onSubmit={handleCreateDrive}
            >
              <div className="institution-placement-form-grid">
                <label>
                  <span>Role</span>
                  <input
                    type="text"
                    value={newDrive.role}
                    onChange={(event) =>
                      handleNewDriveChange("role", event.target.value)
                    }
                    placeholder="e.g. Software Engineer"
                    required
                  />
                </label>

                <label>
                  <span>Company</span>
                  <input
                    type="text"
                    value={newDrive.company}
                    onChange={(event) =>
                      handleNewDriveChange("company", event.target.value)
                    }
                    placeholder="e.g. TechCorp"
                    required
                  />
                </label>

                <label>
                  <span>Eligible Department</span>
                  <input
                    type="text"
                    value={newDrive.department}
                    onChange={(event) =>
                      handleNewDriveChange("department", event.target.value)
                    }
                    placeholder="e.g. BCA, B.Tech"
                    required
                  />
                </label>

                <label>
                  <span>Batch</span>
                  <input
                    type="text"
                    value={newDrive.batch}
                    onChange={(event) =>
                      handleNewDriveChange("batch", event.target.value)
                    }
                    placeholder="e.g. 2026, 2027"
                    required
                  />
                </label>

                <label>
                  <span>Package</span>
                  <input
                    type="text"
                    value={newDrive.package}
                    onChange={(event) =>
                      handleNewDriveChange("package", event.target.value)
                    }
                    placeholder="e.g. ₹8-12 LPA"
                    required
                  />
                </label>

                <label>
                  <span>Mode</span>
                  <select
                    value={newDrive.mode}
                    onChange={(event) =>
                      handleNewDriveChange("mode", event.target.value)
                    }
                  >
                    <option>On Campus</option>
                    <option>Hybrid</option>
                    <option>Remote</option>
                  </select>
                </label>

                <label>
                  <span>Date</span>
                  <input
                    type="text"
                    value={newDrive.date}
                    onChange={(event) =>
                      handleNewDriveChange("date", event.target.value)
                    }
                    placeholder="e.g. 18"
                    required
                  />
                </label>

                <label>
                  <span>Month</span>
                  <input
                    type="text"
                    value={newDrive.month}
                    onChange={(event) =>
                      handleNewDriveChange("month", event.target.value)
                    }
                    placeholder="e.g. Dec"
                    required
                  />
                </label>

                <label>
                  <span>Year</span>
                  <input
                    type="text"
                    value={newDrive.year}
                    onChange={(event) =>
                      handleNewDriveChange("year", event.target.value)
                    }
                    placeholder="e.g. 2026"
                  />
                </label>

                <label>
                  <span>Status</span>
                  <select
                    value={newDrive.status}
                    onChange={(event) =>
                      handleNewDriveChange("status", event.target.value)
                    }
                  >
                    {statuses
                      .filter((item) => item !== "All Status")
                      .map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </label>
              </div>

              <div className="institution-placement-create-actions">
                <button
                  type="button"
                  className="institution-placement-modal-secondary"
                  onClick={() => setIsCreateDriveOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="institution-placement-create-submit"
                >
                  Create Drive
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* =========================================================
          VIEW DRIVE DETAILS MODAL
      ========================================================== */}

      {selectedDrive && (
        <div
          className="institution-placement-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDrive(null);
            }
          }}
        >
          <section
            className="institution-placement-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="institution-placement-details-title"
          >
            <div className="institution-placement-modal-header">
              <div>
                <span className="institution-placement-modal-eyebrow">
                  PLACEMENT DRIVE
                </span>

                <h2 id="institution-placement-details-title">
                  {selectedDrive.role}
                </h2>

                <p>
                  {selectedDrive.company} · {selectedDrive.mode}
                </p>
              </div>

              <button
                type="button"
                className="institution-placement-modal-close"
                onClick={() => setSelectedDrive(null)}
                aria-label="Close placement drive details"
              >
                <X size={17} />
              </button>
            </div>

            <div className="institution-placement-details-body">
              <div className="institution-placement-details-status-row">
                <span
                  className={`institution-placement-status ${
                    selectedDrive.status.toLowerCase()
                  }`}
                >
                  {selectedDrive.status}
                </span>

                <span>
                  {selectedDrive.eligible} eligible students
                </span>
              </div>

              <div className="institution-placement-details-grid">
                <div>
                  <span>Company</span>
                  <strong>{selectedDrive.company}</strong>
                </div>

                <div>
                  <span>Role</span>
                  <strong>{selectedDrive.role}</strong>
                </div>

                <div>
                  <span>Department</span>
                  <strong>{selectedDrive.department}</strong>
                </div>

                <div>
                  <span>Batch</span>
                  <strong>{selectedDrive.batch}</strong>
                </div>

                <div>
                  <span>Package</span>
                  <strong>{selectedDrive.package}</strong>
                </div>

                <div>
                  <span>Work Mode</span>
                  <strong>{selectedDrive.mode}</strong>
                </div>

                <div>
                  <span>Drive Date</span>
                  <strong>
                    {selectedDrive.date} {selectedDrive.month} {selectedDrive.year}
                  </strong>
                </div>

                <div>
                  <span>Eligible Students</span>
                  <strong>{selectedDrive.eligible}</strong>
                </div>
              </div>
            </div>

            <div className="institution-placement-modal-footer">
              <button
                type="button"
                className="institution-placement-modal-secondary"
                onClick={() => setSelectedDrive(null)}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}

    </div>
  );
}


/* =========================================================
   PLACEHOLDER
========================================================= */

function PlacementPlaceholder({
  icon,
  label,
  title,
  text,
  green = false,
  orange = false,
}) {
  return (
    <section className="institution-placement-placeholder">

      <div
        className={`institution-placement-placeholder-icon ${
          green
            ? "green"
            : orange
            ? "orange"
            : ""
        }`}
      >
        {icon}
      </div>

      <p>{label}</p>

      <h1>{title}</h1>

      <span>{text}</span>

    </section>
  );
}