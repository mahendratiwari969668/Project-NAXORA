import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Search,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import "./PlacementApplications.css";

const initialApplications = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    course: "BCA",
    batch: "2026",
    role: "Software Engineer",
    company: "TechCorp",
    package: "₹8-12 LPA",
    mode: "On Campus",
    appliedOn: "08 Oct 2025",
    skills: ["C++", "JavaScript", "React", "Git"],
    status: "Pending",
  },
  {
    id: 2,
    studentName: "Ankit Verma",
    email: "ankit.verma@example.com",
    phone: "+91 91234 56780",
    course: "BCA",
    batch: "2026",
    role: "Associate Developer",
    company: "InnovateLab",
    package: "₹6-8 LPA",
    mode: "Hybrid",
    appliedOn: "09 Oct 2025",
    skills: ["Java", "Node.js", "MongoDB", "Git"],
    status: "Shortlisted",
  },
  {
    id: 3,
    studentName: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 99887 66554",
    course: "B.Sc CS",
    batch: "2026",
    role: "Data Analyst",
    company: "DataTech",
    package: "₹5-7 LPA",
    mode: "On Campus",
    appliedOn: "10 Oct 2025",
    skills: ["Python", "SQL", "Excel", "Power BI"],
    status: "Pending",
  },
  {
    id: 4,
    studentName: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+91 97654 32109",
    course: "BCA",
    batch: "2027",
    role: "Full Stack Developer",
    company: "WebSolve",
    package: "₹7-10 LPA",
    mode: "Hybrid",
    appliedOn: "11 Oct 2025",
    skills: ["React", "Node.js", "Express", "MongoDB"],
    status: "Selected",
  },
  {
    id: 5,
    studentName: "Aman Yadav",
    email: "aman.yadav@example.com",
    phone: "+91 96543 21098",
    course: "B.Tech",
    batch: "2026",
    role: "Software Engineer",
    company: "TechCorp",
    package: "₹8-12 LPA",
    mode: "On Campus",
    appliedOn: "12 Oct 2025",
    skills: ["C++", "DSA", "SQL", "Git"],
    status: "Rejected",
  },
  {
    id: 6,
    studentName: "Sakshi Mishra",
    email: "sakshi.mishra@example.com",
    phone: "+91 95432 10987",
    course: "BCA",
    batch: "2026",
    role: "Associate Developer",
    company: "InnovateLab",
    package: "₹6-8 LPA",
    mode: "Hybrid",
    appliedOn: "13 Oct 2025",
    skills: ["JavaScript", "React", "REST API", "Git"],
    status: "Pending",
  },
];

const statusOptions = [
  "All Status",
  "Pending",
  "Shortlisted",
  "Selected",
  "Rejected",
];

const batchOptions = ["All Batches", "2026", "2027"];

const driveOptions = [
  "All Drives",
  "Software Engineer - TechCorp",
  "Associate Developer - InnovateLab",
  "Data Analyst - DataTech",
  "Full Stack Developer - WebSolve",
];

export default function PlacementApplications() {
  const [applications, setApplications] = useState(initialApplications);
  const [status, setStatus] = useState("All Status");
  const [batch, setBatch] = useState("All Batches");
  const [drive, setDrive] = useState("All Drives");
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesStatus =
        status === "All Status" || application.status === status;

      const matchesBatch =
        batch === "All Batches" || application.batch === batch;

      const applicationDrive = `${application.role} - ${application.company}`;
      const matchesDrive =
        drive === "All Drives" || applicationDrive === drive;

      const matchesSearch =
        !query ||
        application.studentName.toLowerCase().includes(query) ||
        application.company.toLowerCase().includes(query) ||
        application.role.toLowerCase().includes(query) ||
        application.course.toLowerCase().includes(query);

      return (
        matchesStatus &&
        matchesBatch &&
        matchesDrive &&
        matchesSearch
      );
    });
  }, [applications, status, batch, drive, search]);

  const counts = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(
        (application) => application.status === "Pending"
      ).length,
      shortlisted: applications.filter(
        (application) => application.status === "Shortlisted"
      ).length,
      selected: applications.filter(
        (application) => application.status === "Selected"
      ).length,
    };
  }, [applications]);

  const updateStatus = (applicationId, nextStatus) => {
    setApplications((current) =>
      current.map((application) =>
        application.id === applicationId
          ? { ...application, status: nextStatus }
          : application
      )
    );

    setSelectedApplication((current) =>
      current && current.id === applicationId
        ? { ...current, status: nextStatus }
        : current
    );
  };

  const handleShortlist = (applicationId) => {
    updateStatus(applicationId, "Shortlisted");
  };

  const handleReject = (applicationId) => {
    updateStatus(applicationId, "Rejected");
  };

  const handleSelect = (applicationId) => {
    updateStatus(applicationId, "Selected");
  };

  const resetFilters = () => {
    setStatus("All Status");
    setBatch("All Batches");
    setDrive("All Drives");
    setSearch("");
  };

  return (
    <div className="placement-applications-page">
      <section className="placement-applications-header">
        <div>
          <p className="placement-applications-eyebrow">
            APPLICATIONS
          </p>

          <h1>Placement Applications</h1>

          <p>
            Review and manage student applications for campus
            placement drives.
          </p>
        </div>

        <div className="placement-application-summary">
          <div>
            <strong>{counts.total}</strong>
            <span>Total Applications</span>
          </div>

          <div>
            <strong>{counts.pending}</strong>
            <span>Pending Review</span>
          </div>

          <div>
            <strong>{counts.shortlisted}</strong>
            <span>Shortlisted</span>
          </div>
        </div>
      </section>

      <section className="placement-applications-toolbar">
        <div className="placement-application-filter">
          <select
            value={drive}
            onChange={(event) => setDrive(event.target.value)}
          >
            {driveOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <ChevronDown size={14} />
        </div>

        <div className="placement-application-filter">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <ChevronDown size={14} />
        </div>

        <div className="placement-application-filter small">
          <select
            value={batch}
            onChange={(event) => setBatch(event.target.value)}
          >
            {batchOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <ChevronDown size={14} />
        </div>

        <div className="placement-application-search">
          <Search size={16} />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search student, company or role..."
          />
        </div>

        <button
          type="button"
          className="placement-application-reset"
          onClick={resetFilters}
        >
          Reset
        </button>
      </section>

      <section className="placement-applications-table-card">
        <div className="placement-applications-table-header">
          <div>
            <span>APPLICATION LIST</span>
            <strong>
              {filteredApplications.length} application
              {filteredApplications.length !== 1 ? "s" : ""}
            </strong>
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="placement-applications-table-wrap">
            <table className="placement-applications-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Drive</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <div className="placement-student-cell">
                        <div className="placement-student-avatar">
                          <UserRound size={17} />
                        </div>

                        <div>
                          <strong>{application.studentName}</strong>
                          <span>{application.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="placement-drive-cell">
                        <strong>{application.role}</strong>
                        <span>{application.company}</span>
                      </div>
                    </td>

                    <td>{application.course}</td>

                    <td>{application.batch}</td>

                    <td>
                      <span className="placement-date-cell">
                        <CalendarDays size={13} />
                        {application.appliedOn}
                      </span>
                    </td>

                    <td>
                      <ApplicationStatus status={application.status} />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="placement-view-application"
                        onClick={() =>
                          setSelectedApplication(application)
                        }
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="placement-applications-empty">
            <FileText size={28} />

            <strong>No applications found</strong>

            <span>
              Try changing your search or filters.
            </span>

            <button
              type="button"
              onClick={resetFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onShortlist={handleShortlist}
          onReject={handleReject}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

function ApplicationStatus({ status }) {
  const className = status.toLowerCase();

  return (
    <span
      className={`placement-application-status ${className}`}
    >
      {status === "Selected" && <CheckCircle2 size={12} />}
      {status === "Shortlisted" && <Check size={12} />}
      {status === "Rejected" && <XCircle size={12} />}
      {status === "Pending" && <span className="status-dot" />}
      {status}
    </span>
  );
}

function ApplicationDetailsModal({
  application,
  onClose,
  onShortlist,
  onReject,
  onSelect,
}) {
  const handleShortlist = () => {
    onShortlist(application.id);
  };

  const handleReject = () => {
    onReject(application.id);
  };

  const handleSelect = () => {
    onSelect(application.id);
  };

  return (
    <div
      className="placement-application-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="placement-application-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="placement-application-modal-title"
      >
        <header className="placement-application-modal-header">
          <div>
            <span>APPLICATION DETAILS</span>

            <h2 id="placement-application-modal-title">
              {application.studentName}
            </h2>

            <p>
              {application.course} · {application.batch}
            </p>
          </div>

          <button
            type="button"
            className="placement-application-modal-close"
            onClick={onClose}
            aria-label="Close application details"
          >
            <X size={18} />
          </button>
        </header>

        <div className="placement-application-modal-body">
          <div className="placement-application-profile">
            <div className="placement-application-profile-icon">
              <UserRound size={27} />
            </div>

            <div>
              <strong>{application.studentName}</strong>

              <span>
                <Mail size={13} />
                {application.email}
              </span>

              <span>
                <GraduationCap size={13} />
                {application.course} · Batch {application.batch}
              </span>
            </div>
          </div>

          <div className="placement-application-info-grid">
            <InfoItem
              label="Applied For"
              value={application.role}
            />

            <InfoItem
              label="Company"
              value={application.company}
            />

            <InfoItem
              label="Package"
              value={application.package}
            />

            <InfoItem
              label="Placement Mode"
              value={application.mode}
            />

            <InfoItem
              label="Applied On"
              value={application.appliedOn}
            />

            <InfoItem
              label="Phone"
              value={application.phone}
            />
          </div>

          <div className="placement-application-modal-section">
            <span>SKILLS</span>

            <div className="placement-application-skills">
              {application.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="placement-application-modal-section">
            <span>APPLICATION STATUS</span>

            <ApplicationStatus status={application.status} />
          </div>
        </div>

        <footer className="placement-application-modal-footer">
          <button
            type="button"
            className="placement-application-secondary"
            onClick={onClose}
          >
            Close
          </button>

          {application.status === "Pending" && (
            <>
              <button
                type="button"
                className="placement-application-reject"
                onClick={handleReject}
              >
                <XCircle size={15} />
                Reject
              </button>

              <button
                type="button"
                className="placement-application-shortlist"
                onClick={handleShortlist}
              >
                <Check size={15} />
                Shortlist
              </button>
            </>
          )}

          {application.status === "Shortlisted" && (
            <>
              <button
                type="button"
                className="placement-application-reject"
                onClick={handleReject}
              >
                <XCircle size={15} />
                Reject
              </button>

              <button
                type="button"
                className="placement-application-select"
                onClick={handleSelect}
              >
                <CheckCircle2 size={15} />
                Mark Selected
              </button>
            </>
          )}

          {application.status === "Rejected" && (
            <button
              type="button"
              className="placement-application-shortlist"
              onClick={handleShortlist}
            >
              <Check size={15} />
              Shortlist Again
            </button>
          )}

          {application.status === "Selected" && (
            <span className="placement-application-selected-note">
              <CheckCircle2 size={16} />
              Student Selected
            </span>
          )}
        </footer>
      </section>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="placement-application-info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
