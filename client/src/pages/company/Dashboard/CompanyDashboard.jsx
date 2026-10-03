import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Users,
  UserRound,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CompanyDashboard.css";

const stats = [
  {
    label: "Active Opportunities",
    value: "8",
    change: "+2 this month",
    icon: BriefcaseBusiness,
    tone: "blue",
  },
  {
    label: "Total Applications",
    value: "426",
    change: "+18% from last month",
    icon: FileText,
    tone: "violet",
  },
  {
    label: "Shortlisted",
    value: "38",
    change: "+12% from last month",
    icon: Users,
    tone: "cyan",
  },
  {
    label: "Interviews Scheduled",
    value: "14",
    change: "+4 this week",
    icon: CalendarDays,
    tone: "orange",
  },
];

const opportunities = [
  {
    title: "Frontend Developer Intern",
    meta: "84 applications • 18 shortlisted",
    tone: "blue",
  },
  {
    title: "Backend Developer Intern",
    meta: "56 applications • 9 shortlisted",
    tone: "violet",
  },
  {
    title: "Data Analyst Intern",
    meta: "42 applications • 6 shortlisted",
    tone: "orange",
  },
];

const applications = [
  {
    candidate: "Rahul Sharma",
    role: "Frontend Intern",
    date: "12 Oct 2025",
    status: "New",
    statusType: "new",
  },
  {
    candidate: "Priya Singh",
    role: "Backend Intern",
    date: "11 Oct 2025",
    status: "Shortlisted",
    statusType: "shortlisted",
  },
  {
    candidate: "Aman Kumar",
    role: "Data Analyst",
    date: "10 Oct 2025",
    status: "Interview",
    statusType: "interview",
  },
];

const applicationDetails = {
  "Rahul Sharma": {
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    education: "BCA • 2026",
    skills: "React, JavaScript, HTML, CSS",
    experience: "Fresher",
  },
  "Priya Singh": {
    email: "priya.singh@example.com",
    phone: "+91 98765 42109",
    education: "BCA • 2026",
    skills: "Node.js, Express, MongoDB",
    experience: "Fresher",
  },
  "Aman Kumar": {
    email: "aman.kumar@example.com",
    phone: "+91 98765 41098",
    education: "BCA • 2026",
    skills: "Python, SQL, Power BI",
    experience: "Fresher",
  },
};

const calendarMonths = [
  "Sep 2025",
  "Oct 2025",
  "Nov 2025",
  "Dec 2025",
  "Jan 2026",
  "Feb 2026",
];

const interviews = [
  {
    title: "Interview with Rahul Sharma",
    subtitle: "Frontend Intern",
    time: "Tomorrow, 11:00 AM",
    tone: "blue",
  },
  {
    title: "Application Deadline",
    subtitle: "Data Analyst Intern",
    time: "Today, 6:00 PM",
    tone: "red",
  },
];

export default function CompanyDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Oct 2025");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const navigate = useNavigate();

  const goTo = (path) => {
    setCalendarOpen(false);
    navigate(path);
  };

  return (
    <main className="company-dashboard">
      <section className="company-dashboard-header">
        <div>
          <span className="company-dashboard-eyebrow">
            COMPANY OVERVIEW
          </span>

          <h1>
            Good morning, Amit!
          </h1>

          <p>
            Here&apos;s an overview of your recruitment activity.
          </p>
        </div>

        <div className="company-date-control">
          <button
            type="button"
            className="company-date-selector"
            onClick={() => setCalendarOpen((open) => !open)}
            aria-expanded={calendarOpen}
            aria-label="Select dashboard month"
          >
            <CalendarDays size={16} />
            <span>{selectedMonth}</span>
            <ChevronDown size={15} />
          </button>

          {calendarOpen && (
            <div className="company-calendar-menu">
              <div className="company-calendar-menu-header">
                <strong>Select month</strong>
                <button
                  type="button"
                  onClick={() => setCalendarOpen(false)}
                  aria-label="Close month selector"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="company-calendar-months">
                {calendarMonths.map((month) => (
                  <button
                    type="button"
                    key={month}
                    className={selectedMonth === month ? "active" : ""}
                    onClick={() => {
                      setSelectedMonth(month);
                      setCalendarOpen(false);
                    }}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="company-stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              className={`company-stat-card ${stat.tone}`}
              key={stat.label}
            >
              <div className="company-stat-icon">
                <Icon size={19} />
              </div>

              <div className="company-stat-content">
                <span>{stat.label}</span>

                <strong>{stat.value}</strong>

                <small>
                  <ArrowUpRight size={13} />
                  {stat.change}
                </small>
              </div>
            </article>
          );
        })}
      </section>

      {/* Middle Section */}
      <section className="company-middle-grid">
        {/* Application Funnel */}
        <article className="company-panel funnel-panel">
          <div className="company-panel-header">
            <div>
              <span className="company-panel-label">
                APPLICATIONS
              </span>

              <h2>Application Funnel</h2>
            </div>

            <FileText size={19} />
          </div>

          <div className="funnel-content">
            <div className="funnel-visual">
              <div className="funnel-step funnel-applied">
                <span />
              </div>

              <div className="funnel-step funnel-review">
                <span />
              </div>

              <div className="funnel-step funnel-shortlisted">
                <span />
              </div>

              <div className="funnel-step funnel-interview">
                <span />
              </div>

              <div className="funnel-step funnel-selected">
                <span />
              </div>
            </div>

            <div className="funnel-list">
              <div>
                <strong>426</strong>
                <span>Applied</span>
              </div>

              <div>
                <strong>312</strong>
                <span>Under Review</span>
              </div>

              <div>
                <strong>58</strong>
                <span>Shortlisted</span>
              </div>

              <div>
                <strong>14</strong>
                <span>Interview</span>
              </div>

              <div>
                <strong>5</strong>
                <span>Selected</span>
              </div>
            </div>
          </div>
        </article>

        {/* Active Opportunities */}
        <article className="company-panel">
          <div className="company-panel-header">
            <div>
              <span className="company-panel-label">
                OPPORTUNITIES
              </span>

              <h2>Active Opportunities</h2>
            </div>

            <button
              type="button"
              className="company-view-all"
              onClick={() => goTo("/company/jobs")}
            >
              View All
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="company-opportunity-list">
            {opportunities.map((item) => (
              <div
                className="company-opportunity"
                key={item.title}
              >
                <div className={`company-opportunity-icon ${item.tone}`}>
                  <BriefcaseBusiness size={17} />
                </div>

                <div className="company-opportunity-info">
                  <strong>{item.title}</strong>
                  <span>{item.meta}</span>
                </div>

                <span className="company-active-status">
                  Active
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Bottom Section */}
      <section className="company-bottom-grid">
        {/* Recent Applications */}
        <article className="company-panel company-table-panel">
          <div className="company-panel-header">
            <div>
              <span className="company-panel-label">
                CANDIDATES
              </span>

              <h2>Recent Applications</h2>
            </div>

            <button
              type="button"
              className="company-view-all"
              onClick={() => goTo("/company/applications")}
            >
              View All
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="company-table-wrapper">
            <table className="company-applications-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Role</th>
                  <th>Applied On</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application.candidate}
                    className="company-application-row"
                    onClick={() => setSelectedApplication(application)}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedApplication(application);
                      }
                    }}
                    aria-label={`Open application for ${application.candidate}`}
                  >
                    <td>
                      <div className="company-candidate">
                        <span className="company-candidate-avatar">
                          <UserRound size={15} />
                        </span>

                        <strong>{application.candidate}</strong>
                      </div>
                    </td>

                    <td>{application.role}</td>

                    <td>{application.date}</td>

                    <td>
                      <span
                        className={`company-application-status ${application.statusType}`}
                      >
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* Upcoming */}
        <article className="company-panel">
          <div className="company-panel-header">
            <div>
              <span className="company-panel-label">
                SCHEDULE
              </span>

              <h2>Upcoming Interviews / Deadlines</h2>
            </div>
          </div>

          <div className="company-schedule-list">
            {interviews.map((item) => (
              <div
                className="company-schedule-item"
                key={item.title}
              >
                <div className={`company-schedule-icon ${item.tone}`}>
                  {item.tone === "blue" ? (
                    <Video size={17} />
                  ) : (
                    <Clock3 size={17} />
                  )}
                </div>

                <div className="company-schedule-info">
                  <strong>{item.title}</strong>

                  <span>{item.subtitle}</span>

                  <small>{item.time}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Recruitment Insight */}
      <section className="company-insight-card">
        <div className="company-insight-icon">
          <GraduationCap size={21} />
        </div>

        <div className="company-insight-content">
          <span>RECRUITMENT INSIGHT</span>

          <h2>
            Connect your opportunities with the right talent.
          </h2>

          <p>
            Candidate matching, skill evidence and explainable
            insights will appear here when recruitment data is
            connected to the platform.
          </p>
        </div>

       <button
  type="button"
  className="company-insight-action"
  onClick={() => goTo("/company/candidates")}
>
  Explore Candidates
  <ArrowUpRight size={16} />
</button>
      </section>

      {selectedApplication && (
        <div
          className="company-application-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedApplication(null);
            }
          }}
        >
          <section
            className="company-application-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="company-application-modal-title"
          >
            <div className="company-application-modal-header">
              <div>
                <span className="company-panel-label">APPLICATION DETAILS</span>
                <h2 id="company-application-modal-title">
                  {selectedApplication.candidate}
                </h2>
                <p>{selectedApplication.role}</p>
              </div>

              <button
                type="button"
                className="company-modal-close"
                onClick={() => setSelectedApplication(null)}
                aria-label="Close application details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="company-application-modal-grid">
              <div>
                <span>Email</span>
                <strong>
                  {applicationDetails[selectedApplication.candidate]?.email}
                </strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>
                  {applicationDetails[selectedApplication.candidate]?.phone}
                </strong>
              </div>

              <div>
                <span>Education</span>
                <strong>
                  {applicationDetails[selectedApplication.candidate]?.education}
                </strong>
              </div>

              <div>
                <span>Experience</span>
                <strong>
                  {applicationDetails[selectedApplication.candidate]?.experience}
                </strong>
              </div>

              <div className="full">
                <span>Skills</span>
                <strong>
                  {applicationDetails[selectedApplication.candidate]?.skills}
                </strong>
              </div>

              <div>
                <span>Applied On</span>
                <strong>{selectedApplication.date}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedApplication.status}</strong>
              </div>
            </div>

            <div className="company-application-modal-footer">
              <button
                type="button"
                className="company-modal-secondary"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="company-modal-primary"
                onClick={() => goTo("/company/candidates")}
              >
                Open Candidates
                <ArrowUpRight size={15} />
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}