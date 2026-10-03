import { useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  GraduationCap,
  Mail,
  MapPin,
  Search,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import "./PlacementShortlisted.css";

const initialShortlisted = [
  {
    id: 1,
    studentName: "Ankit Verma",
    email: "ankit.verma@example.com",
    phone: "+91 91234 56780",
    course: "BCA",
    batch: "2026",
    role: "Associate Developer",
    company: "InnovateLab",
    package: "₹6-8 LPA",
    mode: "Hybrid",
    shortlistedOn: "09 Oct 2025",
    skills: ["Java", "Node.js", "MongoDB", "Git"],
    status: "Shortlisted",
  },
  {
    id: 2,
    studentName: "Sakshi Mishra",
    email: "sakshi.mishra@example.com",
    phone: "+91 95432 10987",
    course: "BCA",
    batch: "2026",
    role: "Associate Developer",
    company: "InnovateLab",
    package: "₹6-8 LPA",
    mode: "Hybrid",
    shortlistedOn: "13 Oct 2025",
    skills: ["JavaScript", "React", "REST API", "Git"],
    status: "Shortlisted",
  },
  {
    id: 3,
    studentName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    course: "BCA",
    batch: "2026",
    role: "Software Engineer",
    company: "TechCorp",
    package: "₹8-12 LPA",
    mode: "On Campus",
    shortlistedOn: "14 Oct 2025",
    skills: ["C++", "JavaScript", "React", "Git"],
    status: "Shortlisted",
  },
];

const driveOptions = [
  "All Drives",
  "Software Engineer - TechCorp",
  "Associate Developer - InnovateLab",
];

const batchOptions = ["All Batches", "2026", "2027"];

export default function PlacementShortlisted() {
  const [students, setStudents] = useState(initialShortlisted);
  const [drive, setDrive] = useState("All Drives");
  const [batch, setBatch] = useState("All Batches");
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const studentDrive = `${student.role} - ${student.company}`;
      const matchesDrive =
        drive === "All Drives" || studentDrive === drive;
      const matchesBatch =
        batch === "All Batches" || student.batch === batch;
      const matchesSearch =
        !query ||
        student.studentName.toLowerCase().includes(query) ||
        student.company.toLowerCase().includes(query) ||
        student.role.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query);

      return matchesDrive && matchesBatch && matchesSearch;
    });
  }, [students, drive, batch, search]);

  const updateStatus = (id, nextStatus) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, status: nextStatus } : student
      )
    );

    setSelectedStudent((current) =>
      current && current.id === id
        ? { ...current, status: nextStatus }
        : current
    );
  };

  const handleSelect = (id) => updateStatus(id, "Selected");

  const handleRemove = (id) => {
    setStudents((current) => current.filter((student) => student.id !== id));
    setSelectedStudent(null);
  };

  const handleRestore = (id) => updateStatus(id, "Shortlisted");

  const resetFilters = () => {
    setDrive("All Drives");
    setBatch("All Batches");
    setSearch("");
  };

  const shortlistedCount = students.filter(
    (student) => student.status === "Shortlisted"
  ).length;
  const selectedCount = students.filter(
    (student) => student.status === "Selected"
  ).length;

  return (
    <div className="placement-shortlisted-page">
      <section className="placement-shortlisted-header">
        <div>
          <p className="placement-shortlisted-eyebrow">SHORTLISTED</p>
          <h1>Shortlisted Students</h1>
          <p>
            Review shortlisted candidates and move them to final selection.
          </p>
        </div>

        <div className="placement-shortlisted-summary">
          <div>
            <strong>{students.length}</strong>
            <span>Total</span>
          </div>
          <div>
            <strong>{shortlistedCount}</strong>
            <span>Shortlisted</span>
          </div>
          <div>
            <strong>{selectedCount}</strong>
            <span>Selected</span>
          </div>
        </div>
      </section>

      <section className="placement-shortlisted-toolbar">
        <div className="placement-shortlisted-filter">
          <select value={drive} onChange={(event) => setDrive(event.target.value)}>
            {driveOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={14} />
        </div>

        <div className="placement-shortlisted-filter small">
          <select value={batch} onChange={(event) => setBatch(event.target.value)}>
            {batchOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={14} />
        </div>

        <div className="placement-shortlisted-search">
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
          className="placement-shortlisted-reset"
          onClick={resetFilters}
        >
          Reset
        </button>
      </section>

      <section className="placement-shortlisted-table-card">
        <div className="placement-shortlisted-table-header">
          <div>
            <span>SHORTLISTED LIST</span>
            <strong>
              {filteredStudents.length} candidate
              {filteredStudents.length !== 1 ? "s" : ""}
            </strong>
          </div>
        </div>

        {filteredStudents.length > 0 ? (
          <div className="placement-shortlisted-table-wrap">
            <table className="placement-shortlisted-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Drive</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="placement-shortlisted-student">
                        <div className="placement-shortlisted-avatar">
                          <UserRound size={17} />
                        </div>
                        <div>
                          <strong>{student.studentName}</strong>
                          <span>{student.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="placement-shortlisted-drive">
                        <strong>{student.role}</strong>
                        <span>{student.company}</span>
                      </div>
                    </td>
                    <td>{student.course}</td>
                    <td>{student.batch}</td>
                    <td>{student.package}</td>
                    <td>
                      <span className={`placement-shortlisted-status ${student.status.toLowerCase()}`}>
                        {student.status === "Selected" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Check size={12} />
                        )}
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <div className="placement-shortlisted-actions">
                        <button
                          type="button"
                          className="placement-shortlisted-view"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye size={14} />
                          View
                        </button>

                        {student.status === "Shortlisted" ? (
                          <button
                            type="button"
                            className="placement-shortlisted-select"
                            onClick={() => handleSelect(student.id)}
                          >
                            <CheckCircle2 size={14} />
                            Select
                          </button>
                        ) : (
                          <span className="placement-shortlisted-selected-label">
                            Selected
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="placement-shortlisted-empty">
            <GraduationCap size={28} />
            <strong>No shortlisted students found</strong>
            <span>Try changing your search or filters.</span>
            <button type="button" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {selectedStudent && (
        <ShortlistedDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSelect={handleSelect}
          onRemove={handleRemove}
          onRestore={handleRestore}
        />
      )}
    </div>
  );
}

function ShortlistedDetailsModal({
  student,
  onClose,
  onSelect,
  onRemove,
  onRestore,
}) {
  return (
    <div
      className="placement-shortlisted-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="placement-shortlisted-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortlisted-student-title"
      >
        <header className="placement-shortlisted-modal-header">
          <div>
            <span>SHORTLISTED CANDIDATE</span>
            <h2 id="shortlisted-student-title">{student.studentName}</h2>
            <p>{student.course} · Batch {student.batch}</p>
          </div>

          <button
            type="button"
            className="placement-shortlisted-close"
            onClick={onClose}
            aria-label="Close student details"
          >
            <X size={18} />
          </button>
        </header>

        <div className="placement-shortlisted-modal-body">
          <div className="placement-shortlisted-profile">
            <div className="placement-shortlisted-profile-icon">
              <UserRound size={27} />
            </div>
            <div>
              <strong>{student.studentName}</strong>
              <span><Mail size={13} /> {student.email}</span>
              <span><GraduationCap size={13} /> {student.course} · Batch {student.batch}</span>
            </div>
          </div>

          <div className="placement-shortlisted-info-grid">
            <InfoItem label="Applied For" value={student.role} />
            <InfoItem label="Company" value={student.company} />
            <InfoItem label="Package" value={student.package} />
            <InfoItem label="Mode" value={student.mode} />
            <InfoItem label="Shortlisted On" value={student.shortlistedOn} />
            <InfoItem label="Phone" value={student.phone} />
          </div>

          <div className="placement-shortlisted-modal-section">
            <span>SKILLS</span>
            <div className="placement-shortlisted-skills">
              {student.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="placement-shortlisted-modal-section">
            <span>STATUS</span>
            <span className={`placement-shortlisted-status ${student.status.toLowerCase()}`}>
              {student.status === "Selected" ? <CheckCircle2 size={12} /> : <Check size={12} />}
              {student.status}
            </span>
          </div>
        </div>

        <footer className="placement-shortlisted-modal-footer">
          <button
            type="button"
            className="placement-shortlisted-secondary"
            onClick={onClose}
          >
            Close
          </button>

          {student.status === "Shortlisted" && (
            <>
              <button
                type="button"
                className="placement-shortlisted-remove"
                onClick={() => onRemove(student.id)}
              >
                <XCircle size={15} />
                Remove
              </button>
              <button
                type="button"
                className="placement-shortlisted-select"
                onClick={() => onSelect(student.id)}
              >
                <CheckCircle2 size={15} />
                Mark Selected
              </button>
            </>
          )}

          {student.status === "Selected" && (
            <button
              type="button"
              className="placement-shortlisted-restore"
              onClick={() => onRestore(student.id)}
            >
              <Check size={15} />
              Move Back to Shortlisted
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="placement-shortlisted-info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
