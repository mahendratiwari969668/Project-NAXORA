import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  MoreVertical,
  Search,
  UserRound,
  X,
  Mail,
  MapPin,
  CalendarDays,
  BriefcaseBusiness,
} from "lucide-react";

import "./CompanyApplications.css";

const initialApplications = [
  {
    id: 1,
    candidate: "Rahul Sharma",
    role: "Frontend Intern",
    appliedOn: "12 Oct 2025",
    status: "New",
  },
  {
    id: 2,
    candidate: "Priya Singh",
    role: "Backend Intern",
    appliedOn: "11 Oct 2025",
    status: "Shortlisted",
  },
  {
    id: 3,
    candidate: "Aman Kumar",
    role: "Data Analyst Intern",
    appliedOn: "10 Oct 2025",
    status: "Interview",
  },
  {
    id: 4,
    candidate: "Sneha Verma",
    role: "Full Stack Developer",
    appliedOn: "10 Oct 2025",
    status: "Under Review",
  },
  {
    id: 5,
    candidate: "Rohit Kumar",
    role: "DevOps Engineer",
    appliedOn: "9 Oct 2025",
    status: "New",
  },
  {
    id: 6,
    candidate: "Anjali Patel",
    role: "UI/UX Designer Intern",
    appliedOn: "9 Oct 2025",
    status: "Rejected",
  },
  {
    id: 7,
    candidate: "Vikash Tiwari",
    role: "Backend Intern",
    appliedOn: "8 Oct 2025",
    status: "Shortlisted",
  },
  {
    id: 8,
    candidate: "Neha Yadav",
    role: "Data Analyst Intern",
    appliedOn: "8 Oct 2025",
    status: "Under Review",
  },
  {
    id: 9,
    candidate: "Karan Mishra",
    role: "Frontend Intern",
    appliedOn: "7 Oct 2025",
    status: "Interview",
  },
  {
    id: 10,
    candidate: "Aditya Gupta",
    role: "Full Stack Developer",
    appliedOn: "6 Oct 2025",
    status: "New",
  },
];

export default function CompanyApplications() {
  const [applications, setApplications] = useState(
    initialApplications
  );

  const [search, setSearch] = useState("");
  const [opportunityFilter, setOpportunityFilter] =
    useState("All Opportunities");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [timeFilter, setTimeFilter] =
    useState("All Time");

  const [sortBy, setSortBy] =
    useState("Latest");

  const [openMenu, setOpenMenu] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    /* SEARCH */
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((application) =>
        `${application.candidate} ${application.role} ${application.status}`
          .toLowerCase()
          .includes(query)
      );
    }

    /* OPPORTUNITY */
    if (
      opportunityFilter !== "All Opportunities"
    ) {
      result = result.filter(
        (application) =>
          application.role === opportunityFilter
      );
    }

    /* STATUS */
    if (statusFilter !== "All Status") {
      result = result.filter(
        (application) =>
          application.status === statusFilter
      );
    }

    /* SORT */
    if (sortBy === "Candidate") {
      result.sort((a, b) =>
        a.candidate.localeCompare(b.candidate)
      );
    }

    if (sortBy === "Role") {
      result.sort((a, b) =>
        a.role.localeCompare(b.role)
      );
    }

    return result;
  }, [
    applications,
    search,
    opportunityFilter,
    statusFilter,
    timeFilter,
    sortBy,
  ]);

  const openApplicationModal = (type, application) => {
    setOpenMenu(null);
    setActiveModal({ type, application });
  };

  const closeApplicationModal = () => {
    setActiveModal(null);
  };

  const handleDelete = (id) => {
    setApplications((current) =>
      current.filter(
        (application) => application.id !== id
      )
    );

    setOpenMenu(null);
    setActiveModal(null);
  };

  const handleStatusChange = (id, status) => {
    setApplications((current) =>
      current.map((application) =>
        application.id === id
          ? {
              ...application,
              status,
            }
          : application
      )
    );

    setOpenMenu(null);
    setActiveModal(null);
  };

  return (
    <main
      className="company-applications-page"
      onClick={() => setOpenMenu(null)}
    >
      {/* HEADER */}
      <div className="company-applications-header">
        <div>
          <p className="company-applications-eyebrow">
            TALENT MANAGEMENT
          </p>

          <h1>Applications</h1>

          <p>
            Review and manage candidates who have applied
            to your opportunities.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <section className="company-applications-filter-bar">
        {/* SEARCH */}
        <div className="company-applications-search">
          <Search size={16} />

          <input
            type="text"
            placeholder="Search applications by candidate name, role..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* OPPORTUNITY */}
        <FilterSelect
          value={opportunityFilter}
          onChange={(value) => {
            setOpportunityFilter(value);
            setCurrentPage(1);
          }}
          options={[
            "All Opportunities",
            "Frontend Intern",
            "Backend Intern",
            "Data Analyst Intern",
            "Full Stack Developer",
            "DevOps Engineer",
            "UI/UX Designer Intern",
          ]}
        />

        {/* STATUS */}
        <FilterSelect
          value={statusFilter}
          onChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          options={[
            "All Status",
            "New",
            "Under Review",
            "Shortlisted",
            "Interview",
            "Selected",
            "Rejected",
          ]}
        />

        {/* TIME */}
        <FilterSelect
          value={timeFilter}
          onChange={(value) => {
            setTimeFilter(value);
            setCurrentPage(1);
          }}
          options={[
            "All Time",
            "Today",
            "Last 7 Days",
            "Last 30 Days",
          ]}
        />

        {/* SORT */}
        <div className="company-applications-sort">
          <span>Sort by:</span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="Latest">Latest</option>
            <option value="Candidate">
              Candidate
            </option>
            <option value="Role">Role</option>
          </select>

          <ChevronDown size={14} />
        </div>
      </section>

      {/* TABLE */}
      <section className="company-applications-table-card">
        <div className="company-applications-table-wrapper">
          <table className="company-applications-table">
            <thead>
              <tr>
                <th className="application-number">
                  #
                </th>

                <th>Candidate</th>

                <th>Role</th>

                <th>Applied On</th>

                <th>Status</th>

                <th className="application-actions-heading">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map(
                  (application, index) => (
                    <tr key={application.id}>
                      {/* NUMBER */}
                      <td className="application-number">
                        {index + 1}
                      </td>

                      {/* CANDIDATE */}
                      <td>
                        <div className="application-candidate">
                          <div className="application-avatar">
                            <UserRound size={16} />
                          </div>

                          <div>
                            <strong>
                              {application.candidate}
                            </strong>

                            <small>
                              Application #
                              {String(
                                application.id
                              ).padStart(3, "0")}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* ROLE */}
                      <td>
                        <span className="application-role">
                          {application.role}
                        </span>
                      </td>

                      {/* DATE */}
                      <td>
                        <span className="application-date">
                          {application.appliedOn}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td>
                        <ApplicationStatus
                          status={application.status}
                        />
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div
                          className="application-actions"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          <button
                            type="button"
                            className="application-more"
                            onClick={() =>
                              setOpenMenu(
                                openMenu ===
                                  application.id
                                  ? null
                                  : application.id
                              )
                            }
                          >
                            <MoreVertical size={17} />
                          </button>

                          {openMenu ===
                            application.id && (
                            <div className="application-action-menu">
                              <button
                                type="button"
                                onClick={() =>
                                  openApplicationModal(
                                    "application",
                                    application
                                  )
                                }
                              >
                                <Eye size={14} />
                                View Application
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openApplicationModal(
                                    "candidate",
                                    application
                                  )
                                }
                              >
                                <UserRound size={14} />
                                View Candidate
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openApplicationModal(
                                    "resume",
                                    application
                                  )
                                }
                              >
                                <FileText size={14} />
                                Resume
                              </button>

                              <div className="application-menu-divider" />

                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(
                                    application.id,
                                    "Shortlisted"
                                  )
                                }
                              >
                                Shortlist
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(
                                    application.id,
                                    "Interview"
                                  )
                                }
                              >
                                Move to Interview
                              </button>

                              <button
                                type="button"
                                className="danger"
                                onClick={() =>
                                  handleStatusChange(
                                    application.id,
                                    "Rejected"
                                  )
                                }
                              >
                                Reject
                              </button>

                              <button
                                type="button"
                                className="danger"
                                onClick={() =>
                                  handleDelete(
                                    application.id
                                  )
                                }
                              >
                                Remove Application
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="company-applications-empty"
                  >
                    <div>
                      <Search size={28} />

                      <strong>
                        No applications found
                      </strong>

                      <span>
                        Try changing your search or
                        filters.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABLE FOOTER */}
        <div className="company-applications-footer">
          <span>
            Showing{" "}
            <strong>
              {filteredApplications.length}
            </strong>{" "}
            of{" "}
            <strong>{applications.length}</strong>{" "}
            applications
          </span>

          <div className="company-applications-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
            >
              <ChevronLeft size={14} />
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
                  Math.min(43, page + 1)
                )
              }
            >
              43
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(43, page + 1)
                )
              }
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {activeModal && (
        <ApplicationModal
          type={activeModal.type}
          application={activeModal.application}
          onClose={closeApplicationModal}
          onShortlist={() =>
            handleStatusChange(
              activeModal.application.id,
              "Shortlisted"
            )
          }
          onInterview={() =>
            handleStatusChange(
              activeModal.application.id,
              "Interview"
            )
          }
          onReject={() =>
            handleStatusChange(
              activeModal.application.id,
              "Rejected"
            )
          }
        />
      )}
    </main>
  );
}


function ApplicationModal({
  type,
  application,
  onClose,
  onShortlist,
  onInterview,
  onReject,
}) {
  const isApplication = type === "application";
  const isCandidate = type === "candidate";
  const isResume = type === "resume";

  const title = isApplication
    ? "Application Details"
    : isCandidate
      ? "Candidate Profile"
      : "Resume Preview";

  return (
    <div
      className="company-application-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="company-application-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="company-application-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="company-application-modal-header">
          <div>
            <span className="company-application-modal-eyebrow">
              {isResume ? "DOCUMENT" : "APPLICATION"}
            </span>
            <h2 id="company-application-modal-title">{title}</h2>
            <p>
              {application.candidate} · {application.role}
            </p>
          </div>

          <button
            type="button"
            className="company-application-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {isApplication && (
          <>
            <div className="company-application-modal-status-row">
              <span>Status</span>
              <ApplicationStatus status={application.status} />
            </div>

            <div className="company-application-modal-grid">
              <ModalInfo
                icon={<UserRound size={16} />}
                label="Candidate"
                value={application.candidate}
              />
              <ModalInfo
                icon={<BriefcaseBusiness size={16} />}
                label="Applied Role"
                value={application.role}
              />
              <ModalInfo
                icon={<CalendarDays size={16} />}
                label="Applied On"
                value={application.appliedOn}
              />
              <ModalInfo
                icon={<FileText size={16} />}
                label="Application ID"
                value={`#${String(application.id).padStart(3, "0")}`}
              />
            </div>

            <div className="company-application-modal-note">
              <strong>Application overview</strong>
              <p>
                Review the candidate's application status and move it
                through your hiring workflow using the actions below.
              </p>
            </div>

            <div className="company-application-modal-actions">
              <button type="button" onClick={onShortlist}>
                Shortlist
              </button>
              <button type="button" onClick={onInterview}>
                Move to Interview
              </button>
              <button
                type="button"
                className="danger"
                onClick={onReject}
              >
                Reject
              </button>
            </div>
          </>
        )}

        {isCandidate && (
          <>
            <div className="company-application-candidate-hero">
              <div className="company-application-candidate-avatar">
                <UserRound size={24} />
              </div>
              <div>
                <h3>{application.candidate}</h3>
                <p>{application.role}</p>
              </div>
            </div>

            <div className="company-application-modal-grid">
              <ModalInfo
                icon={<BriefcaseBusiness size={16} />}
                label="Current Application"
                value={application.status}
              />
              <ModalInfo
                icon={<CalendarDays size={16} />}
                label="Applied On"
                value={application.appliedOn}
              />
              <ModalInfo
                icon={<MapPin size={16} />}
                label="Preferred Location"
                value="Open to discussion"
              />
              <ModalInfo
                icon={<Mail size={16} />}
                label="Contact"
                value="Contact details available after selection"
              />
            </div>

            <div className="company-application-modal-note">
              <strong>Candidate profile</strong>
              <p>
                This profile view is ready for backend candidate data.
                Candidate information can be connected here later without
                changing the current UI workflow.
              </p>
            </div>

            <div className="company-application-modal-actions">
              <button type="button" onClick={onShortlist}>
                Shortlist
              </button>
              <button type="button" onClick={onInterview}>
                Move to Interview
              </button>
              <button
                type="button"
                className="danger"
                onClick={onReject}
              >
                Reject
              </button>
            </div>
          </>
        )}

        {isResume && (
          <>
            <div className="company-application-resume-preview">
              <div className="company-application-resume-icon">
                <FileText size={28} />
              </div>
              <div>
                <h3>{application.candidate} — Resume</h3>
                <p>
                  Resume preview for the applied role:
                  <strong> {application.role}</strong>
                </p>
              </div>
            </div>

            <div className="company-application-resume-sheet">
              <div className="resume-line resume-line-large" />
              <div className="resume-line resume-line-medium" />
              <div className="resume-section-label">PROFILE</div>
              <div className="resume-line" />
              <div className="resume-line resume-line-wide" />
              <div className="resume-line resume-line-medium" />
              <div className="resume-section-label">EXPERIENCE & SKILLS</div>
              <div className="resume-line resume-line-wide" />
              <div className="resume-line" />
              <div className="resume-line resume-line-medium" />
            </div>

            <p className="company-application-resume-note">
              Resume preview is shown as a safe local placeholder until the
              candidate resume file is connected through the backend.
            </p>
          </>
        )}

        <div className="company-application-modal-footer">
          <button
            type="button"
            className="company-application-modal-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalInfo({ icon, label, value }) {
  return (
    <div className="company-application-modal-info">
      <div className="company-application-modal-info-icon">
        {icon}
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="company-applications-select">
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown size={14} />
    </div>
  );
}

function ApplicationStatus({ status }) {
  const statusClass = status
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <span
      className={`application-status ${statusClass}`}
    >
      {status}
    </span>
  );
}