import { useState } from "react";
import "./StudentDashboard.css";

import {
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Search,
  Sparkles,
  Target,
  UserRound,
  BarChart3,
} from "lucide-react";

import { Link } from "react-router-dom";
import ThemeToggle from "../../../components/common/ThemeToggle";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/student/dashboard",
  },
  {
    label: "Profile",
    icon: UserRound,
    to: "/student/profile",
  },
  {
    label: "Skill Mapping",
    icon: BarChart3,
    to: "/student/skill-mapping",
  },
  {
    label: "Opportunities",
    icon: BriefcaseBusiness,
    to: "/student/opportunities",
  },
  {
    label: "Applications",
    icon: FileText,
    to: "/student/applications",
  },
  {
    label: "Learning",
    icon: BookOpen,
    to: "/student/learning",
  },
  {
    label: "Notifications",
    icon: Bell,
    to: "/student/notifications",
  },
];

const summaryCards = [
  {
    title: "Skills Added",
    value: "—",
    note: "Build your skill profile",
    icon: Target,
    tone: "blue",
  },
  {
    title: "Active Applications",
    value: "—",
    note: "Applications will appear here",
    icon: FileText,
    tone: "green",
  },
  {
    title: "Saved Opportunities",
    value: "—",
    note: "Save opportunities to track them",
    icon: Bookmark,
    tone: "rose",
  },
  {
    title: "Recommended Courses",
    value: "—",
    note: "Recommendations coming later",
    icon: GraduationCap,
    tone: "violet",
  },
];

const skills = [
  {
    name: "JavaScript",
    value: null,
    tone: "blue",
  },
  {
    name: "React",
    value: null,
    tone: "cyan",
  },
  {
    name: "Node.js",
    value: null,
    tone: "green",
  },
  {
    name: "MongoDB",
    value: null,
    tone: "orange",
  },
];

const careerGoals = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Software Engineer",
  "Data Analyst",
  "Data Scientist",
  "UI/UX Designer",
  "Cyber Security",
];

const opportunities = [
  {
    title: "Opportunities matched to you",
    company: "Complete your profile first",
    type: "Profile required",
    icon: BriefcaseBusiness,
  },
  {
    title: "Internships and jobs",
    company: "Based on your skills",
    type: "Coming soon",
    icon: Target,
  },
  {
    title: "Learning opportunities",
    company: "Based on your career goals",
    type: "Coming soon",
    icon: BookOpen,
  },
];

export default function StudentDashboard() {
  const [careerGoal, setCareerGoal] = useState("");

  const handleCareerGoalChange = (event) => {
    setCareerGoal(event.target.value);
  };

  return (
    <div className="student-dashboard">

      <aside className="student-sidebar">
        <div className="sidebar-top">
          <Link
            to="/student/dashboard"
            className="student-logo"
          >
            <span className="student-logo-mark">N</span>

            <span className="student-logo-text">
              <strong>NEXORA</strong>
              <small>Student Workspace</small>
            </span>
          </Link>

          <nav className="student-navigation">
            {navigation.map(({ label, icon: Icon, to }, index) => (
              <Link
                key={label}
                to={to}
                className={`student-nav-item ${
                  index === 0 ? "active" : ""
                }`}
              >
                <span className="student-nav-icon">
                  <Icon size={18} />
                </span>

                <span>{label}</span>

                {label === "Notifications" && (
                  <span className="notification-count">3</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-ai-card">
            <div className="sidebar-ai-icon">
              <Sparkles size={17} />
            </div>

            <strong>Build your profile</strong>

            <p>
              Complete your profile to unlock personalized
              features.
            </p>

            <Link to="/student/profile">
              Complete profile
              <ArrowRight size={14} />
            </Link>
          </div>

          <Link
            to="/student/profile"
            className="sidebar-user"
          >
            <div className="sidebar-user-avatar">
              <UserRound size={18} />
            </div>

            <div className="sidebar-user-info">
              <strong>Student</strong>
              <span>Student account</span>
            </div>

            <ChevronRight size={17} />
          </Link>
        </div>
      </aside>


      <div className="student-content">
        {/* HEADER */}

        <header className="student-topbar">
          <div className="student-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search opportunities, skills, companies..."
              aria-label="Search"
            />
          </div>

          <div className="student-top-actions">
            <ThemeToggle />

            <Link
              to="/student/notifications"
              className="top-action-button notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span />
            </Link>

            <Link
              to="/student/profile"
              className="top-profile"
            >
              <span className="top-profile-avatar">
                <UserRound size={18} />
              </span>

              <ChevronDown size={15} />
            </Link>
          </div>
        </header>

        <main className="student-main">

          <section className="student-welcome">
            <div>
              <span className="dashboard-section-label">
                STUDENT DASHBOARD
              </span>

              <h1>
                Good morning, Student!
              </h1>

              <p>
                Keep learning, keep building. You're one step
                closer to your career goals.
              </p>
            </div>

            <div className="welcome-date">
              <strong>Student Workspace</strong>
              <span>Here's your progress today.</span>
            </div>
          </section>


          <section className="profile-progress-card">
            <div className="profile-progress-ring">
              <div>
                <strong>—</strong>
                <span>Setup</span>
              </div>
            </div>

            <div className="profile-progress-content">
              <span className="profile-progress-label">
                PROFILE SETUP
              </span>

              <h2>Complete Your Profile</h2>

              <p>
                Add your education, skills and projects to unlock
                better opportunities.
              </p>

              <div className="profile-progress-track">
                <span style={{ width: "12%" }} />
              </div>

              <small>
                Start by completing your profile information
              </small>
            </div>

            <Link
              to="/student/profile"
              className="profile-progress-button"
            >
              Complete Profile
              <ArrowRight size={17} />
            </Link>
          </section>

          <section className="summary-grid">
            {summaryCards.map(
              ({
                title,
                value,
                note,
                icon: Icon,
                tone,
              }) => (
                <article
                  key={title}
                  className={`summary-card ${tone}`}
                >
                  <div className="summary-card-icon">
                    <Icon size={20} />
                  </div>

                  <div className="summary-card-content">
                    <span>{title}</span>

                    <strong>{value}</strong>

                    <small>{note}</small>
                  </div>
                </article>
              )
            )}
          </section>


          <section className="dashboard-two-column">
            <article className="dashboard-panel skills-panel">
              <div className="panel-heading">
                <div>
                  <span>YOUR SKILLS</span>
                  <h2>Skill Overview</h2>
                </div>

                <Link to="/student/skill-mapping">
                  View All
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="skills-list">
                {skills.map(({ name, value, tone }) => (
                  <div
                    className="skill-row"
                    key={name}
                  >
                    <div
                      className={`skill-symbol ${tone}`}
                    >
                      {name === "JavaScript"
                        ? "JS"
                        : name === "React"
                        ? "R"
                        : name === "Node.js"
                        ? "N"
                        : "M"}
                    </div>

                    <div className="skill-name">
                      <strong>{name}</strong>

                      <span>
                        {value === null
                          ? "Not assessed"
                          : `${value}%`}
                      </span>
                    </div>

                    <div className="skill-bar">
                      <span
                        style={{
                          width:
                            value === null
                              ? "8%"
                              : `${value}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="skills-empty-note">
                <Lightbulb size={16} />

                <span>
                  Add and assess your skills to see your actual
                  skill strength here.
                </span>
              </div>
            </article>


            <article className="dashboard-panel skill-gap-panel">
              <div className="panel-heading">
                <div>
                  <span>CAREER READINESS</span>
                  <h2>Skill Gap</h2>
                </div>

                <Link to="/student/skill-mapping">
                  Analyze
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="career-select">
                <span>Career goal</span>

                <select
                  className="career-goal-select"
  value={careerGoal}
  onChange={handleCareerGoalChange}
  aria-label="Select career goal"
                >
                  <option value="">
                    Select career goal
                  </option>

                  {careerGoals.map((goal) => (
                    <option
                      key={goal}
                      value={goal}
                    >
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              <div className="skill-gap-info">
                <div className="skill-gap-info-icon">
                  <Lightbulb size={19} />
                </div>

                <div>
                  <strong>
                    {careerGoal
                      ? `${careerGoal} skill profile`
                      : "Build your skill profile"}
                  </strong>

                  <p>
                    {careerGoal
                      ? `Add and assess your skills to understand how ready you are for a ${careerGoal} role.`
                      : "Add skills and choose a career goal to generate meaningful skill-gap analysis."}
                  </p>
                </div>
              </div>

              <div className="skill-gap-list">
                <span>
                  Add your current skills
                </span>

                <span>
                  Complete skill assessment
                </span>

                <span
                  className={
                    careerGoal
                      ? "completed"
                      : ""
                  }
                >
                  {careerGoal
                    ? `Career goal: ${careerGoal}`
                    : "Set your career goals"}
                </span>
              </div>
            </article>
          </section>


          <section className="dashboard-opportunities">
            <div className="section-title-row">
              <div>
                <span>DISCOVER</span>
                <h2>Recommended Opportunities</h2>
              </div>

              <Link to="/student/opportunities">
                View All
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="opportunity-grid">
              {opportunities.map(
                ({
                  title,
                  company,
                  type,
                  icon: Icon,
                }) => (
                  <article
                    className="opportunity-card"
                    key={title}
                  >
                    <div className="opportunity-top">
                      <div className="opportunity-company-icon">
                        <Icon size={19} />
                      </div>

                      <button
                        type="button"
                        className="bookmark-button"
                        aria-label="Save opportunity"
                      >
                        <Bookmark size={17} />
                      </button>
                    </div>

                    <h3>{title}</h3>

                    <p>{company}</p>

                    <div className="opportunity-tags">
                      <span>{type}</span>
                      <span>Profile based</span>
                    </div>

                    <div className="opportunity-footer">
                      <span className="opportunity-status">
                        <CheckCircle2 size={15} />
                        Available soon
                      </span>

                      <Link to="/student/opportunities">
                        Explore
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>


          <section className="dashboard-bottom-grid">
            <article className="dashboard-panel learning-panel">
              <div className="panel-heading">
                <div>
                  <span>LEARNING</span>
                  <h2>Your Learning Roadmap</h2>
                </div>

                <Link to="/student/learning">
                  Open
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="learning-empty">
                <div className="learning-empty-icon">
                  <BookOpen size={22} />
                </div>

                <div>
                  <strong>
                    Your roadmap will appear here
                  </strong>

                  <p>
                    Set your career goals and skills first.
                    NEXORA can then help organize your learning
                    path.
                  </p>
                </div>
              </div>
            </article>

            <article className="dashboard-panel applications-panel">
              <div className="panel-heading">
                <div>
                  <span>APPLICATIONS</span>
                  <h2>Recent Applications</h2>
                </div>

                <Link to="/student/applications">
                  View All
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="applications-empty">
                <div className="applications-empty-icon">
                  <FileText size={21} />
                </div>

                <strong>No applications yet</strong>

                <p>
                  Applications will appear here once you apply
                  for opportunities.
                </p>

                <Link to="/student/opportunities">
                  Explore Opportunities
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}