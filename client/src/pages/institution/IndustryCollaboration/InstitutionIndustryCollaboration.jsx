import { useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Handshake,
  MapPin,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

import "./InstitutionIndustryCollaboration.css";

const collaborations = [
  {
    id: 1,
    title: "Industry-Academia Partnership",
    company: "TechNova",
    type: "Partnership",
    description:
      "Long-term collaboration for internships, placements and industry-led skill development.",
    date: "Active since Jun 2025",
    participants: "BCA & B.Tech",
    status: "Active",
    color: "blue",
  },
  {
    id: 2,
    title: "Cloud Engineering Workshop",
    company: "CloudSoft",
    type: "Workshop",
    description:
      "Hands-on cloud engineering session covering modern deployment and infrastructure practices.",
    date: "18 Oct 2025",
    participants: "120 Students",
    status: "Upcoming",
    color: "cyan",
  },
  {
    id: 3,
    title: "Campus Data Analytics Project",
    company: "DataTech",
    type: "Industry Project",
    description:
      "Students work with industry mentors on a real-world analytics project.",
    date: "25 Oct 2025",
    participants: "32 Students",
    status: "In Progress",
    color: "violet",
  },
  {
    id: 4,
    title: "Full Stack Development Program",
    company: "WebSolve",
    type: "Training Program",
    description:
      "Industry-designed training program focused on full stack development and project delivery.",
    date: "Starts 02 Nov 2025",
    participants: "80 Students",
    status: "Upcoming",
    color: "orange",
  },
  {
    id: 5,
    title: "AI Career Mentorship",
    company: "AIWorks",
    type: "Training Program",
    description:
      "Mentorship sessions connecting students with professionals working in artificial intelligence.",
    date: "Starts 10 Nov 2025",
    participants: "50 Students",
    status: "Upcoming",
    color: "green",
  },
];

const types = [
  "All Types",
  "Partnership",
  "Workshop",
  "Industry Project",
  "Training Program",
];

const statuses = [
  "All Status",
  "Active",
  "Upcoming",
  "In Progress",
];

export default function InstitutionIndustryCollaboration() {
  const [activeTab, setActiveTab] = useState("partnerships");

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [status, setStatus] = useState("All Status");
  const [selectedCollaboration, setSelectedCollaboration] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const filteredCollaborations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return collaborations.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      const matchesType =
        type === "All Types" ||
        item.type === type;

      const matchesStatus =
        status === "All Status" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [search, type, status]);

  const visibleItems =
    activeTab === "partnerships"
      ? filteredCollaborations.filter(
          (item) => item.type === "Partnership"
        )
      : activeTab === "workshops"
      ? filteredCollaborations.filter(
          (item) => item.type === "Workshop"
        )
      : activeTab === "projects"
      ? filteredCollaborations.filter(
          (item) => item.type === "Industry Project"
        )
      : filteredCollaborations.filter(
          (item) => item.type === "Training Program"
        );

  return (
    <div className="institution-collaboration-page">

      {/* =================================================
          TABS
      ================================================= */}

      <nav className="institution-collaboration-tabs">

        <button
          type="button"
          className={
            activeTab === "partnerships"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("partnerships")
          }
        >
          Partnerships
        </button>

        <button
          type="button"
          className={
            activeTab === "workshops"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("workshops")
          }
        >
          Workshops & Events
        </button>

        <button
          type="button"
          className={
            activeTab === "projects"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("projects")
          }
        >
          Industry Projects
        </button>

        <button
          type="button"
          className={
            activeTab === "training"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("training")
          }
        >
          Training Programs
        </button>

      </nav>


      {/* =================================================
          HEADER
      ================================================= */}

      <section className="institution-collaboration-header">

        <div>

          <p className="institution-collaboration-eyebrow">
            INDUSTRY COLLABORATION
          </p>

          <h1>
            {activeTab === "partnerships"
              ? "Industry Partnerships"
              : activeTab === "workshops"
              ? "Workshops & Events"
              : activeTab === "projects"
              ? "Industry Projects"
              : "Training Programs"}
          </h1>

          <p>
            Build meaningful connections between your
            institution and industry partners.
          </p>

        </div>

        <button
          type="button"
          className="institution-collaboration-add"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus size={16} />
          Create Collaboration
        </button>

      </section>


      {/* =================================================
          HIGHLIGHT STRIP
      ================================================= */}

      <section className="institution-collaboration-highlights">

        <HighlightCard
          icon={<Handshake size={19} />}
          title="Partnerships"
          value={collaborations.filter((item) => item.type === "Partnership").length}
          text="Industry partnerships"
          color="blue"
        />

        <HighlightCard
          icon={<CalendarDays size={19} />}
          title="Events"
          value={collaborations.filter(
            (item) => item.type === "Workshop"
          ).length}
          text="Upcoming sessions"
          color="orange"
        />

        <HighlightCard
          icon={<Users size={19} />}
          title="Students"
          value="282"
          text="Industry-engaged students"
          color="green"
        />

        <HighlightCard
          icon={<Building2 size={19} />}
          title="Partners"
          value={new Set(
            collaborations.map((item) => item.company)
          ).size}
          text="Connected organizations"
          color="violet"
        />

      </section>


      {/* =================================================
          FILTER BAR
      ================================================= */}

      <section className="institution-collaboration-toolbar">

        <div className="institution-collaboration-search">

          <Search size={16} />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search collaborations..."
          />

        </div>

        <FilterSelect
          value={type}
          onChange={setType}
          options={types}
        />

        <FilterSelect
          value={status}
          onChange={setStatus}
          options={statuses}
        />

      </section>


      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="institution-collaboration-content">

        <div className="institution-collaboration-list">

          {visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <CollaborationCard
                key={item.id}
                item={item}
                onView={setSelectedCollaboration}
              />
            ))
          ) : (
            <div className="institution-collaboration-empty">

              <Handshake size={28} />

              <strong>
                No collaborations found
              </strong>

              <span>
                Try changing your filters or search.
              </span>

            </div>
          )}

        </div>


        {/* =================================================
            UPCOMING PANEL
        ================================================= */}

        <aside className="institution-upcoming-panel">

          <div className="institution-upcoming-header">

            <div>
              <span>
                CALENDAR
              </span>

              <h2>
                Upcoming
              </h2>
            </div>

            <CalendarDays size={19} />

          </div>


          <UpcomingEvent
            date="18"
            month="OCT"
            title="Cloud Engineering Workshop"
            company="CloudSoft"
            color="blue"
          />

          <UpcomingEvent
            date="25"
            month="OCT"
            title="Campus Data Analytics Project"
            company="DataTech"
            color="violet"
          />

          <UpcomingEvent
            date="02"
            month="NOV"
            title="Full Stack Development Program"
            company="WebSolve"
            color="orange"
          />

          <button
            type="button"
            className="institution-calendar-button"
            onClick={() => setShowCalendar(true)}
          >
            View collaboration calendar
            <ExternalLink size={13} />
          </button>

        </aside>

      </section>

      {selectedCollaboration && (
        <CollaborationDetailsModal
          item={selectedCollaboration}
          onClose={() => setSelectedCollaboration(null)}
        />
      )}

      {isCreateOpen && (
        <CreateCollaborationModal
          onClose={() => setIsCreateOpen(false)}
        />
      )}

      {showCalendar && (
        <CollaborationCalendarModal
          onClose={() => setShowCalendar(false)}
        />
      )}

    </div>
  );
}



/* =========================================================
   CREATE COLLABORATION MODAL
========================================================= */

function CreateCollaborationModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("Partnership");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !company.trim() ||
      !date.trim() ||
      !participants.trim()
    ) {
      return;
    }

    onClose();
  };

  return (
    <div
      className="institution-collaboration-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="institution-collaboration-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-collaboration-title"
      >
        <header className="institution-collaboration-modal-header">
          <div>
            <span>COLLABORATION MANAGEMENT</span>
            <h2 id="create-collaboration-title">
              Create Collaboration
            </h2>
            <p>
              Add collaboration details for your institution and industry
              partner.
            </p>
          </div>

          <button
            type="button"
            className="institution-collaboration-modal-close"
            onClick={onClose}
            aria-label="Close create collaboration"
          >
            <X size={18} />
          </button>
        </header>

        <form
          className="institution-collaboration-form"
          onSubmit={handleSubmit}
        >
          <label>
            <span>Collaboration Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Industry-Academia Partnership"
              required
            />
          </label>

          <label>
            <span>Company</span>
            <input
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="e.g. TechNova"
              required
            />
          </label>

          <div className="institution-collaboration-form-grid">
            <label>
              <span>Type</span>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                {types.slice(1).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Date</span>
              <input
                value={date}
                onChange={(event) => setDate(event.target.value)}
                placeholder="e.g. 18 Oct 2026"
                required
              />
            </label>
          </div>

          <label>
            <span>Participants</span>
            <input
              value={participants}
              onChange={(event) => setParticipants(event.target.value)}
              placeholder="e.g. 120 Students"
              required
            />
          </label>

          <label>
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the collaboration..."
              rows={4}
            />
          </label>

          <div className="institution-collaboration-form-actions">
            <button
              type="button"
              className="institution-collaboration-modal-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="institution-collaboration-modal-primary"
            >
              <Plus size={14} />
              Create Collaboration
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}


/* =========================================================
   COLLABORATION DETAILS MODAL
========================================================= */

function CollaborationDetailsModal({ item, onClose }) {
  return (
    <div
      className="institution-collaboration-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="institution-collaboration-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collaboration-details-title"
      >
        <header className="institution-collaboration-modal-header">
          <div>
            <span>{item.type.toUpperCase()}</span>
            <h2 id="collaboration-details-title">{item.title}</h2>
            <p>{item.company}</p>
          </div>

          <button
            type="button"
            className="institution-collaboration-modal-close"
            onClick={onClose}
            aria-label="Close collaboration details"
          >
            <X size={18} />
          </button>
        </header>

        <div className="institution-collaboration-modal-body">
          <div className="institution-collaboration-detail-status">
            <span
              className={`institution-collaboration-status ${item.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {item.status}
            </span>
          </div>

          <p className="institution-collaboration-detail-description">
            {item.description}
          </p>

          <div className="institution-collaboration-detail-grid">
            <div>
              <span>Company</span>
              <strong>{item.company}</strong>
            </div>
            <div>
              <span>Type</span>
              <strong>{item.type}</strong>
            </div>
            <div>
              <span>Date</span>
              <strong>{item.date}</strong>
            </div>
            <div>
              <span>Participants</span>
              <strong>{item.participants}</strong>
            </div>
          </div>
        </div>

        <footer className="institution-collaboration-modal-footer">
          <button
            type="button"
            className="institution-collaboration-modal-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}


/* =========================================================
   COLLABORATION CALENDAR MODAL
========================================================= */

function CollaborationCalendarModal({ onClose }) {
  const events = collaborations.filter(
    (item) => item.status !== "Active"
  );

  return (
    <div
      className="institution-collaboration-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="institution-collaboration-modal institution-collaboration-calendar-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collaboration-calendar-title"
      >
        <header className="institution-collaboration-modal-header">
          <div>
            <span>COLLABORATION CALENDAR</span>
            <h2 id="collaboration-calendar-title">
              Upcoming Collaborations
            </h2>
            <p>Upcoming workshops, projects and training programs.</p>
          </div>

          <button
            type="button"
            className="institution-collaboration-modal-close"
            onClick={onClose}
            aria-label="Close collaboration calendar"
          >
            <X size={18} />
          </button>
        </header>

        <div className="institution-collaboration-calendar-list">
          {events.map((item) => (
            <div
              className="institution-collaboration-calendar-item"
              key={item.id}
            >
              <span className={`institution-calendar-dot ${item.color}`} />
              <span className="institution-calendar-item-main">
                <strong>{item.title}</strong>
                <small>
                  {item.company} · {item.date}
                </small>
              </span>
              <span className="institution-calendar-item-status">
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <footer className="institution-collaboration-modal-footer">
          <button
            type="button"
            className="institution-collaboration-modal-primary"
            onClick={onClose}
          >
            Done
          </button>
        </footer>
      </section>
    </div>
  );
}


/* =========================================================
   HIGHLIGHT CARD
========================================================= */

function HighlightCard({
  icon,
  title,
  value,
  text,
  color,
}) {
  return (
    <div
      className={`institution-collaboration-highlight ${color}`}
    >

      <div className="institution-highlight-icon">
        {icon}
      </div>

      <div className="institution-highlight-content">

        <span>{title}</span>

        <strong>{value}</strong>

        <small>{text}</small>

      </div>

    </div>
  );
}


/* =========================================================
   FILTER
========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="institution-collaboration-filter">

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


/* =========================================================
   COLLABORATION CARD
========================================================= */

function CollaborationCard({ item, onView }) {
  return (
    <article className="institution-collaboration-card">

      <div
        className={`institution-collaboration-icon ${item.color}`}
      >
        {item.type === "Partnership" ? (
          <Handshake size={21} />
        ) : item.type === "Workshop" ? (
          <CalendarDays size={21} />
        ) : item.type === "Industry Project" ? (
          <Building2 size={21} />
        ) : (
          <GraduationCap size={21} />
        )}
      </div>


      <div className="institution-collaboration-main">

        <div className="institution-collaboration-title-row">

          <div>

            <span className="institution-collaboration-type">
              {item.type}
            </span>

            <h2>{item.title}</h2>

            <div className="institution-collaboration-company">

              <Building2 size={13} />

              <span>{item.company}</span>

            </div>

          </div>

          <span
            className={`institution-collaboration-status ${item.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {item.status}
          </span>

        </div>


        <p className="institution-collaboration-description">
          {item.description}
        </p>


        <div className="institution-collaboration-meta">

          <span>
            <CalendarDays size={13} />
            {item.date}
          </span>

          <span>
            <Users size={13} />
            {item.participants}
          </span>

        </div>

      </div>


      <button
        type="button"
        className="institution-collaboration-view"
        onClick={() => onView(item)}
      >
        View
        <ExternalLink size={13} />
      </button>

    </article>
  );
}


/* =========================================================
   UPCOMING EVENT
========================================================= */

function UpcomingEvent({
  date,
  month,
  title,
  company,
  color,
}) {
  return (
    <div className="institution-upcoming-event">

      <div
        className={`institution-event-date ${color}`}
      >
        <strong>{date}</strong>
        <span>{month}</span>
      </div>

      <div className="institution-event-info">

        <strong>{title}</strong>

        <span>
          <Building2 size={11} />
          {company}
        </span>

      </div>

    </div>
  );
}