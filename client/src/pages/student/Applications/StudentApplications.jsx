import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Search,
  XCircle,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import "./StudentApplications.css";

const applicationTabs = [
  "All",
  "In Review",
  "Shortlisted",
  "Interview",
  "Completed",
];

const applications = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Technology Company",
    appliedOn: "24 Sep 2026",
    status: "In Review",
    currentStep: 1,
    statusTone: "review",
    location: "Remote",
    type: "Internship",
    duration: "3–6 months",
    skills: ["React", "JavaScript", "CSS"],
    description:
      "Work with a development team to build responsive web experiences and contribute to real product features.",
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "Software Solutions",
    appliedOn: "18 Sep 2026",
    status: "Interview",
    currentStep: 3,
    statusTone: "interview",
    location: "Bengaluru, India",
    type: "Internship",
    duration: "6 months",
    skills: ["Node.js", "Express", "MongoDB"],
    description:
      "Assist in developing backend services and web applications while working closely with experienced developers.",
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "Data & Analytics Team",
    appliedOn: "10 Sep 2026",
    status: "Completed",
    currentStep: 4,
    statusTone: "completed",
    location: "Noida, India",
    type: "Internship",
    duration: "3 months",
    skills: ["SQL", "Excel", "Data Analysis"],
    description:
      "Work with data teams to analyze datasets, prepare reports and support data-driven business decisions.",
  },
];

const stages = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Decision",
];

export default function StudentApplications() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const applicationsListRef = useRef(null);

  const { applicationId } = useParams();

  const navigate = useNavigate();

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesTab =
        activeTab === "All" ||
        application.status === activeTab;

      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchValue ||
        application.title
          .toLowerCase()
          .includes(searchValue) ||
        application.company
          .toLowerCase()
          .includes(searchValue);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);


  const openApplicationWorkspace = () => {
    applicationsListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (applicationId) {
    const application = applications.find(
      (item) => String(item.id) === String(applicationId)
    );

    if (!application) {
      return (
        <div className="student-applications-page">
          <main className="applications-main">
            <section className="application-details-not-found">
              <div className="application-details-not-found-icon">
                <FileText size={25} />
              </div>

              <h2>Application not found</h2>

              <p>
                The application you are looking for could
                not be found.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/student/applications")
                }
              >
                <ArrowLeft size={16} />
                Back to Applications
              </button>
            </section>
          </main>
        </div>
      );
    }

    return (
      <div className="student-applications-page">
        <main className="applications-main">

          <button
            type="button"
            className="application-details-back"
            onClick={() =>
              navigate("/student/applications")
            }
          >
            <ArrowLeft size={17} />
            Back to Applications
          </button>


          <section className="application-details-card">
            {/* HEADER */}

            <div className="application-details-header">
              <div className="application-details-company-mark">
                <BriefcaseBusiness size={28} />
              </div>

              <div className="application-details-title">
                <div className="application-type-row">
                  <span>APPLICATION</span>

                  <StatusBadge
                    status={application.status}
                  />
                </div>

                <h1>{application.title}</h1>

                <p>{application.company}</p>
              </div>
            </div>

            {/* META */}

            <div className="application-details-meta">
              <div>
                <span>APPLIED ON</span>
                <strong>{application.appliedOn}</strong>
              </div>

              <div>
                <span>TYPE</span>
                <strong>{application.type}</strong>
              </div>

              <div>
                <span>LOCATION</span>
                <strong>{application.location}</strong>
              </div>

              <div>
                <span>DURATION</span>
                <strong>{application.duration}</strong>
              </div>
            </div>

            {/* STATUS */}

            <section className="application-details-section">
              <span className="application-details-eyebrow">
                APPLICATION STATUS
              </span>

              <h2>Application progress</h2>

              <div className="application-details-timeline">
                {stages.map((stage, index) => {
                  const completed =
                    index <= application.currentStep;

                  const current =
                    index === application.currentStep;

                  return (
                    <div
                      className={`application-details-stage ${
                        completed ? "completed" : ""
                      } ${current ? "current" : ""}`}
                      key={stage}
                    >
                      <div className="application-details-stage-top">
                        <div className="application-details-stage-dot">
                          {completed ? (
                            <Check size={13} />
                          ) : (
                            <span />
                          )}
                        </div>

                        {index < stages.length - 1 && (
                          <div
                            className={`application-details-stage-line ${
                              index <
                              application.currentStep
                                ? "filled"
                                : ""
                            }`}
                          />
                        )}
                      </div>

                      <span>{stage}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ROLE INFORMATION */}

            <div className="application-details-grid">
              <section className="application-details-section">
                <span className="application-details-eyebrow">
                  OPPORTUNITY
                </span>

                <h2>Role overview</h2>

                <p>
                  {application.description}
                </p>
              </section>

              <section className="application-details-section">
                <span className="application-details-eyebrow">
                  SKILLS
                </span>

                <h2>Relevant skills</h2>

                <div className="application-details-skills">
                  {application.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </section>
            </div>

            {/* CURRENT STATUS */}

            <div className="application-current-status">
              <CheckCircle2 size={20} />

              <div>
                <strong>
                  Current status: {application.status}
                </strong>

                <p>
                  Your application is currently at the{" "}
                  <strong>
                    {stages[application.currentStep]}
                  </strong>{" "}
                  stage.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="student-applications-page">
      <main className="applications-main">
        <section className="applications-heading">
          <div>
            <span className="applications-eyebrow">
              APPLICATION TRACKER
            </span>

            <h1>My Applications</h1>

            <p>
              Track your internship and job applications from
              submission to final decision.
            </p>
          </div>

          {/* APPLICATION WORKSPACE */}

          <button
            type="button"
            className="applications-heading-status"
            onClick={openApplicationWorkspace}
          >
            <FileText size={17} />
            Application workspace
          </button>
        </section>


        <section className="applications-toolbar">
          <div className="applications-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search applications..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <XCircle size={17} />
              </button>
            )}
          </div>
        </section>

        <section className="applications-tabs-card">
          <div className="applications-tabs">
            {applicationTabs.map((tab) => (
              <button
                type="button"
                key={tab}
                className={
                  activeTab === tab ? "active" : ""
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}

                {tab === "All" && (
                  <span>{applications.length}</span>
                )}
              </button>
            ))}
          </div>
        </section>


        <section
          className="applications-list"
          ref={applicationsListRef}
        >
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
              />
            ))
          ) : (
            <div className="applications-empty">
              <div className="applications-empty-icon">
                <FileText size={25} />
              </div>

              <h3>No applications found</h3>

              <p>
                Try another search or select a different
                application status.
              </p>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("All");
                  setSearch("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="applications-discover-card">
          <div className="applications-discover-icon">
            <BriefcaseBusiness size={22} />
          </div>

          <div>
            <span>LOOKING FOR MORE?</span>

            <h3>
              Discover new opportunities
            </h3>

            <p>
              Explore internships and jobs that match your
              skills and career direction.
            </p>
          </div>

          <Link to="/student/opportunities">
            Explore Opportunities
            <ArrowRight size={17} />
          </Link>
        </section>
      </main>
    </div>
  );
}


function ApplicationCard({ application }) {
  return (
    <article
      className={`application-card ${application.statusTone}`}
    >

      <div className="application-card-top">
        <div className="application-company-mark">
          <BriefcaseBusiness size={23} />
        </div>

        <div className="application-title-area">
          <div className="application-type-row">
            <span>APPLICATION</span>

            <StatusBadge
              status={application.status}
            />
          </div>

          <h2>{application.title}</h2>

          <p>{application.company}</p>
        </div>

        <Link
          to={`/student/applications/${application.id}`}
          className="application-view-button"
        >
          View Details
          <ArrowRight size={16} />
        </Link>
      </div>


      <div className="application-meta">
        <span>
          <Clock3 size={16} />
          Applied on {application.appliedOn}
        </span>

        <span>
          <CheckCircle2 size={16} />
          {application.status}
        </span>
      </div>

      <div className="application-timeline">
        {stages.map((stage, index) => {
          const completed =
            index <= application.currentStep;

          const current =
            index === application.currentStep;

          return (
            <div
              className={`application-stage ${
                completed ? "completed" : ""
              } ${current ? "current" : ""}`}
              key={stage}
            >
              <div className="application-stage-track">
                <div className="application-stage-dot">
                  {completed ? (
                    <Check size={13} />
                  ) : (
                    <span />
                  )}
                </div>

                {index < stages.length - 1 && (
                  <div
                    className={`application-stage-line ${
                      index < application.currentStep
                        ? "filled"
                        : ""
                    }`}
                  />
                )}
              </div>

              <span>{stage}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
}


function StatusBadge({ status }) {
  const icon =
    status === "Interview" ||
    status === "Completed" ? (
      <CheckCircle2 size={14} />
    ) : (
      <Clock3 size={14} />
    );

  return (
    <span
      className={`application-status-badge ${status
        .toLowerCase()
        .replace(" ", "-")}`}
    >
      {icon}
      {status}
    </span>
  );
}