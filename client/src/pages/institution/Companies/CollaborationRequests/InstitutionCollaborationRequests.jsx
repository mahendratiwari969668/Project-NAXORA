import { useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Mail,
  MapPin,
  MessageSquare,
  RotateCcw,
  Search,
  UsersRound,
  X,
  XCircle,
} from "lucide-react";
import "./InstitutionCollaborationRequests.css";

const initialRequests = [
  {
    id: 1,
    company: "TechNova",
    industry: "Information Technology",
    type: "Placement Partnership",
    contactPerson: "Aarav Mehta",
    email: "partnerships@technova.example",
    location: "Bengaluru",
    receivedOn: "28 Sep 2026",
    proposedDate: "15 Oct 2026",
    openings: 12,
    status: "Pending",
    message:
      "We would like to collaborate with the institution for our upcoming campus placement program for BCA and B.Tech students.",
  },
  {
    id: 2,
    company: "CloudSoft",
    industry: "Cloud Services",
    type: "Internship Program",
    contactPerson: "Riya Kapoor",
    email: "campus@cloudsoft.example",
    location: "Hyderabad",
    receivedOn: "24 Sep 2026",
    proposedDate: "20 Oct 2026",
    openings: 8,
    status: "Approved",
    message:
      "CloudSoft is interested in offering structured internship opportunities with mentor support and project-based learning.",
  },
  {
    id: 3,
    company: "DataTech",
    industry: "Data & Analytics",
    type: "Placement Partnership",
    contactPerson: "Kabir Singh",
    email: "university@datatech.example",
    location: "Pune",
    receivedOn: "21 Sep 2026",
    proposedDate: "05 Nov 2026",
    openings: 6,
    status: "Pending",
    message:
      "We are seeking an academic partner for our graduate hiring initiative focused on analytics and software roles.",
  },
  {
    id: 4,
    company: "InnovateLab",
    industry: "Software Development",
    type: "Industry Collaboration",
    contactPerson: "Ananya Sharma",
    email: "collab@innovatelab.example",
    location: "Noida",
    receivedOn: "17 Sep 2026",
    proposedDate: "18 Nov 2026",
    openings: 5,
    status: "Rejected",
    message:
      "We proposed a joint industry-academia program involving technical workshops, hiring sessions and student projects.",
  },
  {
    id: 5,
    company: "WebSolve",
    industry: "Web Development",
    type: "Placement Partnership",
    contactPerson: "Vivek Rao",
    email: "careers@websolve.example",
    location: "Remote / Delhi",
    receivedOn: "14 Sep 2026",
    proposedDate: "25 Nov 2026",
    openings: 4,
    status: "Pending",
    message:
      "WebSolve would like to participate in the institution's placement program for full-stack development roles.",
  },
];

const statusOptions = ["All Status", "Pending", "Approved", "Rejected"];
const typeOptions = [
  "All Types",
  "Placement Partnership",
  "Internship Program",
  "Industry Collaboration",
];

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

export default function InstitutionCollaborationRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Types");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = useMemo(() => {
    const query = normalize(search);

    return requests.filter((request) => {
      const matchesStatus =
        status === "All Status" || request.status === status;

      const matchesType = type === "All Types" || request.type === type;

      const matchesSearch =
        !query ||
        [
          request.company,
          request.industry,
          request.type,
          request.contactPerson,
          request.location,
        ].some((value) => normalize(value).includes(query));

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [requests, status, type, search]);

  const counts = useMemo(
    () => ({
      total: requests.length,
      pending: requests.filter((item) => item.status === "Pending").length,
      approved: requests.filter((item) => item.status === "Approved").length,
      rejected: requests.filter((item) => item.status === "Rejected").length,
    }),
    [requests]
  );

  const updateStatus = (id, nextStatus) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status: nextStatus } : request
      )
    );

    setSelectedRequest((current) =>
      current && current.id === id
        ? { ...current, status: nextStatus }
        : current
    );
  };

  const handleApprove = (id) => {
    updateStatus(id, "Approved");
  };

  const handleReject = (id) => {
    updateStatus(id, "Rejected");
  };

  const handleReopen = (id) => {
    updateStatus(id, "Pending");
  };

  const resetFilters = () => {
    setStatus("All Status");
    setType("All Types");
    setSearch("");
  };

  const clearIfEmpty = () => {
    if (status !== "All Status" || type !== "All Types" || search.trim()) {
      resetFilters();
    }
  };

  return (
    <section className="institution-collaboration-requests-page">
      <header className="institution-collaboration-requests-header">
        <div>
          <p className="institution-collaboration-requests-eyebrow">
            INDUSTRY NETWORK
          </p>
          <h1>Collaboration Requests</h1>
          <p>
            Review and manage partnership requests received from connected
            companies.
          </p>
        </div>

        <div className="institution-collaboration-request-header-count">
          <MessageSquare size={17} />
          <span>{counts.pending} pending review</span>
        </div>
      </header>

      <div className="institution-collaboration-request-summary">
        <SummaryCard label="Total Requests" value={counts.total} icon={<MessageSquare />} />
        <SummaryCard label="Pending" value={counts.pending} icon={<Clock3 />} />
        <SummaryCard label="Approved" value={counts.approved} icon={<CheckCircle2 />} />
        <SummaryCard label="Rejected" value={counts.rejected} icon={<XCircle />} />
      </div>

      <div className="institution-collaboration-request-toolbar">
        <div className="institution-collaboration-request-search">
          <Search size={16} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search company, industry, contact..."
            aria-label="Search collaboration requests"
          />
        </div>

        <SelectFilter
          value={type}
          onChange={setType}
          options={typeOptions}
          ariaLabel="Filter by request type"
        />

        <SelectFilter
          value={status}
          onChange={setStatus}
          options={statusOptions}
          ariaLabel="Filter by status"
        />

        <button
          type="button"
          className="institution-collaboration-request-reset"
          onClick={resetFilters}
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="institution-collaboration-request-list">
        <div className="institution-collaboration-request-list-header">
          <div>
            <span>REQUESTS</span>
            <strong>
              {filteredRequests.length}{" "}
              {filteredRequests.length === 1 ? "request" : "requests"}
            </strong>
          </div>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="institution-collaboration-request-grid">
            {filteredRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onView={() => setSelectedRequest(request)}
                onApprove={() => handleApprove(request.id)}
                onReject={() => handleReject(request.id)}
                onReopen={() => handleReopen(request.id)}
              />
            ))}
          </div>
        ) : (
          <div className="institution-collaboration-request-empty">
            <MessageSquare size={34} />
            <strong>No collaboration requests found</strong>
            <span>Try changing the search or filters.</span>
            <button type="button" onClick={clearIfEmpty}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={() => handleApprove(selectedRequest.id)}
          onReject={() => handleReject(selectedRequest.id)}
          onReopen={() => handleReopen(selectedRequest.id)}
        />
      )}
    </section>
  );
}

function SummaryCard({ label, value, icon }) {
  return (
    <div className="institution-collaboration-request-summary-card">
      <div className="institution-collaboration-request-summary-icon">
        {icon}
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function SelectFilter({ value, onChange, options, ariaLabel }) {
  return (
    <label className="institution-collaboration-request-filter">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={15} />
    </label>
  );
}

function RequestCard({
  request,
  onView,
  onApprove,
  onReject,
  onReopen,
}) {
  return (
    <article className="institution-collaboration-request-card">
      <div className="institution-collaboration-request-card-top">
        <div className="institution-collaboration-request-company-icon">
          <Building2 size={20} />
        </div>

        <div className="institution-collaboration-request-heading">
          <span>{request.company}</span>
          <h2>{request.type}</h2>
        </div>

        <RequestStatus status={request.status} />
      </div>

      <div className="institution-collaboration-request-meta">
        <span>
          <UsersRound size={13} />
          {request.contactPerson}
        </span>
        <span>
          <MapPin size={13} />
          {request.location}
        </span>
        <span>
          <CalendarDays size={13} />
          Received {request.receivedOn}
        </span>
      </div>

      <div className="institution-collaboration-request-info">
        <InfoBlock label="Industry" value={request.industry} />
        <InfoBlock label="Openings" value={request.openings} />
        <InfoBlock label="Proposed Date" value={request.proposedDate} />
      </div>

      <div className="institution-collaboration-request-card-footer">
        <span>{request.message}</span>

        <div className="institution-collaboration-request-actions">
          <button type="button" className="request-view-button" onClick={onView}>
            <Eye size={14} />
            View
          </button>

          {request.status === "Pending" && (
            <>
              <button
                type="button"
                className="request-approve-button"
                onClick={onApprove}
              >
                <Check size={14} />
                Approve
              </button>
              <button
                type="button"
                className="request-reject-button"
                onClick={onReject}
              >
                <X size={14} />
                Reject
              </button>
            </>
          )}

          {request.status === "Rejected" && (
            <button
              type="button"
              className="request-reopen-button"
              onClick={onReopen}
            >
              <RotateCcw size={14} />
              Reopen
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function RequestStatus({ status }) {
  const icon =
    status === "Approved" ? (
      <CheckCircle2 size={12} />
    ) : status === "Rejected" ? (
      <XCircle size={12} />
    ) : (
      <Clock3 size={12} />
    );

  return (
    <span
      className={`institution-collaboration-request-status ${normalize(
        status
      )}`}
    >
      {icon}
      {status}
    </span>
  );
}

function RequestDetailsModal({
  request,
  onClose,
  onApprove,
  onReject,
  onReopen,
}) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="institution-collaboration-request-modal-backdrop"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="institution-collaboration-request-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collaboration-request-modal-title"
      >
        <div className="institution-collaboration-request-modal-header">
          <div>
            <span>COLLABORATION REQUEST</span>
            <h2 id="collaboration-request-modal-title">{request.company}</h2>
            <p>{request.type}</p>
          </div>

          <button
            type="button"
            className="institution-collaboration-request-close"
            onClick={onClose}
            aria-label="Close request details"
          >
            <X size={19} />
          </button>
        </div>

        <div className="institution-collaboration-request-modal-body">
          <div className="institution-collaboration-request-detail-banner">
            <div className="institution-collaboration-request-company-icon">
              <Building2 size={22} />
            </div>

            <div>
              <strong>{request.industry}</strong>
              <span>{request.location}</span>
            </div>

            <RequestStatus status={request.status} />
          </div>

          <p className="institution-collaboration-request-description">
            {request.message}
          </p>

          <div className="institution-collaboration-request-detail-grid">
            <DetailItem label="Contact Person" value={request.contactPerson} />
            <DetailItem label="Email" value={request.email} />
            <DetailItem label="Openings" value={request.openings} />
            <DetailItem label="Received On" value={request.receivedOn} />
            <DetailItem label="Proposed Date" value={request.proposedDate} />
            <DetailItem label="Request Type" value={request.type} />
          </div>
        </div>

        <div className="institution-collaboration-request-modal-footer">
          <a
            className="request-contact-button"
            href={`mailto:${request.email}?subject=Regarding%20${encodeURIComponent(
              request.type
            )}%20-%20${encodeURIComponent(request.company)}`}
          >
            <Mail size={14} />
            Contact Company
          </a>

          <button
            type="button"
            className="request-secondary-button"
            onClick={onClose}
          >
            Close
          </button>

          {request.status === "Pending" && (
            <>
              <button
                type="button"
                className="request-reject-button"
                onClick={onReject}
              >
                <X size={14} />
                Reject
              </button>
              <button
                type="button"
                className="request-approve-button"
                onClick={onApprove}
              >
                <Check size={14} />
                Approve Request
              </button>
            </>
          )}

          {request.status === "Rejected" && (
            <button
              type="button"
              className="request-reopen-button"
              onClick={onReopen}
            >
              <RotateCcw size={14} />
              Reopen Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="institution-collaboration-request-detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
