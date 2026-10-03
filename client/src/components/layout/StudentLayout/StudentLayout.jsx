import {
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Settings,
  UserRound,
} from "lucide-react";

import { Link, Outlet, useLocation } from "react-router-dom";
import ThemeToggle from "../../common/ThemeToggle";

import "./StudentLayout.css";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/student/dashboard",
    match: "/student/dashboard",
  },
  {
    label: "Profile",
    icon: UserRound,
    to: "/student/profile",
    match: "/student/profile",
  },
  {
    label: "Skill Mapping",
    icon: BarChart3,
    to: "/student/skill-mapping",
    match: "/student/skill-mapping",
  },
  {
    label: "Opportunities",
    icon: BriefcaseBusiness,
    to: "/student/opportunities",
    match: "/student/opportunities",
  },
  {
    label: "Applications",
    icon: FileText,
    to: "/student/applications",
    match: "/student/applications",
  },
  
  {
    label: "Learning",
    icon: BookOpen,
    to: "/student/learning",
    match: "/student/learning",
  },
  {
    label: "Notifications",
    icon: Bell,
    to: "/student/notifications",
    match: "/student/notifications",
  },
  {
  label: "Settings",
  icon: Settings,
  to: "/student/settings",
  match: "/student/settings",
},
];

export default function StudentLayout() {
  const location = useLocation();

  const isActive = (match) => {
    return location.pathname === match ||
      location.pathname.startsWith(`${match}/`);
  };

  return (
    <div className="student-layout">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="student-layout-sidebar">
        {/* BRAND */}

        <Link
          to="/student/dashboard"
          className="student-layout-brand"
        >
          <span className="student-layout-brand-mark">
            N
          </span>

          <span className="student-layout-brand-text">
            <strong>NEXORA</strong>
            <small>Student Workspace</small>
          </span>
        </Link>

        {/* NAVIGATION */}

        <nav className="student-layout-nav">
          {navigation.map(
            ({ label, icon: Icon, to, match }) => {
              const active = isActive(match);

              return (
                <Link
                  key={label}
                  to={to}
                  className={`student-layout-nav-item ${
                    active ? "active" : ""
                  }`}
                >
                  <Icon size={19} />

                  <span>{label}</span>

                  {active && (
                    <ChevronRight
                      className="student-layout-nav-arrow"
                      size={16}
                    />
                  )}
                </Link>
              );
            }
          )}
        </nav>

        {/* USER */}

        <Link
          to="/student/profile"
          className="student-layout-user"
        >
          <span className="student-layout-user-avatar">
            <UserRound size={18} />
          </span>

          <span className="student-layout-user-info">
            <strong>Student</strong>
            <small>Student account</small>
          </span>

          <ChevronRight size={17} />
        </Link>
      </aside>

      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="student-layout-content">
        {/* TOPBAR */}

        <header className="student-layout-topbar">
          <span className="student-layout-portal-label">
            STUDENT PORTAL
          </span>

          <div className="student-layout-topbar-actions">
            <ThemeToggle />

            <Link
              to="/student/notifications"
              className="student-layout-icon-button"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={19} />
            </Link>

            <Link
              to="/student/profile"
              className="student-layout-profile-button"
              aria-label="Profile"
              title="Profile"
            >
              <UserRound size={18} />
            </Link>
          </div>
        </header>

        {/* PAGE */}

        <main className="student-layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}