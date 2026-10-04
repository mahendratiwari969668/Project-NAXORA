import { useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  Edit3,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import "./InstitutionCompanies.css";
import InstitutionOpportunities from "./Opportunities/InstitutionOpportunities";
import InstitutionCollaborationRequests from "./CollaborationRequests/InstitutionCollaborationRequests";

const companies = [
  {
    id: 1,
    name: "TechNova",
    industry: "Information Technology",
    opportunities: 12,
    status: "Active",
    color: "cyan",
  },
  {
    id: 2,
    name: "CloudSoft",
    industry: "Cloud Services",
    opportunities: 8,
    status: "Active",
    color: "blue",
  },
  {
    id: 3,
    name: "DataTech",
    industry: "Data & Analytics",
    opportunities: 6,
    status: "Active",
    color: "navy",
  },
  {
    id: 4,
    name: "InnovateLab",
    industry: "Software Development",
    opportunities: 5,
    status: "Active",
    color: "red",
  },
  {
    id: 5,
    name: "WebSolve",
    industry: "Web Development",
    opportunities: 4,
    status: "Active",
    color: "teal",
  },
  {
    id: 6,
    name: "NextGen Solutions",
    industry: "IT Services",
    opportunities: 3,
    status: "Pending",
    color: "cyan",
  },
  {
    id: 7,
    name: "AIWorks",
    industry: "Artificial Intelligence",
    opportunities: 3,
    status: "Active",
    color: "orange",
  },
  {
    id: 8,
    name: "FinTech Global",
    industry: "Financial Technology",
    opportunities: 2,
    status: "Active",
    color: "dark",
  },
];

const industries = [
  "All Industries",
  "Information Technology",
  "Cloud Services",
  "Data & Analytics",
  "Software Development",
  "Web Development",
  "IT Services",
  "Artificial Intelligence",
  "Financial Technology",
];

const statuses = [
  "All Status",
  "Active",
  "Pending",
];

export default function InstitutionCompanies() {
  const [activeTab, setActiveTab] = useState("connected");

  const [companyList, setCompanyList] = useState(companies);
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All Industries");
  const [status, setStatus] = useState("All Status");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return companyList.filter((company) => {
      const matchesSearch =
        !query ||
        company.name.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query);

      const matchesIndustry =
        industry === "All Industries" ||
        company.industry === industry;

      const matchesStatus =
        status === "All Status" ||
        company.status === status;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesStatus
      );
    });
  }, [companyList, search, industry, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCompanies.length / companiesPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const industryOptions = [
    "All Industries",
    ...Array.from(
      new Set(companyList.map((company) => company.industry))
    ),
  ];

  const paginatedCompanies = filteredCompanies.slice(
    (safePage - 1) * companiesPerPage,
    safePage * companiesPerPage
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleIndustryChange = (value) => {
    setIndustry(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleToggleStatus = (companyId) => {
    setCompanyList((current) =>
      current.map((company) =>
        company.id === companyId
          ? {
              ...company,
              status:
                company.status === "Active"
                  ? "Pending"
                  : "Active",
            }
          : company
      )
    );

    setSelectedCompany((current) => {
      if (!current || current.id !== companyId) {
        return current;
      }

      return {
        ...current,
        status:
          current.status === "Active"
            ? "Pending"
            : "Active",
      };
    });

    setOpenMenuId(null);
  };

  const handleDeleteCompany = (companyId) => {
    const company = companyList.find(
      (item) => item.id === companyId
    );

    if (!company) return;

    const confirmed = window.confirm(
      `Remove ${company.name} from connected companies?`
    );

    if (!confirmed) return;

    setCompanyList((current) =>
      current.filter((item) => item.id !== companyId)
    );
    setOpenMenuId(null);
    setSelectedCompany(null);
  };

  const handleSaveCompany = (companyData) => {
    if (editingCompany) {
      setCompanyList((current) =>
        current.map((company) =>
          company.id === editingCompany.id
            ? {
                ...company,
                ...companyData,
              }
            : company
        )
      );
      setEditingCompany(null);
    } else {
      const newCompany = {
        id: Date.now(),
        ...companyData,
        opportunities: 0,
        status: "Pending",
        color: companyData.color || "blue",
      };

      setCompanyList((current) => [
        newCompany,
        ...current,
      ]);
    }

    setIsAddCompanyOpen(false);
  };

  return (
    <div className="institution-companies-page">


      <nav className="institution-company-tabs">

        <button
          type="button"
          className={
            activeTab === "connected"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("connected")
          }
        >
          Connected Companies
        </button>

        <button
          type="button"
          className={
            activeTab === "opportunities"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("opportunities")
          }
        >
          Opportunities
        </button>

        <button
          type="button"
          className={
            activeTab === "requests"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("requests")
          }
        >
          Collaboration Requests
        </button>

      </nav>



      {activeTab === "connected" && (
        <>
          <section className="institution-company-header">

            <div>
              <p className="institution-company-eyebrow">
                INDUSTRY NETWORK
              </p>

              <h1>Connected Companies</h1>

              <p>
                Companies collaborating with your
                institution.
              </p>
            </div>

            <button
              type="button"
              className="institution-add-company"
              onClick={() => {
                setEditingCompany(null);
                setIsAddCompanyOpen(true);
              }}
            >
              <Plus size={16} />
              Add Company
            </button>

          </section>



          <section className="institution-company-toolbar">

            <div className="institution-company-search">

              <Search size={16} />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearchChange(e.target.value)
                }
                placeholder="Search companies..."
              />

            </div>


            <FilterSelect
              value={industry}
              onChange={handleIndustryChange}
              options={industryOptions}
            />

            <FilterSelect
              value={status}
              onChange={handleStatusChange}
              options={statuses}
            />

          </section>


          <section className="institution-company-table-card">

            <div className="institution-company-table-head">

              <span>#</span>

              <span>Company</span>

              <span>Industry</span>

              <span>Opportunities</span>

              <span>Status</span>

              <span>Actions</span>

            </div>


            <div className="institution-company-table-body">

              {filteredCompanies.length > 0 ? (
                paginatedCompanies.map(
                  (company, index) => (
                    <div
                      className="institution-company-row"
                      key={company.id}
                    >

                      <span className="company-index">
                        {(safePage - 1) * companiesPerPage +
                          index +
                          1}
                      </span>


                      {/* COMPANY */}

                      <button
                        type="button"
                        className="institution-company-name institution-company-name-button"
                        onClick={() => setSelectedCompany(company)}
                        aria-label={`View ${company.name}`}
                      >
                        <div
                          className={`institution-company-logo ${company.color}`}
                        >
                          <Building2 size={15} />
                        </div>

                        <span>
                          {company.name}
                        </span>
                      </button>


                      {/* INDUSTRY */}

                      <span className="institution-company-industry">
                        {company.industry}
                      </span>


                      {/* OPPORTUNITIES */}

                      <span className="institution-company-opportunities">
                        {company.opportunities}
                      </span>


                      {/* STATUS */}

                      <span
                        className={`institution-company-status ${
                          company.status.toLowerCase()
                        }`}
                      >
                        {company.status}
                      </span>


                      {/* ACTION */}

                      <div className="institution-company-action-wrap">
                        <button
                          type="button"
                          className="institution-company-action"
                          aria-label={`Actions for ${company.name}`}
                          aria-expanded={openMenuId === company.id}
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === company.id
                                ? null
                                : company.id
                            )
                          }
                        >
                          <MoreHorizontal size={17} />
                        </button>

                        {openMenuId === company.id && (
                          <div className="institution-company-action-menu">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCompany(company);
                                setOpenMenuId(null);
                              }}
                            >
                              <Eye size={14} />
                              View Details
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingCompany(company);
                                setIsAddCompanyOpen(true);
                                setOpenMenuId(null);
                              }}
                            >
                              <Edit3 size={14} />
                              Edit Company
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleToggleStatus(company.id)
                              }
                            >
                              <Check size={14} />
                              {company.status === "Active"
                                ? "Set Pending"
                                : "Set Active"}
                            </button>

                            <button
                              type="button"
                              className="danger"
                              onClick={() =>
                                handleDeleteCompany(company.id)
                              }
                            >
                              <Trash2 size={14} />
                              Remove Company
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  )
                )
              ) : (
                <div className="institution-company-empty">

                  <Building2 size={25} />

                  <strong>
                    No companies found
                  </strong>

                  <span>
                    Try changing your search or filters.
                  </span>

                </div>
              )}

            </div>


            {/* PAGINATION */}

            <div className="institution-company-pagination">

              <span>
                Showing{" "}
                {filteredCompanies.length === 0
                  ? 0
                  : (safePage - 1) * companiesPerPage + 1}{" "}
                -{" "}
                {Math.min(
                  safePage * companiesPerPage,
                  filteredCompanies.length
                )}{" "}
                of {filteredCompanies.length} companies
              </span>

              <div className="institution-company-pages">

                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(1, page - 1)
                    )
                  }
                  aria-label="Previous page"
                >
                  ‹
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={
                      safePage === page ? "active" : ""
                    }
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="next"
                  disabled={safePage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  aria-label="Next page"
                >
                  ›
                </button>

              </div>

            </div>

          </section>
        </>
      )}


      {activeTab === "opportunities" && (
        <InstitutionOpportunities />
      )}


      {activeTab === "requests" && (
        <InstitutionCollaborationRequests />
      )}

      {selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onEdit={() => {
            setEditingCompany(selectedCompany);
            setSelectedCompany(null);
            setIsAddCompanyOpen(true);
          }}
          onToggleStatus={() =>
            handleToggleStatus(selectedCompany.id)
          }
        />
      )}

      {isAddCompanyOpen && (
        <CompanyFormModal
          company={editingCompany}
          onClose={() => {
            setIsAddCompanyOpen(false);
            setEditingCompany(null);
          }}
          onSave={handleSaveCompany}
        />
      )}

    </div>
  );
}



function CompanyDetailsModal({
  company,
  onClose,
  onEdit,
  onToggleStatus,
}) {
  return (
    <div
      className="institution-company-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="institution-company-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="company-details-title"
      >
        <header className="institution-company-modal-header">
          <div>
            <span>CONNECTED COMPANY</span>
            <h2 id="company-details-title">
              {company.name}
            </h2>
            <p>{company.industry}</p>
          </div>

          <button
            type="button"
            className="institution-company-modal-close"
            onClick={onClose}
            aria-label="Close company details"
          >
            <X size={18} />
          </button>
        </header>

        <div className="institution-company-modal-body">
          <div className="institution-company-detail-top">
            <div
              className={`institution-company-logo ${company.color}`}
            >
              <Building2 size={24} />
            </div>

            <div>
              <strong>{company.name}</strong>
              <span>{company.industry}</span>
            </div>

            <span
              className={`institution-company-status ${
                company.status.toLowerCase()
              }`}
            >
              {company.status}
            </span>
          </div>

          <div className="institution-company-detail-grid">
            <div>
              <span>Industry</span>
              <strong>{company.industry}</strong>
            </div>
            <div>
              <span>Opportunities</span>
              <strong>{company.opportunities}</strong>
            </div>
            <div>
              <span>Connection Status</span>
              <strong>{company.status}</strong>
            </div>
            <div>
              <span>Company ID</span>
              <strong>#{company.id}</strong>
            </div>
          </div>
        </div>

        <footer className="institution-company-modal-footer">
          <button
            type="button"
            className="institution-company-modal-secondary"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="institution-company-modal-secondary"
            onClick={onToggleStatus}
          >
            <Check size={14} />
            {company.status === "Active"
              ? "Set Pending"
              : "Set Active"}
          </button>

          <button
            type="button"
            className="institution-company-modal-primary"
            onClick={onEdit}
          >
            <Edit3 size={14} />
            Edit Company
          </button>
        </footer>
      </section>
    </div>
  );
}



function CompanyFormModal({
  company,
  onClose,
  onSave,
}) {
  const [name, setName] = useState(company?.name || "");
  const [industry, setIndustry] = useState(
    company?.industry || ""
  );
  const [color, setColor] = useState(
    company?.color || "blue"
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !industry.trim()) {
      return;
    }

    onSave({
      name: name.trim(),
      industry: industry.trim(),
      color,
    });
  };

  return (
    <div
      className="institution-company-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="institution-company-modal institution-company-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="company-form-title"
      >
        <header className="institution-company-modal-header">
          <div>
            <span>COMPANY MANAGEMENT</span>
            <h2 id="company-form-title">
              {company ? "Edit Company" : "Add Company"}
            </h2>
            <p>
              {company
                ? "Update the connected company information."
                : "Add a new company to your institution network."}
            </p>
          </div>

          <button
            type="button"
            className="institution-company-modal-close"
            onClick={onClose}
            aria-label="Close company form"
          >
            <X size={18} />
          </button>
        </header>

        <form
          className="institution-company-form"
          onSubmit={handleSubmit}
        >
          <label>
            <span>Company Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="e.g. TechNova"
              required
              autoFocus
            />
          </label>

          <label>
            <span>Industry</span>
            <input
              type="text"
              value={industry}
              onChange={(event) =>
                setIndustry(event.target.value)
              }
              placeholder="e.g. Information Technology"
              required
            />
          </label>

          <label>
            <span>Logo Accent</span>
            <select
              value={color}
              onChange={(event) =>
                setColor(event.target.value)
              }
            >
              <option value="cyan">Cyan</option>
              <option value="blue">Blue</option>
              <option value="navy">Navy</option>
              <option value="red">Red</option>
              <option value="teal">Teal</option>
              <option value="orange">Orange</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <div className="institution-company-form-actions">
            <button
              type="button"
              className="institution-company-modal-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="institution-company-modal-primary"
            >
              <Check size={14} />
              {company ? "Save Changes" : "Add Company"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}


function FilterSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="institution-company-filter">

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


function CompanyPlaceholder({
  icon,
  label,
  title,
  text,
  orange = false,
}) {
  return (
    <section className="institution-company-placeholder">

      <div
        className={`institution-company-placeholder-icon ${
          orange ? "orange" : ""
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