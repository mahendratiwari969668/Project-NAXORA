import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Handshake,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./InstitutionDashboard.css";

const quickActions = [
  {
    title: "View Students",
    description: "Manage registered students and profiles.",
    icon: Users,
    path: "/institution/students",
  },
  {
    title: "Skill Intelligence",
    description: "Explore skills, gaps and department trends.",
    icon: GraduationCap,
    path: "/institution/skill-intelligence",
  },
  {
    title: "Internships",
    description: "Manage internship opportunities and applications.",
    icon: BriefcaseBusiness,
    path: "/institution/internships",
  },
  {
    title: "Industry Collaboration",
    description: "Manage companies and collaboration programs.",
    icon: Handshake,
    path: "/institution/industry-collaboration",
  },
];

export default function InstitutionDashboard() {
  return (
    <div className="institution-dashboard">

      {/* Header */}

      <section className="institution-dashboard-header">
        <div>
          <p className="institution-dashboard-eyebrow">
            INSTITUTION OVERVIEW
          </p>

          <h1>Institution Dashboard</h1>

          <p>
            Manage students, skills, opportunities and industry
            connections from one workspace.
          </p>
        </div>

       <Link
  to="/institution/settings"
  className="institution-profile-button"
>
  <Building2 size={17} />
  Institution Profile
</Link>
      </section>


      {/* Overview Cards */}

      <section className="institution-overview-grid">

        <div className="institution-overview-card">
          <div className="institution-overview-icon">
            <Users size={20} />
          </div>

          <div className="institution-overview-content">
            <span>Total Students</span>
            <strong>—</strong>
            <small>Student data will appear here</small>
          </div>
        </div>


        <div className="institution-overview-card">
          <div className="institution-overview-icon">
            <GraduationCap size={20} />
          </div>

          <div className="institution-overview-content">
            <span>Skill Coverage</span>
            <strong>—</strong>
            <small>Skill intelligence will appear here</small>
          </div>
        </div>


        <div className="institution-overview-card">
          <div className="institution-overview-icon">
            <BriefcaseBusiness size={20} />
          </div>

          <div className="institution-overview-content">
            <span>Opportunities</span>
            <strong>—</strong>
            <small>Active opportunities will appear here</small>
          </div>
        </div>


        <div className="institution-overview-card">
          <div className="institution-overview-icon">
            <Handshake size={20} />
          </div>

          <div className="institution-overview-content">
            <span>Industry Connections</span>
            <strong>—</strong>
            <small>Connected companies will appear here</small>
          </div>
        </div>

      </section>


      {/* Main Grid */}

      <section className="institution-dashboard-grid">

        {/* Getting Started */}

        <div className="institution-dashboard-panel institution-getting-started">

          <div className="institution-panel-header">
            <div>
              <h2>Getting started</h2>
              <p>
                Complete your institution workspace to unlock
                the full platform.
              </p>
            </div>
          </div>


          <div className="institution-progress-box">

            <div className="institution-progress-top">
              <span>Profile completion</span>
              <strong>—</strong>
            </div>

            <div className="institution-progress-track">
              <div className="institution-progress-value" />
            </div>

            <span className="institution-progress-note">
              Complete your institution profile to continue.
            </span>

          </div>


          <div className="institution-checklist">

            <div className="institution-check-item">
              <span className="institution-check-number">
                01
              </span>

              <div>
                <strong>Complete institution profile</strong>
                <p>
                  Add official institution information and
                  authorized person details.
                </p>
              </div>

              <ArrowUpRight size={17} />
            </div>


            <div className="institution-check-item">
              <span className="institution-check-number">
                02
              </span>

              <div>
                <strong>Verify institution</strong>
                <p>
                  Complete email, document and administrative
                  verification.
                </p>
              </div>

              <ArrowUpRight size={17} />
            </div>


            <div className="institution-check-item">
              <span className="institution-check-number">
                03
              </span>

              <div>
                <strong>Connect with industry</strong>
                <p>
                  Build connections with companies and
                  opportunity providers.
                </p>
              </div>

              <ArrowUpRight size={17} />
            </div>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="institution-dashboard-panel">

          <div className="institution-panel-header">
            <div>
              <h2>Quick actions</h2>
              <p>
                Jump directly to important institution areas.
              </p>
            </div>
          </div>


          <div className="institution-quick-actions">

           {quickActions.map(
  ({ title, description, icon: Icon, path }) => (
    <Link
      to={path}
      className="institution-quick-action"
      key={title}
    >
      <div className="institution-quick-icon">
        <Icon size={19} />
      </div>

      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <ArrowUpRight size={16} />
    </Link>
  )
)}

          </div>

        </div>

      </section>


      {/* Bottom Section */}

      <section className="institution-bottom-grid">

        <div className="institution-dashboard-panel institution-empty-panel">

          <div className="institution-panel-header">
            <div>
              <h2>Recent activity</h2>
              <p>
                Institution activity will appear here.
              </p>
            </div>
          </div>

          <div className="institution-empty-state">
            <div className="institution-empty-icon">
              <Building2 size={21} />
            </div>

            <h3>No activity yet</h3>

            <p>
              Once students, opportunities and companies are
              connected, recent activity will appear here.
            </p>
          </div>

        </div>


        <div className="institution-dashboard-panel institution-empty-panel">

          <div className="institution-panel-header">
            <div>
              <h2>Industry demand</h2>
              <p>
                Industry skill demand will appear here.
              </p>
            </div>
          </div>

          <div className="institution-empty-state">
            <div className="institution-empty-icon">
              <BriefcaseBusiness size={21} />
            </div>

            <h3>Data will appear here</h3>

            <p>
              Industry demand insights will be generated from
              connected companies and opportunities.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}