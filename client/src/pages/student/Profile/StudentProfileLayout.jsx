import {
  Award,
  BarChart3,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  UserRound,
} from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";

import "./StudentProfileLayout.css";

const profileNavigation = [
  {
    label: "Personal Info",
    icon: UserRound,
    to: ".",
    end: true,
  },
  {
    label: "Education",
    icon: GraduationCap,
    to: "education",
  },
  {
    label: "Skills",
    icon: BarChart3,
    to: "skills",
  },
  {
    label: "Projects",
    icon: BriefcaseBusiness,
    to: "projects",
  },
  {
    label: "Certifications",
    icon: Award,
    to: "certifications",
  },
  {
    label: "Resume",
    icon: FileText,
    to: "resume",
  },
];

export default function StudentProfileLayout() {
  return (
    <div className="student-profile-layout">

      {/* PROFILE SIDEBAR */}
      <aside className="student-profile-sidebar">

        <div className="student-profile-sidebar-title">
          PROFILE
        </div>

        <nav className="student-profile-navigation">

          {profileNavigation.map(
            ({ label, icon: Icon, to, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `student-profile-nav-item ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon size={19} />

                <span>
                  {label}
                </span>

                <span className="student-profile-nav-arrow">
                  ›
                </span>
              </NavLink>
            )
          )}

        </nav>


        {/* PROFILE SETUP */}
        <div className="student-profile-setup">

          <div className="student-profile-setup-header">
            <span>
              PROFILE SETUP
            </span>

            <span className="student-profile-setup-line" />
          </div>

          <div className="student-profile-progress">
            <span />
          </div>

          <p>
            Complete your profile to unlock more features.
          </p>

        </div>

      </aside>


      {/* ONLY THIS PART CHANGES */}
      <main className="student-profile-content">
        <Outlet />
      </main>

    </div>
  );
}