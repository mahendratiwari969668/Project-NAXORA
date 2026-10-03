import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  GraduationCap,
  Mail,
  Plus,
  Search,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import "./PlacementRecords.css";

const initialRecords = [
  {
    id: 1,
    studentName: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+91 98765 12345",
    rollNo: "BCA2026-041",
    course: "BCA",
    batch: "2026",
    company: "TechCorp",
    role: "Software Engineer",
    package: "₹10 LPA",
    mode: "On Campus",
    joiningDate: "15 Jun 2026",
    offerDate: "22 Oct 2025",
    status: "Placed",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    studentName: "Vivek Singh",
    email: "vivek.singh@example.com",
    phone: "+91 91234 67890",
    rollNo: "BCA2026-058",
    course: "BCA",
    batch: "2026",
    company: "InnovateLab",
    role: "Associate Developer",
    package: "₹7 LPA",
    mode: "Hybrid",
    joiningDate: "01 Jul 2026",
    offerDate: "28 Oct 2025",
    status: "Offer Pending",
    skills: ["Java", "Spring", "SQL", "Git"],
  },
  {
    id: 3,
    studentName: "Arjun Yadav",
    email: "arjun.yadav@example.com",
    phone: "+91 99887 66554",
    rollNo: "BCA2026-073",
    course: "BCA",
    batch: "2026",
    company: "DataTech",
    role: "Data Analyst",
    package: "₹6 LPA",
    mode: "On Campus",
    joiningDate: "10 Jul 2026",
    offerDate: "10 Nov 2025",
    status: "Placed",
    skills: ["Python", "SQL", "Excel", "Power BI"],
  },
  {
    id: 4,
    studentName: "Pooja Verma",
    email: "pooja.verma@example.com",
    phone: "+91 97654 32109",
    rollNo: "BCA2027-019",
    course: "BCA",
    batch: "2027",
    company: "WebSolve",
    role: "Full Stack Developer",
    package: "₹8 LPA",
    mode: "Hybrid",
    joiningDate: "20 Jun 2027",
    offerDate: "22 Nov 2025",
    status: "Selected",
    skills: ["React", "Node.js", "Express", "MongoDB"],
  },
];

const statusOptions = [
  "All Status",
  "Offer Pending",
  "Selected",
  "Placed",
  "Withdrawn",
];

const companyOptions = [
  "All Companies",
  "TechCorp",
  "InnovateLab",
  "DataTech",
  "WebSolve",
];

const batchOptions = ["All Batches", "2026", "2027"];

const emptyForm = {
  studentName: "",
  email: "",
  phone: "",
  rollNo: "",
  course: "BCA",
  batch: "2026",
  company: "",
  role: "",
  package: "",
  mode: "On Campus",
  joiningDate: "",
  offerDate: "",
  status: "Selected",
  skills: "",
};

export default function PlacementRecords() {
  const [records, setRecords] = useState(initialRecords);
  const [status, setStatus] = useState("All Status");
  const [company, setCompany] = useState("All Companies");
  const [batch, setBatch] = useState("All Batches");
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesStatus =
        status === "All Status" || record.status === status;
      const matchesCompany =
        company === "All Companies" || record.company === company;
      const matchesBatch =
        batch === "All Batches" || record.batch === batch;
      const matchesSearch =
        !query ||
        record.studentName.toLowerCase().includes(query) ||
        record.company.toLowerCase().includes(query) ||
        record.role.toLowerCase().includes(query) ||
        record.rollNo.toLowerCase().includes(query);

      return (
        matchesStatus &&
        matchesCompany &&
        matchesBatch &&
        matchesSearch
      );
    });
  }, [records, status, company, batch, search]);

  const updateStatus = (id, nextStatus) => {
    setRecords((current) =>
      current.map((record) =>
        record.id === id
          ? { ...record, status: nextStatus }
          : record
      )
    );

    setSelectedRecord((current) =>
      current && current.id === id
        ? { ...current, status: nextStatus }
        : current
    );
  };

  const removeRecord = (id) => {
    setRecords((current) =>
      current.filter((record) => record.id !== id)
    );
    setSelectedRecord(null);
  };

  const handleFormChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreateRecord = (event) => {
    event.preventDefault();

    const requiredFields = [
      form.studentName,
      form.email,
      form.rollNo,
      form.company,
      form.role,
      form.package,
      form.offerDate,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      return;
    }

    const newRecord = {
      id: Date.now(),
      ...form,
      studentName: form.studentName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || "Not provided",
      rollNo: form.rollNo.trim(),
      company: form.company.trim(),
      role: form.role.trim(),
      package: form.package.trim(),
      offerDate: form.offerDate.trim(),
      joiningDate: form.joiningDate.trim() || "Not confirmed",
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    setRecords((current) => [newRecord, ...current]);
    setForm(emptyForm);
    setIsCreateOpen(false);
  };

  const resetFilters = () => {
    setStatus("All Status");
    setCompany("All Companies");
    setBatch("All Batches");
    setSearch("");
  };

  const total = records.length;
  const placed = records.filter(
    (record) => record.status === "Placed"
  ).length;
  const selected = records.filter(
    (record) => record.status === "Selected"
  ).length;
  const pending = records.filter(
    (record) => record.status === "Offer Pending"
  ).length;

  return (
    <div className="placement-records-page">
      <section className="placement-records-header">
        <div>
          <p className="placement-records-eyebrow">
            PLACEMENT RECORDS
          </p>
          <h1>Placement Records</h1>
          <p>
            Maintain final student placement, offer and joining
            records in one place.
          </p>
        </div>

        <button
          type="button"
          className="placement-records-add-button"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus size={16} />
          Add Record
        </button>
      </section>

      <section className="placement-records-summary">
        <div>
          <span>Total Records</span>
          <strong>{total}</strong>
        </div>
        <div>
          <span>Placed</span>
          <strong>{placed}</strong>
        </div>
        <div>
          <span>Selected</span>
          <strong>{selected}</strong>
        </div>
        <div>
          <span>Offer Pending</span>
          <strong>{pending}</strong>
        </div>
      </section>

      <section className="placement-records-toolbar">
        <div className="placement-records-filter">
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown size={14} />
        </div>

        <div className="placement-records-filter company">
          <select
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
          >
            {companyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown size={14} />
        </div>

        <div className="placement-records-filter batch">
          <select
            value={batch}
            onChange={(event) =>
              setBatch(event.target.value)
            }
          >
            {batchOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown size={14} />
        </div>

        <div className="placement-records-search">
          <Search size={16} />
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search student, company or role..."
          />
        </div>

        <button
          type="button"
          className="placement-records-reset"
          onClick={resetFilters}
        >
          Reset
        </button>
      </section>

      <section className="placement-records-table-card">
        <div className="placement-records-table-top">
          <div>
            <span>FINAL PLACEMENT RECORDS</span>
            <strong>
              {filteredRecords.length} record
              {filteredRecords.length !== 1 ? "s" : ""}
            </strong>
          </div>
        </div>

        {filteredRecords.length > 0 ? (
          <div className="placement-records-table-wrap">
            <table className="placement-records-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Batch</th>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="placement-records-student">
                        <div className="placement-records-avatar">
                          <UserRound size={16} />
                        </div>
                        <div>
                          <strong>{record.studentName}</strong>
                          <span>{record.rollNo}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="placement-records-company">
                        <strong>{record.company}</strong>
                        <span>{record.mode}</span>
                      </div>
                    </td>

                    <td>{record.role}</td>
                    <td>{record.batch}</td>
                    <td>
                      <strong className="placement-records-package">
                        {record.package}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`placement-records-status ${record.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {record.status === "Placed" ? (
                          <CheckCircle2 size={12} />
                        ) : record.status === "Withdrawn" ? (
                          <XCircle size={12} />
                        ) : (
                          <Check size={12} />
                        )}
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="placement-records-view-button"
                        onClick={() =>
                          setSelectedRecord(record)
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
          <div className="placement-records-empty">
            <GraduationCap size={29} />
            <strong>No placement records found</strong>
            <span>
              Try changing your filters or add a new placement
              record.
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

      {selectedRecord && (
        <RecordDetailsModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onStatusChange={updateStatus}
          onRemove={removeRecord}
        />
      )}

      {isCreateOpen && (
        <CreateRecordModal
          form={form}
          onChange={handleFormChange}
          onClose={() => {
            setIsCreateOpen(false);
            setForm(emptyForm);
          }}
          onSubmit={handleCreateRecord}
        />
      )}
    </div>
  );
}

function RecordDetailsModal({
  record,
  onClose,
  onStatusChange,
  onRemove,
}) {
  return (
    <div
      className="placement-records-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="placement-records-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="placement-record-title"
      >
        <header className="placement-records-modal-header">
          <div>
            <span>PLACEMENT RECORD</span>
            <h2 id="placement-record-title">
              {record.studentName}
            </h2>
            <p>
              {record.company} · {record.role}
            </p>
          </div>

          <button
            type="button"
            className="placement-records-close"
            onClick={onClose}
            aria-label="Close placement record"
          >
            <X size={18} />
          </button>
        </header>

        <div className="placement-records-modal-body">
          <div className="placement-records-profile">
            <div className="placement-records-profile-icon">
              <UserRound size={26} />
            </div>
            <div>
              <strong>{record.studentName}</strong>
              <span>
                <Mail size={13} />
                {record.email}
              </span>
              <span>
                <GraduationCap size={13} />
                {record.course} · Batch {record.batch}
              </span>
            </div>
          </div>

          <div className="placement-records-info-grid">
            <InfoItem label="Roll Number" value={record.rollNo} />
            <InfoItem label="Company" value={record.company} />
            <InfoItem label="Role" value={record.role} />
            <InfoItem label="Package" value={record.package} />
            <InfoItem label="Work Mode" value={record.mode} />
            <InfoItem label="Offer Date" value={record.offerDate} />
            <InfoItem
              label="Joining Date"
              value={record.joiningDate}
            />
            <InfoItem label="Phone" value={record.phone} />
          </div>

          <div className="placement-records-modal-section">
            <span>SKILLS</span>
            <div className="placement-records-skills">
              {record.skills.length > 0 ? (
                record.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))
              ) : (
                <em>No skills added</em>
              )}
            </div>
          </div>

          <div className="placement-records-modal-section">
            <span>PLACEMENT STATUS</span>

            <div className="placement-records-status-controls">
              <select
                value={record.status}
                onChange={(event) =>
                  onStatusChange(
                    record.id,
                    event.target.value
                  )
                }
              >
                {statusOptions
                  .filter(
                    (option) => option !== "All Status"
                  )
                  .map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>

              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <footer className="placement-records-modal-footer">
          <button
            type="button"
            className="placement-records-secondary"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="placement-records-remove"
            onClick={() => onRemove(record.id)}
          >
            <XCircle size={15} />
            Remove Record
          </button>

          <button
            type="button"
            className="placement-records-primary"
            onClick={() =>
              onStatusChange(record.id, "Placed")
            }
          >
            <CheckCircle2 size={15} />
            Mark Placed
          </button>
        </footer>
      </section>
    </div>
  );
}

function CreateRecordModal({
  form,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className="placement-records-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="placement-records-modal placement-records-create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-placement-record-title"
      >
        <header className="placement-records-modal-header">
          <div>
            <span>PLACEMENT MANAGEMENT</span>
            <h2 id="create-placement-record-title">
              Add Placement Record
            </h2>
            <p>
              Add the final offer and placement details for a
              student.
            </p>
          </div>

          <button
            type="button"
            className="placement-records-close"
            onClick={onClose}
            aria-label="Close add placement record"
          >
            <X size={18} />
          </button>
        </header>

        <form
          className="placement-records-form"
          onSubmit={onSubmit}
        >
          <label>
            <span>Student Name</span>
            <input
              type="text"
              value={form.studentName}
              onChange={(event) =>
                onChange(
                  "studentName",
                  event.target.value
                )
              }
              placeholder="e.g. Rahul Sharma"
              required
            />
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                onChange("email", event.target.value)
              }
              placeholder="student@example.com"
              required
            />
          </label>

          <label>
            <span>Roll Number</span>
            <input
              type="text"
              value={form.rollNo}
              onChange={(event) =>
                onChange("rollNo", event.target.value)
              }
              placeholder="e.g. BCA2026-101"
              required
            />
          </label>

          <label>
            <span>Phone</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) =>
                onChange("phone", event.target.value)
              }
              placeholder="+91..."
            />
          </label>

          <label>
            <span>Company</span>
            <input
              type="text"
              value={form.company}
              onChange={(event) =>
                onChange("company", event.target.value)
              }
              placeholder="e.g. TechCorp"
              required
            />
          </label>

          <label>
            <span>Role</span>
            <input
              type="text"
              value={form.role}
              onChange={(event) =>
                onChange("role", event.target.value)
              }
              placeholder="e.g. Software Engineer"
              required
            />
          </label>

          <label>
            <span>Package</span>
            <input
              type="text"
              value={form.package}
              onChange={(event) =>
                onChange("package", event.target.value)
              }
              placeholder="e.g. ₹8 LPA"
              required
            />
          </label>

          <label>
            <span>Batch</span>
            <select
              value={form.batch}
              onChange={(event) =>
                onChange("batch", event.target.value)
              }
            >
              <option>2026</option>
              <option>2027</option>
            </select>
          </label>

          <label>
            <span>Work Mode</span>
            <select
              value={form.mode}
              onChange={(event) =>
                onChange("mode", event.target.value)
              }
            >
              <option>On Campus</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </label>

          <label>
            <span>Status</span>
            <select
              value={form.status}
              onChange={(event) =>
                onChange("status", event.target.value)
              }
            >
              {statusOptions
                .filter(
                  (option) => option !== "All Status"
                )
                .map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </label>

          <label>
            <span>Offer Date</span>
            <input
              type="text"
              value={form.offerDate}
              onChange={(event) =>
                onChange(
                  "offerDate",
                  event.target.value
                )
              }
              placeholder="e.g. 22 Oct 2025"
              required
            />
          </label>

          <label>
            <span>Joining Date</span>
            <input
              type="text"
              value={form.joiningDate}
              onChange={(event) =>
                onChange(
                  "joiningDate",
                  event.target.value
                )
              }
              placeholder="e.g. 15 Jun 2026"
            />
          </label>

          <label className="placement-records-form-wide">
            <span>Skills</span>
            <input
              type="text"
              value={form.skills}
              onChange={(event) =>
                onChange("skills", event.target.value)
              }
              placeholder="React, Node.js, MongoDB"
            />
          </label>

          <div className="placement-records-form-actions">
            <button
              type="button"
              className="placement-records-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="placement-records-primary"
            >
              <Plus size={15} />
              Add Record
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="placement-records-info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
