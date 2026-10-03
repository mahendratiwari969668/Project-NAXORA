import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Eye,
  MapPin,
  Plus,
  Search,
  UsersRound,
  X,
  XCircle,
} from "lucide-react";
import "./InstitutionOpportunities.css";

const initialOpportunities = [
  {
    id: 1,
    company: "TechNova",
    role: "Software Engineer",
    type: "Placement",
    workMode: "On Campus",
    location: "Varanasi",
    package: "₹8-12 LPA",
    openings: 12,
    eligibility: "BCA, B.Tech",
    batch: "2026",
    deadline: "12 Oct 2026",
    status: "Open",
    description:
      "Campus hiring opportunity for students interested in software development and product engineering.",
    skills: ["JavaScript", "React", "Node.js"],
  },
  {
    id: 2,
    company: "CloudSoft",
    role: "Cloud Intern",
    type: "Internship",
    workMode: "Hybrid",
    location: "Remote / Varanasi",
    package: "₹25K/month",
    openings: 8,
    eligibility: "BCA, B.Sc CS",
    batch: "2026, 2027",
    deadline: "20 Oct 2026",
    status: "Open",
    description:
      "Internship opportunity focused on cloud fundamentals, deployment and modern infrastructure.",
    skills: ["AWS", "Linux", "Docker"],
  },
  {
    id: 3,
    company: "DataTech",
    role: "Data Analyst",
    type: "Placement",
    workMode: "On Campus",
    location: "Lucknow",
    package: "₹5-7 LPA",
    openings: 6,
    eligibility: "BCA, B.Sc IT",
    batch: "2026",
    deadline: "05 Nov 2026",
    status: "Open",
    description:
      "Entry-level analytics role involving data preparation, reporting and business insights.",
    skills: ["Python", "SQL", "Power BI"],
  },
  {
    id: 4,
    company: "InnovateLab",
    role: "Associate Developer",
    type: "Placement",
    workMode: "Hybrid",
    location: "Noida",
    package: "₹6-8 LPA",
    openings: 5,
    eligibility: "BCA, B.Sc CS",
    batch: "2026",
    deadline: "18 Nov 2026",
    status: "Draft",
    description:
      "Software development opportunity for students with strong programming and problem-solving fundamentals.",
    skills: ["Java", "Spring", "SQL"],
  },
  {
    id: 5,
    company: "WebSolve",
    role: "Frontend Intern",
    type: "Internship",
    workMode: "Remote",
    location: "Remote",
    package: "₹20K/month",
    openings: 4,
    eligibility: "BCA, B.Tech",
    batch: "2027",
    deadline: "25 Nov 2026",
    status: "Closed",
    description:
      "Frontend internship focused on building responsive interfaces and reusable UI components.",
    skills: ["React", "CSS", "Git"],
  },
];

const typeOptions = [
  "All Types",
  "Placement",
  "Internship",
];

const statusOptions = [
  "All Status",
  "Open",
  "Draft",
  "Closed",
];

const companyOptions = [
  "All Companies",
  "TechNova",
  "CloudSoft",
  "DataTech",
  "InnovateLab",
  "WebSolve",
];

const emptyForm = {
  company: "TechNova",
  role: "",
  type: "Placement",
  workMode: "On Campus",
  location: "",
  package: "",
  openings: "1",
  eligibility: "BCA",
  batch: "2026",
  deadline: "",
  status: "Draft",
  description: "",
  skills: "",
};

export default function InstitutionOpportunities() {
  const [opportunities, setOpportunities] = useState(
    initialOpportunities
  );
  const [type, setType] = useState("All Types");
  const [status, setStatus] = useState("All Status");
  const [company, setCompany] = useState("All Companies");
  const [search, setSearch] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] =
    useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return opportunities.filter((item) => {
      const matchesType =
        type === "All Types" || item.type === type;
      const matchesStatus =
        status === "All Status" || item.status === status;
      const matchesCompany =
        company === "All Companies" ||
        item.company === company;
      const matchesSearch =
        !query ||
        item.company.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      return (
        matchesType &&
        matchesStatus &&
        matchesCompany &&
        matchesSearch
      );
    });
  }, [opportunities, type, status, company, search]);

  const openCount = opportunities.filter(
    (item) => item.status === "Open"
  ).length;
  const internshipCount = opportunities.filter(
    (item) => item.type === "Internship"
  ).length;
  const placementCount = opportunities.filter(
    (item) => item.type === "Placement"
  ).length;

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setType("All Types");
    setStatus("All Status");
    setCompany("All Companies");
    setSearch("");
  };

  const openCreateForm = () => {
    setEditingOpportunity(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingOpportunity(item);
    setForm({
      company: item.company,
      role: item.role,
      type: item.type,
      workMode: item.workMode,
      location: item.location,
      package: item.package,
      openings: String(item.openings),
      eligibility: item.eligibility,
      batch: item.batch,
      deadline: item.deadline,
      status: item.status,
      description: item.description,
      skills: item.skills.join(", "),
    });
    setSelectedOpportunity(null);
    setIsFormOpen(true);
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (
      !form.company.trim() ||
      !form.role.trim() ||
      !form.location.trim() ||
      !form.package.trim() ||
      !form.deadline.trim()
    ) {
      return;
    }

    const data = {
      company: form.company.trim(),
      role: form.role.trim(),
      type: form.type,
      workMode: form.workMode,
      location: form.location.trim(),
      package: form.package.trim(),
      openings: Math.max(1, Number(form.openings) || 1),
      eligibility: form.eligibility.trim() || "BCA",
      batch: form.batch.trim() || "2026",
      deadline: form.deadline.trim(),
      status: form.status,
      description:
        form.description.trim() ||
        "Opportunity details will be shared with eligible students.",
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    if (editingOpportunity) {
      setOpportunities((current) =>
        current.map((item) =>
          item.id === editingOpportunity.id
            ? { ...item, ...data }
            : item
        )
      );
    } else {
      setOpportunities((current) => [
        {
          id: Date.now(),
          ...data,
        },
        ...current,
      ]);
    }

    setIsFormOpen(false);
    setEditingOpportunity(null);
    setForm(emptyForm);
  };

  const updateStatus = (id, nextStatus) => {
    setOpportunities((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: nextStatus }
          : item
      )
    );

    setSelectedOpportunity((current) =>
      current && current.id === id
        ? { ...current, status: nextStatus }
        : current
    );
  };

  const removeOpportunity = (id) => {
    const item = opportunities.find(
      (opportunity) => opportunity.id === id
    );

    if (!item) return;

    const confirmed = window.confirm(
      `Remove "${item.role}" at ${item.company}?`
    );

    if (!confirmed) return;

    setOpportunities((current) =>
      current.filter((opportunity) => opportunity.id !== id)
    );
    setSelectedOpportunity(null);
  };

  return (
    <div className="institution-opportunities-page">
      <section className="institution-opportunities-header">
        <div>
          <p className="institution-opportunities-eyebrow">
            INDUSTRY OPPORTUNITIES
          </p>
          <h1>Opportunities</h1>
          <p>
            Manage placement and internship opportunities
            shared with your students.
          </p>
        </div>

        <button
          type="button"
          className="institution-opportunities-add"
          onClick={openCreateForm}
        >
          <Plus size={16} />
          Add Opportunity
        </button>
      </section>

      <section className="institution-opportunities-summary">
        <div>
          <span>Total Opportunities</span>
          <strong>{opportunities.length}</strong>
        </div>
        <div>
          <span>Open</span>
          <strong>{openCount}</strong>
        </div>
        <div>
          <span>Placements</span>
          <strong>{placementCount}</strong>
        </div>
        <div>
          <span>Internships</span>
          <strong>{internshipCount}</strong>
        </div>
      </section>

      <section className="institution-opportunities-toolbar">
        <div className="institution-opportunities-filter">
          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value)
            }
          >
            {typeOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={14} />
        </div>

        <div className="institution-opportunities-filter">
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={14} />
        </div>

        <div className="institution-opportunities-filter company">
          <select
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
          >
            {companyOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown size={14} />
        </div>

        <div className="institution-opportunities-search">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search company, role or location..."
          />
        </div>

        <button
          type="button"
          className="institution-opportunities-reset"
          onClick={resetFilters}
        >
          Reset
        </button>
      </section>

      <section className="institution-opportunities-list">
        <div className="institution-opportunities-list-head">
          <div>
            <span>AVAILABLE OPPORTUNITIES</span>
            <strong>
              {filteredOpportunities.length} opportunity
              {filteredOpportunities.length !== 1 ? "ies" : ""}
            </strong>
          </div>
        </div>

        {filteredOpportunities.length > 0 ? (
          <div className="institution-opportunities-grid">
            {filteredOpportunities.map((item) => (
              <article
                className="institution-opportunity-card"
                key={item.id}
              >
                <div className="institution-opportunity-card-top">
                  <div className="institution-opportunity-company-icon">
                    <BriefcaseBusiness size={18} />
                  </div>

                  <div className="institution-opportunity-heading">
                    <span>{item.company}</span>
                    <h2>{item.role}</h2>
                  </div>

                  <span
                    className={`institution-opportunity-status ${item.status.toLowerCase()}`}
                  >
                    {item.status === "Open" ? (
                      <Check size={12} />
                    ) : item.status === "Closed" ? (
                      <XCircle size={12} />
                    ) : (
                      <Clock3 size={12} />
                    )}
                    {item.status}
                  </span>
                </div>

                <div className="institution-opportunity-meta">
                  <span>
                    <BriefcaseBusiness size={13} />
                    {item.type}
                  </span>
                  <span>
                    <MapPin size={13} />
                    {item.location}
                  </span>
                  <span>
                    <UsersRound size={13} />
                    {item.openings} openings
                  </span>
                </div>

                <div className="institution-opportunity-card-info">
                  <div>
                    <span>PACKAGE / STIPEND</span>
                    <strong>{item.package}</strong>
                  </div>
                  <div>
                    <span>ELIGIBILITY</span>
                    <strong>{item.eligibility}</strong>
                  </div>
                  <div>
                    <span>DEADLINE</span>
                    <strong>{item.deadline}</strong>
                  </div>
                </div>

                <div className="institution-opportunity-card-footer">
                  <span>
                    Batch {item.batch} · {item.workMode}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedOpportunity(item)
                    }
                  >
                    <Eye size={14} />
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="institution-opportunities-empty">
            <BriefcaseBusiness size={30} />
            <strong>No opportunities found</strong>
            <span>
              Try changing your filters or add a new
              opportunity.
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

      {selectedOpportunity && (
        <OpportunityDetailsModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onEdit={() =>
            openEditForm(selectedOpportunity)
          }
          onStatusChange={updateStatus}
          onRemove={removeOpportunity}
        />
      )}

      {isFormOpen && (
        <OpportunityFormModal
          form={form}
          isEditing={Boolean(editingOpportunity)}
          onChange={updateForm}
          onClose={() => {
            setIsFormOpen(false);
            setEditingOpportunity(null);
            setForm(emptyForm);
          }}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
}

function OpportunityDetailsModal({
  opportunity,
  onClose,
  onEdit,
  onStatusChange,
  onRemove,
}) {
  return (
    <div
      className="institution-opportunities-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="institution-opportunities-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="opportunity-details-title"
      >
        <header className="institution-opportunities-modal-header">
          <div>
            <span>OPPORTUNITY DETAILS</span>
            <h2 id="opportunity-details-title">
              {opportunity.role}
            </h2>
            <p>
              {opportunity.company} · {opportunity.type}
            </p>
          </div>

          <button
            type="button"
            className="institution-opportunities-close"
            onClick={onClose}
            aria-label="Close opportunity details"
          >
            <X size={18} />
          </button>
        </header>

        <div className="institution-opportunities-modal-body">
          <div className="institution-opportunity-detail-banner">
            <div className="institution-opportunity-company-icon">
              <BriefcaseBusiness size={24} />
            </div>
            <div>
              <strong>{opportunity.company}</strong>
              <span>{opportunity.location}</span>
            </div>
            <span
              className={`institution-opportunity-status ${opportunity.status.toLowerCase()}`}
            >
              {opportunity.status}
            </span>
          </div>

          <p className="institution-opportunity-description">
            {opportunity.description}
          </p>

          <div className="institution-opportunity-detail-grid">
            <InfoItem
              icon={<BriefcaseBusiness size={14} />}
              label="Type"
              value={opportunity.type}
            />
            <InfoItem
              icon={<UsersRound size={14} />}
              label="Openings"
              value={String(opportunity.openings)}
            />
            <InfoItem
              icon={<MapPin size={14} />}
              label="Work Mode"
              value={opportunity.workMode}
            />
            <InfoItem
              icon={<CalendarDays size={14} />}
              label="Deadline"
              value={opportunity.deadline}
            />
            <InfoItem
              icon={<UsersRound size={14} />}
              label="Eligibility"
              value={opportunity.eligibility}
            />
            <InfoItem
              icon={<BriefcaseBusiness size={14} />}
              label="Package / Stipend"
              value={opportunity.package}
            />
          </div>

          <div className="institution-opportunity-detail-section">
            <span>REQUIRED SKILLS</span>
            <div className="institution-opportunity-skills">
              {opportunity.skills.length > 0 ? (
                opportunity.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))
              ) : (
                <em>No specific skills listed</em>
              )}
            </div>
          </div>

          <div className="institution-opportunity-detail-section">
            <span>OPPORTUNITY STATUS</span>
            <div className="institution-opportunity-status-select">
              <select
                value={opportunity.status}
                onChange={(event) =>
                  onStatusChange(
                    opportunity.id,
                    event.target.value
                  )
                }
              >
                {statusOptions
                  .filter(
                    (option) => option !== "All Status"
                  )
                  .map((option) => (
                    <option key={option}>{option}</option>
                  ))}
              </select>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <footer className="institution-opportunities-modal-footer">
          <button
            type="button"
            className="institution-opportunities-secondary"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="institution-opportunities-danger"
            onClick={() => onRemove(opportunity.id)}
          >
            <XCircle size={14} />
            Remove
          </button>

          <button
            type="button"
            className="institution-opportunities-secondary"
            onClick={onEdit}
          >
            Edit Opportunity
          </button>

          <button
            type="button"
            className="institution-opportunities-primary"
            onClick={() =>
              onStatusChange(opportunity.id, "Open")
            }
          >
            <Check size={14} />
            Mark Open
          </button>
        </footer>
      </section>
    </div>
  );
}

function OpportunityFormModal({
  form,
  isEditing,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className="institution-opportunities-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="institution-opportunities-modal institution-opportunity-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="opportunity-form-title"
      >
        <header className="institution-opportunities-modal-header">
          <div>
            <span>OPPORTUNITY MANAGEMENT</span>
            <h2 id="opportunity-form-title">
              {isEditing
                ? "Edit Opportunity"
                : "Add Opportunity"}
            </h2>
            <p>
              Manage the opportunity details shown to eligible
              students.
            </p>
          </div>

          <button
            type="button"
            className="institution-opportunities-close"
            onClick={onClose}
            aria-label="Close opportunity form"
          >
            <X size={18} />
          </button>
        </header>

        <form
          className="institution-opportunity-form"
          onSubmit={onSubmit}
        >
          <FormInput
            label="Company"
            value={form.company}
            onChange={(value) =>
              onChange("company", value)
            }
            placeholder="e.g. TechNova"
            required
          />

          <FormInput
            label="Role"
            value={form.role}
            onChange={(value) =>
              onChange("role", value)
            }
            placeholder="e.g. Software Engineer"
            required
          />

          <FormSelect
            label="Type"
            value={form.type}
            onChange={(value) => onChange("type", value)}
            options={["Placement", "Internship"]}
          />

          <FormSelect
            label="Work Mode"
            value={form.workMode}
            onChange={(value) =>
              onChange("workMode", value)
            }
            options={["On Campus", "Hybrid", "Remote"]}
          />

          <FormInput
            label="Location"
            value={form.location}
            onChange={(value) =>
              onChange("location", value)
            }
            placeholder="e.g. Varanasi"
            required
          />

          <FormInput
            label="Package / Stipend"
            value={form.package}
            onChange={(value) =>
              onChange("package", value)
            }
            placeholder="e.g. ₹8-12 LPA"
            required
          />

          <FormInput
            label="Openings"
            type="number"
            min="1"
            value={form.openings}
            onChange={(value) =>
              onChange("openings", value)
            }
            placeholder="e.g. 10"
            required
          />

          <FormInput
            label="Eligibility"
            value={form.eligibility}
            onChange={(value) =>
              onChange("eligibility", value)
            }
            placeholder="e.g. BCA, B.Tech"
          />

          <FormInput
            label="Batch"
            value={form.batch}
            onChange={(value) =>
              onChange("batch", value)
            }
            placeholder="e.g. 2026"
          />

          <FormSelect
            label="Status"
            value={form.status}
            onChange={(value) =>
              onChange("status", value)
            }
            options={["Open", "Draft", "Closed"]}
          />

          <FormInput
            label="Deadline"
            value={form.deadline}
            onChange={(value) =>
              onChange("deadline", value)
            }
            placeholder="e.g. 12 Oct 2026"
            required
          />

          <FormInput
            label="Skills"
            value={form.skills}
            onChange={(value) =>
              onChange("skills", value)
            }
            placeholder="React, Node.js, MongoDB"
            wide
          />

          <label className="institution-opportunity-form-wide">
            <span>Description</span>
            <textarea
              value={form.description}
              onChange={(event) =>
                onChange(
                  "description",
                  event.target.value
                )
              }
              placeholder="Describe the opportunity..."
              rows={3}
            />
          </label>

          <div className="institution-opportunity-form-actions">
            <button
              type="button"
              className="institution-opportunities-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="institution-opportunities-primary"
            >
              <Check size={14} />
              {isEditing ? "Save Changes" : "Add Opportunity"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  required = false,
  wide = false,
}) {
  return (
    <label
      className={
        wide
          ? "institution-opportunity-form-wide"
          : undefined
      }
    >
      <span>{label}</span>
      <input
        type={type}
        min={min}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label>
      <span>{label}</span>
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
    </label>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="institution-opportunity-info-item">
      <span>
        {icon}
        {label}
      </span>
      <strong>{value}</strong>
    </div>
  );
}
