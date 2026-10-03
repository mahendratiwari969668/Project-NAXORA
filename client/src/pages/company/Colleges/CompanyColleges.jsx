import { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  Search,
  X,
  Users,
  UserPlus,
} from "lucide-react";

import "./CompanyColleges.css";

const colleges = [
  {
    id: 1,
    name: "MGKVP",
    fullName: "Mahatma Gandhi Kashi Vidyapith",
    location: "Varanasi, UP",
    state: "Uttar Pradesh",
    students: "8,200",
    programs: "5 programs",
    status: "Connected",
  },
  {
    id: 2,
    name: "IIT (BHU)",
    fullName: "Indian Institute of Technology",
    location: "Varanasi, UP",
    state: "Uttar Pradesh",
    students: "12,500",
    programs: "3 programs",
    status: "Connected",
  },
  {
    id: 3,
    name: "AKTU",
    fullName: "Dr. A.P.J. Abdul Kalam Technical University",
    location: "Lucknow, UP",
    state: "Uttar Pradesh",
    students: "45,000",
    programs: "2 programs",
    status: "Connected",
  },
  {
    id: 4,
    name: "Delhi University",
    fullName: "University of Delhi",
    location: "Delhi",
    state: "Delhi",
    students: "35,000",
    programs: "1 program",
    status: "Pending",
  },
  {
    id: 5,
    name: "JNU",
    fullName: "Jawaharlal Nehru University",
    location: "New Delhi",
    state: "Delhi",
    students: "9,800",
    programs: "-",
    status: "Not Connected",
  },
  {
    id: 6,
    name: "BHU",
    fullName: "Banaras Hindu University",
    location: "Varanasi, UP",
    state: "Uttar Pradesh",
    students: "28,000",
    programs: "4 programs",
    status: "Connected",
  },
  {
    id: 7,
    name: "Amity University",
    fullName: "Amity University",
    location: "Noida, UP",
    state: "Uttar Pradesh",
    students: "22,000",
    programs: "2 programs",
    status: "Not Connected",
  },
  {
    id: 8,
    name: "Delhi Technological University",
    fullName: "Delhi Technological University",
    location: "Delhi",
    state: "Delhi",
    students: "11,500",
    programs: "3 programs",
    status: "Pending",
  },
];

const tabs = [
  "Connected Colleges",
  "Explore Colleges",
  "Collaboration Requests",
];

export default function CompanyColleges() {
  const [activeTab, setActiveTab] =
    useState("Connected Colleges");

  const [search, setSearch] = useState("");

  const [stateFilter, setStateFilter] =
    useState("All States");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [openMenu, setOpenMenu] = useState(null);

  const [actionMenuPosition, setActionMenuPosition] =
    useState(null);

  const [selectedCollege, setSelectedCollege] =
    useState(null);

  const [openModal, setOpenModal] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [collegeData, setCollegeData] =
    useState(colleges);

  const filteredColleges = useMemo(() => {
    let result = [...collegeData];

    /* TAB FILTER */
    if (activeTab === "Connected Colleges") {
      result = result.filter(
        (college) =>
          college.status === "Connected"
      );
    }

    if (activeTab === "Collaboration Requests") {
      result = result.filter(
        (college) =>
          college.status === "Pending"
      );
    }

    /* SEARCH */
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((college) =>
        [
          college.name,
          college.fullName,
          college.location,
          college.state,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }

    /* STATE */
    if (stateFilter !== "All States") {
      result = result.filter(
        (college) =>
          college.state === stateFilter
      );
    }

    /* STATUS */
    if (statusFilter !== "All Status") {
      result = result.filter(
        (college) =>
          college.status === statusFilter
      );
    }

    return result;
  }, [
    collegeData,
    activeTab,
    search,
    stateFilter,
    statusFilter,
  ]);

  const handleConnect = (id) => {
    setCollegeData((current) =>
      current.map((college) =>
        college.id === id
          ? {
              ...college,
              status: "Connected",
            }
          : college
      )
    );

    setOpenMenu(null);
  };

  const handleDisconnect = (id) => {
    setCollegeData((current) =>
      current.map((college) =>
        college.id === id
          ? {
              ...college,
              status: "Not Connected",
            }
          : college
      )
    );

    setOpenMenu(null);
  };

  const toggleActionMenu = (event, collegeId) => {
    event.stopPropagation();

    if (openMenu === collegeId) {
      setOpenMenu(null);
      setActionMenuPosition(null);
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const menuWidth = 170;
    const menuHeight = 155;
    const gap = 7;

    const left = Math.max(
      8,
      Math.min(
        rect.right - menuWidth,
        window.innerWidth - menuWidth - 8
      )
    );

    const top =
      rect.bottom + menuHeight + gap >
      window.innerHeight
        ? Math.max(8, rect.top - menuHeight - gap)
        : rect.bottom + gap;

    setOpenMenu(collegeId);
    setActionMenuPosition({
      top,
      left,
    });
  };

  const openCollegeDetails = (college) => {
    setSelectedCollege(college);
    setOpenModal("college");
    setOpenMenu(null);
    setActionMenuPosition(null);
  };

  const openStudentDetails = (college) => {
    setSelectedCollege(college);
    setOpenModal("students");
    setOpenMenu(null);
    setActionMenuPosition(null);
  };

  const closeModal = () => {
    setOpenModal(null);
    setSelectedCollege(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStateFilter("All States");
    setStatusFilter("All Status");
    setCurrentPage(1);
  };

  return (
    <main
      className="company-colleges-page"
      onClick={() => setOpenMenu(null)}
    >
      {/* HEADER */}
      <header className="company-colleges-header">
        <div>
          <p className="company-colleges-eyebrow">
            ACADEMIA NETWORK
          </p>

          <h1>Colleges</h1>

          <p>
            Connect with colleges and build stronger
            academic-industry relationships.
          </p>
        </div>
      </header>

      {/* TABS */}
      <section className="company-colleges-tabs-card">
        <div className="company-colleges-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={
                activeTab === tab
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab}

              {tab === "Collaboration Requests" && (
                <span className="company-colleges-tab-count">
                  2
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="company-colleges-filter-bar">
        <div className="company-colleges-search">
          <Search size={16} />

          <input
            type="text"
            placeholder="Search colleges..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <CollegeSelect
          value={stateFilter}
          onChange={(value) => {
            setStateFilter(value);
            setCurrentPage(1);
          }}
          options={[
            "All States",
            "Uttar Pradesh",
            "Delhi",
          ]}
        />

        <CollegeSelect
          value={statusFilter}
          onChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          options={[
            "All Status",
            "Connected",
            "Pending",
            "Not Connected",
          ]}
        />

        {(search ||
          stateFilter !== "All States" ||
          statusFilter !== "All Status") && (
          <button
            type="button"
            className="company-colleges-clear"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        )}
      </section>

      {/* TABLE */}
      <section className="company-colleges-table-card">
        <div className="company-colleges-table-wrapper">
          <table className="company-colleges-table">
            <thead>
              <tr>
                <th className="college-number">
                  #
                </th>

                <th>College / University</th>

                <th>Location</th>

                <th>Students</th>

                <th>Collaboration</th>

                <th>Status</th>

                <th className="college-actions-heading">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredColleges.length > 0 ? (
                filteredColleges.map(
                  (college, index) => (
                    <tr key={college.id}>
                      {/* NUMBER */}
                      <td className="college-number">
                        {index + 1}
                      </td>

                      {/* COLLEGE */}
                      <td>
                        <div className="college-info">
                          <div className="college-logo">
                            <Building2 size={17} />
                          </div>

                          <div>
                            <strong>
                              {college.name}
                            </strong>

                            <small>
                              {college.fullName}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* LOCATION */}
                      <td>
                        <span className="college-location">
                          {college.location}
                        </span>
                      </td>

                      {/* STUDENTS */}
                      <td>
                        <span className="college-students">
                          <Users size={13} />
                          {college.students}
                        </span>
                      </td>

                      {/* PROGRAMS */}
                      <td>
                        <span className="college-programs">
                          {college.programs}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td>
                        <CollegeStatus
                          status={college.status}
                        />
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div
                          className="college-actions"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >
                          <button
                            type="button"
                            className="college-more"
                            aria-label={`Actions for ${college.name}`}
                            aria-expanded={
                              openMenu === college.id
                            }
                            onClick={(event) =>
                              toggleActionMenu(
                                event,
                                college.id
                              )
                            }
                          >
                            <MoreVertical
                              size={16}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="company-colleges-empty"
                  >
                    <div>
                      <Building2 size={30} />

                      <strong>
                        No colleges found
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

        {/* FOOTER */}
        <div className="company-colleges-footer">
          <span>
            Showing{" "}
            <strong>
              {filteredColleges.length}
            </strong>{" "}
            of{" "}
            <strong>{collegeData.length}</strong>{" "}
            colleges
          </span>

          <div className="company-colleges-pagination">
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

            {[1, 2, 3].map((page) => (
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
                  Math.min(12, page + 1)
                )
              }
            >
              12
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(12, page + 1)
                )
              }
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {openMenu !== null &&
        actionMenuPosition &&
        (() => {
          const college = collegeData.find(
            (item) => item.id === openMenu
          );

          if (!college) return null;

          return (
            <div
              className="college-action-menu"
              style={{
                top: actionMenuPosition.top,
                left: actionMenuPosition.left,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                onClick={() =>
                  openCollegeDetails(college)
                }
              >
                <Eye size={14} />
                View College
              </button>

              <button
                type="button"
                onClick={() =>
                  openStudentDetails(college)
                }
              >
                <Users size={14} />
                View Students
              </button>

              {college.status !== "Connected" && (
                <button
                  type="button"
                  onClick={() =>
                    handleConnect(college.id)
                  }
                >
                  <UserPlus size={14} />
                  Connect
                </button>
              )}

              {college.status === "Connected" && (
                <button
                  type="button"
                  className="danger"
                  onClick={() =>
                    handleDisconnect(college.id)
                  }
                >
                  Disconnect
                </button>
              )}
            </div>
          );
        })()}

      {openModal && selectedCollege && (
        <div
          className="company-colleges-modal-backdrop"
          role="presentation"
          onClick={closeModal}
        >
          <section
            className="company-colleges-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="company-colleges-modal-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="company-colleges-modal-header">
              <div>
                <span className="company-colleges-modal-kicker">
                  {openModal === "students"
                    ? "STUDENT DIRECTORY"
                    : "COLLEGE PROFILE"}
                </span>
                <h2 id="company-colleges-modal-title">
                  {selectedCollege.name}
                </h2>
                <p>
                  {selectedCollege.fullName}
                </p>
              </div>

              <button
                type="button"
                className="company-colleges-modal-close"
                aria-label="Close"
                onClick={closeModal}
              >
                <X size={17} />
              </button>
            </div>

            {openModal === "college" ? (
              <div className="company-colleges-modal-grid">
                <div className="company-colleges-modal-item">
                  <span>Location</span>
                  <strong>
                    {selectedCollege.location}
                  </strong>
                </div>

                <div className="company-colleges-modal-item">
                  <span>State</span>
                  <strong>
                    {selectedCollege.state}
                  </strong>
                </div>

                <div className="company-colleges-modal-item">
                  <span>Students</span>
                  <strong>
                    {selectedCollege.students}
                  </strong>
                </div>

                <div className="company-colleges-modal-item">
                  <span>Collaboration</span>
                  <strong>
                    {selectedCollege.programs}
                  </strong>
                </div>

                <div className="company-colleges-modal-item">
                  <span>Connection Status</span>
                  <strong
                    className={`modal-status ${selectedCollege.status
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {selectedCollege.status}
                  </strong>
                </div>
              </div>
            ) : (
              <div className="company-colleges-students-panel">
                <div className="company-colleges-students-summary">
                  <div>
                    <strong>
                      {selectedCollege.students}
                    </strong>
                    <span>
                      Total students
                    </span>
                  </div>

                  <div>
                    <strong>
                      {selectedCollege.programs}
                    </strong>
                    <span>
                      Collaboration programs
                    </span>
                  </div>
                </div>

                <div className="company-colleges-students-list">
                  <div>
                    <span className="student-avatar">
                      {selectedCollege.name.charAt(0)}
                    </span>
                    <div>
                      <strong>
                        Student directory
                      </strong>
                      <small>
                        Student records are available
                        for this connected institution.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="company-colleges-modal-footer">
              <button
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function CollegeSelect({
  value,
  onChange,
  options,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      className={`company-colleges-select ${
        isOpen ? "open" : ""
      }`}
    >
      <button
        type="button"
        className="company-colleges-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((open) => !open);
        }}
      >
        <span>{value}</span>
        <ChevronDown
          size={14}
          className="company-colleges-select-chevron"
        />
      </button>

      {isOpen && (
        <div
          className="company-colleges-select-menu"
          role="listbox"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              className={
                value === option ? "selected" : ""
              }
              onClick={() =>
                handleSelect(option)
              }
            >
              <span>{option}</span>
              {value === option && (
                <span className="select-check">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CollegeStatus({ status }) {
  const statusClass = status
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <span
      className={`college-status ${statusClass}`}
    >
      <span className="college-status-dot" />
      {status}
    </span>
  );
}