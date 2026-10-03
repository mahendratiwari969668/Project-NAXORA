import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  Edit3,
  Eye,
  FileText,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  X,
  Users,
  MapPin,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import "./CompanyJobs.css";

const initialOpportunities = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    type: "Internship",
    location: "Remote",
    applications: 84,
    deadline: "18 Oct 2025",
    status: "Active",
  },
  {
    id: 2,
    title: "Backend Developer",
    type: "Job",
    location: "Bengaluru",
    applications: 56,
    deadline: "22 Oct 2025",
    status: "Active",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    type: "Job",
    location: "Hybrid",
    applications: 42,
    deadline: "30 Oct 2025",
    status: "Active",
  },
  {
    id: 4,
    title: "Data Analyst Intern",
    type: "Internship",
    location: "Bengaluru",
    applications: 38,
    deadline: "25 Oct 2025",
    status: "Active",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    type: "Job",
    location: "Hybrid",
    applications: 21,
    deadline: "15 Nov 2025",
    status: "Active",
  },
  {
    id: 6,
    title: "UI/UX Designer Intern",
    type: "Internship",
    location: "Remote",
    applications: 17,
    deadline: "20 Oct 2025",
    status: "Draft",
  },
  {
    id: 7,
    title: "Product Manager",
    type: "Job",
    location: "Bengaluru",
    applications: 31,
    deadline: "28 Oct 2025",
    status: "Closed",
  },
  {
    id: 8,
    title: "Cloud Engineer Intern",
    type: "Internship",
    location: "Remote",
    applications: 26,
    deadline: "12 Nov 2025",
    status: "Active",
  },
];

const tabs = [
  { label: "All", key: "All" },
  { label: "Jobs", key: "Job" },
  { label: "Internships", key: "Internship" },
  { label: "Drafts", key: "Draft" },
  { label: "Active", key: "Active" },
  { label: "Closed", key: "Closed" },
];

export default function CompanyJobs() {
  const [opportunities, setOpportunities] = useState(
    initialOpportunities
  );

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("Latest");

  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [editOpportunity, setEditOpportunity] = useState(null);

  const [newOpportunity, setNewOpportunity] = useState({
    title: "",
    type: "Job",
    location: "Remote",
    deadline: "",
  });

  const filteredOpportunities = useMemo(() => {
    let result = [...opportunities];

    if (activeTab !== "All") {
      result = result.filter((item) => {
        if (activeTab === "Job") {
          return item.type === "Job";
        }

        if (activeTab === "Internship") {
          return item.type === "Internship";
        }

        if (activeTab === "Draft") {
          return item.status === "Draft";
        }

        if (activeTab === "Active") {
          return item.status === "Active";
        }

        if (activeTab === "Closed") {
          return item.status === "Closed";
        }

        return true;
      });
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      );
    }

    if (typeFilter !== "All Types") {
      result = result.filter(
        (item) => item.type === typeFilter
      );
    }

    if (statusFilter !== "All Status") {
      result = result.filter(
        (item) => item.status === statusFilter
      );
    }

    if (sortBy === "Applications") {
      result.sort(
        (a, b) => b.applications - a.applications
      );
    }

    if (sortBy === "Title") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [
    opportunities,
    activeTab,
    search,
    typeFilter,
    statusFilter,
    sortBy,
  ]);

  const getTabCount = (key) => {
    if (key === "All") {
      return opportunities.length;
    }

    if (key === "Job") {
      return opportunities.filter(
        (item) => item.type === "Job"
      ).length;
    }

    if (key === "Internship") {
      return opportunities.filter(
        (item) => item.type === "Internship"
      ).length;
    }

    if (key === "Draft") {
      return opportunities.filter(
        (item) => item.status === "Draft"
      ).length;
    }

    if (key === "Active") {
      return opportunities.filter(
        (item) => item.status === "Active"
      ).length;
    }

    if (key === "Closed") {
      return opportunities.filter(
        (item) => item.status === "Closed"
      ).length;
    }

    return 0;
  };

  const handleNewOpportunityChange = (event) => {
    const { name, value } = event.target;

    setNewOpportunity((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCreateOpportunity = (event) => {
    event.preventDefault();

    const newItem = {
      id: Date.now(),
      title: newOpportunity.title,
      type: newOpportunity.type,
      location: newOpportunity.location,
      applications: 0,
      deadline: newOpportunity.deadline
        ? new Date(
            newOpportunity.deadline
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Not set",
      status: "Draft",
    };

    setOpportunities((current) => [
      newItem,
      ...current,
    ]);

    setNewOpportunity({
      title: "",
      type: "Job",
      location: "Remote",
      deadline: "",
    });

    setShowCreateModal(false);
    setActiveTab("All");
  };

  const handleActionMenu = (event, id) => {
    event.stopPropagation();

    if (openMenu === id) {
      setOpenMenu(null);
      setMenuPosition(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const menuWidth = 160;
    const menuHeight = 180;
    const gap = 7;

    let left = rect.right - menuWidth;
    let top = rect.bottom + gap;

    if (left < 8) {
      left = 8;
    }

    if (left + menuWidth > window.innerWidth - 8) {
      left = window.innerWidth - menuWidth - 8;
    }

    if (top + menuHeight > window.innerHeight - 8) {
      top = rect.top - menuHeight - gap;
    }

    if (top < 8) {
      top = 8;
    }

    setOpenMenu(id);
    setMenuPosition({ top, left });
  };

  const handleViewOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpenMenu(null);
    setMenuPosition(null);
    setShowViewModal(true);
  };

  const handleEditOpportunity = (opportunity) => {
    setEditOpportunity({
      ...opportunity,
      deadline: toInputDate(opportunity.deadline),
    });
    setOpenMenu(null);
    setMenuPosition(null);
    setShowEditModal(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditOpportunity((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();

    if (!editOpportunity) {
      return;
    }

    const updatedOpportunity = {
      ...editOpportunity,
      deadline: editOpportunity.deadline
        ? formatDeadline(editOpportunity.deadline)
        : "Not set",
    };

    setOpportunities((current) =>
      current.map((item) =>
        item.id === updatedOpportunity.id
          ? updatedOpportunity
          : item
      )
    );

    setSelectedOpportunity(updatedOpportunity);
    setShowEditModal(false);
    setEditOpportunity(null);
  };

  const handleApplications = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setOpenMenu(null);
    setMenuPosition(null);
    setShowApplicationsModal(true);
  };

  const handleManageOpportunities = () => {
    setActiveTab("All");
    setSearch("");
    setTypeFilter("All Types");
    setStatusFilter("All Status");
    setSortBy("Latest");
    setOpenMenu(null);
    setMenuPosition(null);

    requestAnimationFrame(() => {
      document
        .querySelector(".company-jobs-table-card")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    });
  };

  const handleCloseModal = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowApplicationsModal(false);
    setSelectedOpportunity(null);
    setEditOpportunity(null);
  };

  const handleDelete = (id) => {
    setOpportunities((current) =>
      current.filter((item) => item.id !== id)
    );

    setOpenMenu(null);
    setMenuPosition(null);
  };

  return (
    <main
      className="company-jobs-page"
      onClick={() => {
        setOpenMenu(null);
        setMenuPosition(null);
      }}
    >
      {/* HEADER */}
      <div className="company-jobs-header">
        <div>
          <p className="company-jobs-eyebrow">
            COMPANY WORKSPACE
          </p>

          <h1>Jobs & Internships</h1>

          <p className="company-jobs-subtitle">
            Create, manage and track your company's hiring
            opportunities.
          </p>
        </div>

        <button
          type="button"
          className="company-jobs-create-button"
          onClick={(event) => {
            event.stopPropagation();
            setShowCreateModal(true);
          }}
        >
          <Plus size={17} />
          Create Opportunity
        </button>
      </div>

      {/* TABS */}
      <div className="company-jobs-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={
              activeTab === tab.key
                ? "company-jobs-tab active"
                : "company-jobs-tab"
            }
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span>{getTabCount(tab.key)}</span>
          </button>
        ))}
      </div>

      {/* FILTER BAR */}
      <section className="company-jobs-filter-card">
        <div className="company-jobs-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="company-jobs-select">
          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
          >
            <option>All Types</option>
            <option>Job</option>
            <option>Internship</option>
          </select>

          <ChevronDown size={15} />
        </div>

        <div className="company-jobs-select">
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Closed</option>
          </select>

          <ChevronDown size={15} />
        </div>

        <div className="company-jobs-select">
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option>Latest</option>
            <option>Applications</option>
            <option>Title</option>
          </select>

          <ChevronDown size={15} />
        </div>
      </section>

      {/* TABLE */}
      <section className="company-jobs-table-card">
        <div className="company-jobs-table-wrapper">
          <table className="company-jobs-table">
            <thead>
              <tr>
                <th className="company-jobs-number">#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Applications</th>
                <th>Deadline</th>
                <th>Status</th>
                <th className="company-jobs-actions-heading">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map(
                  (opportunity, index) => (
                    <tr key={opportunity.id}>
                      <td className="company-jobs-number">
                        {index + 1}
                      </td>

                      <td>
                        <div className="company-jobs-title-cell">
                          <span className="company-jobs-title-icon">
                            <BriefcaseBusiness size={15} />
                          </span>

                          <div>
                            <strong>
                              {opportunity.title}
                            </strong>
                            <small>
                              Opportunity #{opportunity.id}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={
                            opportunity.type ===
                            "Internship"
                              ? "company-jobs-type internship"
                              : "company-jobs-type job"
                          }
                        >
                          {opportunity.type}
                        </span>
                      </td>

                      <td>
                        <span className="company-jobs-location">
                          {opportunity.location}
                        </span>
                      </td>

                      <td>
                        <strong className="company-jobs-applications">
                          {opportunity.applications}
                        </strong>
                      </td>

                      <td>
                        <span className="company-jobs-deadline">
                          {opportunity.deadline}
                        </span>
                      </td>

                      <td>
                        <StatusBadge
                          status={opportunity.status}
                        />
                      </td>

                      <td>
                        <div
                          className="company-jobs-row-actions"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          <button
                            type="button"
                            className="company-jobs-more"
                            onClick={(event) =>
                              handleActionMenu(
                                event,
                                opportunity.id
                              )
                            }
                            aria-label="Opportunity actions"
                          >
                            <MoreVertical size={17} />
                          </button>

                          {openMenu === opportunity.id &&
                            menuPosition && (
                              <div
                                className="company-jobs-action-menu"
                                style={{
                                  top: `${menuPosition.top}px`,
                                  left: `${menuPosition.left}px`,
                                }}
                                onClick={(event) =>
                                  event.stopPropagation()
                                }
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleViewOpportunity(
                                      opportunity
                                    )
                                  }
                                >
                                  <Eye size={15} />
                                  View
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEditOpportunity(
                                      opportunity
                                    )
                                  }
                                >
                                  <Edit3 size={15} />
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleApplications(
                                      opportunity
                                    )
                                  }
                                >
                                  <FileText size={15} />
                                  Applications
                                </button>

                                <button
                                  type="button"
                                  className="danger"
                                  onClick={() =>
                                    handleDelete(
                                      opportunity.id
                                    )
                                  }
                                >
                                  <Trash2 size={15} />
                                  Delete
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
                    colSpan="8"
                    className="company-jobs-empty"
                  >
                    <div>
                      <Search size={25} />
                      <strong>
                        No opportunities found
                      </strong>
                      <span>
                        Try changing your search or filters.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="company-jobs-table-footer">
          <span>
            Showing{" "}
            <strong>
              {filteredOpportunities.length}
            </strong>{" "}
            of{" "}
            <strong>{opportunities.length}</strong>{" "}
            opportunities
          </span>

          <button
            type="button"
            className="company-jobs-view-all"
            onClick={handleManageOpportunities}
          >
            Manage opportunities
            <ChevronRight size={15} />
          </button>
        </div>
      </section>

      {/* VIEW OPPORTUNITY MODAL */}
      {showViewModal && selectedOpportunity && (
        <div
          className="company-jobs-modal-overlay"
          onClick={handleCloseModal}
        >
          <div
            className="company-jobs-modal company-jobs-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="company-jobs-modal-header">
              <div>
                <p>OPPORTUNITY DETAILS</p>
                <h2>{selectedOpportunity.title}</h2>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="company-jobs-details-grid">
              <div className="company-jobs-detail-card">
                <BriefcaseBusiness size={17} />
                <span>Type</span>
                <strong>{selectedOpportunity.type}</strong>
              </div>

              <div className="company-jobs-detail-card">
                <MapPin size={17} />
                <span>Location</span>
                <strong>{selectedOpportunity.location}</strong>
              </div>

              <div className="company-jobs-detail-card">
                <Users size={17} />
                <span>Applications</span>
                <strong>{selectedOpportunity.applications}</strong>
              </div>

              <div className="company-jobs-detail-card">
                <CalendarDays size={17} />
                <span>Deadline</span>
                <strong>{selectedOpportunity.deadline}</strong>
              </div>
            </div>

            <div className="company-jobs-modal-note">
              <CheckCircle2 size={16} />
              <span>
                This opportunity is currently marked as{" "}
                <strong>{selectedOpportunity.status}</strong>.
              </span>
            </div>

            <div className="company-jobs-modal-actions">
              <button
                type="button"
                className="company-jobs-modal-cancel"
                onClick={handleCloseModal}
              >
                Close
              </button>

              <button
                type="button"
                className="company-jobs-modal-submit"
                onClick={() => {
                  handleCloseModal();
                  handleEditOpportunity(selectedOpportunity);
                }}
              >
                Edit Opportunity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT OPPORTUNITY MODAL */}
      {showEditModal && editOpportunity && (
        <div
          className="company-jobs-modal-overlay"
          onClick={handleCloseModal}
        >
          <div
            className="company-jobs-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="company-jobs-modal-header">
              <div>
                <p>EDIT OPPORTUNITY</p>
                <h2>Update Opportunity</h2>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close edit form"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="company-jobs-modal-field">
                <label htmlFor="edit-opportunity-title">
                  Opportunity Title
                </label>

                <input
                  id="edit-opportunity-title"
                  name="title"
                  type="text"
                  value={editOpportunity.title}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="company-jobs-modal-grid">
                <div className="company-jobs-modal-field">
                  <label htmlFor="edit-opportunity-type">
                    Type
                  </label>

                  <select
                    id="edit-opportunity-type"
                    name="type"
                    value={editOpportunity.type}
                    onChange={handleEditChange}
                  >
                    <option>Job</option>
                    <option>Internship</option>
                  </select>
                </div>

                <div className="company-jobs-modal-field">
                  <label htmlFor="edit-opportunity-location">
                    Location
                  </label>

                  <select
                    id="edit-opportunity-location"
                    name="location"
                    value={editOpportunity.location}
                    onChange={handleEditChange}
                  >
                    <option>Remote</option>
                    <option>Bengaluru</option>
                    <option>Hybrid</option>
                    <option>Delhi NCR</option>
                    <option>Mumbai</option>
                  </select>
                </div>
              </div>

              <div className="company-jobs-modal-grid">
                <div className="company-jobs-modal-field">
                  <label htmlFor="edit-opportunity-deadline">
                    Application Deadline
                  </label>

                  <input
                    id="edit-opportunity-deadline"
                    name="deadline"
                    type="date"
                    value={editOpportunity.deadline}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="company-jobs-modal-field">
                  <label htmlFor="edit-opportunity-status">
                    Status
                  </label>

                  <select
                    id="edit-opportunity-status"
                    name="status"
                    value={editOpportunity.status}
                    onChange={handleEditChange}
                  >
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>

              <div className="company-jobs-modal-actions">
                <button
                  type="button"
                  className="company-jobs-modal-cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="company-jobs-modal-submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPLICATIONS MODAL */}
      {showApplicationsModal && selectedOpportunity && (
        <div
          className="company-jobs-modal-overlay"
          onClick={handleCloseModal}
        >
          <div
            className="company-jobs-modal company-jobs-applications-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="company-jobs-modal-header">
              <div>
                <p>APPLICATIONS</p>
                <h2>{selectedOpportunity.title}</h2>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close applications"
              >
                <X size={19} />
              </button>
            </div>

            <div className="company-jobs-applications-summary">
              <div>
                <strong>{selectedOpportunity.applications}</strong>
                <span>Total Applications</span>
              </div>

              <div>
                <strong>{selectedOpportunity.status}</strong>
                <span>Opportunity Status</span>
              </div>
            </div>

            <div className="company-jobs-applicant-list">
              {[
                "Rahul Sharma",
                "Priya Singh",
                "Aman Kumar",
                "Neha Gupta",
              ].map((name, index) => (
                <div
                  className="company-jobs-applicant"
                  key={`${selectedOpportunity.id}-${name}`}
                >
                  <span className="company-jobs-applicant-avatar">
                    {name.charAt(0)}
                  </span>

                  <div>
                    <strong>{name}</strong>
                    <span>
                      {selectedOpportunity.type} applicant · Candidate #
                      {index + 1}
                    </span>
                  </div>

                  <span
                    className={`company-jobs-applicant-status ${
                      index === 0
                        ? "shortlisted"
                        : index === 1
                          ? "review"
                          : "pending"
                    }`}
                  >
                    {index === 0
                      ? "Shortlisted"
                      : index === 1
                        ? "Under Review"
                        : "Pending"}
                  </span>
                </div>
              ))}
            </div>

            <div className="company-jobs-modal-actions">
              <button
                type="button"
                className="company-jobs-modal-cancel"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE OPPORTUNITY MODAL */}
      {showCreateModal && (
        <div
          className="company-jobs-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="company-jobs-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="company-jobs-modal-header">
              <div>
                <p>NEW OPPORTUNITY</p>
                <h2>Create Opportunity</h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCreateModal(false)
                }
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleCreateOpportunity}>
              <div className="company-jobs-modal-field">
                <label htmlFor="opportunity-title">
                  Opportunity Title
                </label>

                <input
                  id="opportunity-title"
                  name="title"
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={newOpportunity.title}
                  onChange={handleNewOpportunityChange}
                  required
                />
              </div>

              <div className="company-jobs-modal-grid">
                <div className="company-jobs-modal-field">
                  <label htmlFor="opportunity-type">
                    Type
                  </label>

                  <select
                    id="opportunity-type"
                    name="type"
                    value={newOpportunity.type}
                    onChange={
                      handleNewOpportunityChange
                    }
                  >
                    <option>Job</option>
                    <option>Internship</option>
                  </select>
                </div>

                <div className="company-jobs-modal-field">
                  <label htmlFor="opportunity-location">
                    Location
                  </label>

                  <select
                    id="opportunity-location"
                    name="location"
                    value={newOpportunity.location}
                    onChange={
                      handleNewOpportunityChange
                    }
                  >
                    <option>Remote</option>
                    <option>Bengaluru</option>
                    <option>Hybrid</option>
                    <option>Delhi NCR</option>
                    <option>Mumbai</option>
                  </select>
                </div>
              </div>

              <div className="company-jobs-modal-field">
                <label htmlFor="opportunity-deadline">
                  Application Deadline
                </label>

                <input
                  id="opportunity-deadline"
                  name="deadline"
                  type="date"
                  value={newOpportunity.deadline}
                  onChange={handleNewOpportunityChange}
                />
              </div>

              <div className="company-jobs-modal-note">
                <FileText size={16} />
                <span>
                  New opportunities are saved as drafts.
                  Publishing can be handled from the
                  opportunity details page.
                </span>
              </div>

              <div className="company-jobs-modal-actions">
                <button
                  type="button"
                  className="company-jobs-modal-cancel"
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="company-jobs-modal-submit"
                >
                  Create Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function toInputDate(value) {
  if (!value || value === "Not set") {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDeadline(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const className =
    status === "Active"
      ? "active"
      : status === "Draft"
        ? "draft"
        : "closed";

  return (
    <span
      className={`company-jobs-status ${className}`}
    >
      {status}
    </span>
  );
}