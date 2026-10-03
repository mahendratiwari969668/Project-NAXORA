import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
  Workflow,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import ThemeToggle from "../../common/ThemeToggle";
import "./CompanySidebar.css";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/company/dashboard",
  },
  {
    label: "Company Profile",
    icon: Building2,
    to: "/company/profile",
  },
  {
    label: "Jobs & Internships",
    icon: BriefcaseBusiness,
    to: "/company/jobs",
  },
  {
    label: "Candidates",
    icon: Users,
    to: "/company/candidates",
  },
  {
    label: "Applications",
    icon: FileText,
    to: "/company/applications",
  },
  {
    label: "Hiring Pipeline",
    icon: Workflow,
    to: "/company/hiring-pipeline",
  },
  {
    label: "Colleges",
    icon: GraduationCap,
    to: "/company/colleges",
  },
  {
    label: "Analytics & Reports",
    icon: BarChart3,
    to: "/company/analytics",
  },
  {
    label: "Notifications",
    icon: Bell,
    to: "/company/notifications",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/company/settings",
  },
];

export default function CompanySidebar() {
  return (
    <aside className="company-sidebar">
      {/* BRAND */}
      <div className="company-sidebar-brand">
        <NavLink
          to="/company/dashboard"
          className="company-sidebar-logo-link"
        >
          <span className="company-sidebar-logo">N</span>

          <span className="company-sidebar-brand-text">
            <strong>NEXORA</strong>
            <small>Company Workspace</small>
          </span>
        </NavLink>
      </div>

      {/* NAVIGATION */}
      <nav className="company-sidebar-navigation">
        <div className="company-sidebar-section-label">
          WORKSPACE
        </div>

        {navigation.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `company-sidebar-nav-item ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="company-sidebar-nav-icon">
              <Icon
                size={18}
                strokeWidth={1.8}
              />
            </span>

            <span className="company-sidebar-nav-label">
              {label}
            </span>

            {label === "Notifications" && (
              <span className="company-sidebar-notification-dot" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* BOTTOM AREA */}
      <div className="company-sidebar-bottom">

        {/* THEME TOGGLE */}
        <div className="company-sidebar-theme">
  <span>Appearance</span>
  <ThemeToggle />
</div>

        {/* ACCOUNT */}
        <div className="company-sidebar-account">
          <span className="company-sidebar-avatar">
            <Building2 size={17} />
          </span>

          <span className="company-sidebar-account-info">
            <strong>Company</strong>
            <small>Company account</small>
          </span>
        </div>
      </div>
    </aside>
  );
}