import {
  BarChart3,
  Bell,
  Building2,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import "./InstitutionSidebar.css";

const navigation = [
  {
    label: "Dashboard",
    path: "/institution/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Students",
    path: "/institution/students",
    icon: Users,
  },
  {
    label: "Skill Intelligence",
    path: "/institution/skill-intelligence",
    icon: BarChart3,
  },
  {
    label: "Internships",
    path: "/institution/internships",
    icon: BriefcaseBusiness,
  },
  {
    label: "Placements",
    path: "/institution/placements",
    icon: GraduationCap,
  },
  {
    label: "Companies",
    path: "/institution/companies",
    icon: Building2,
  },
  {
    label: "Industry Collaboration",
    path: "/institution/industry-collaboration",
    icon: Handshake,
  },
  {
    label: "Reports",
    path: "/institution/reports",
    icon: FileText,
  },
  {
    label: "Notifications",
    path: "/institution/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    path: "/institution/settings",
    icon: Settings,
  },
];

export default function InstitutionSidebar() {
  return (
    <aside className="institution-sidebar">
      <div className="institution-sidebar-brand">
        <div className="institution-brand-mark">N</div>

        <div className="institution-brand-text">
          <strong>NEXORA</strong>
          <span>Institution Workspace</span>
        </div>
      </div>

      <nav className="institution-sidebar-nav">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `institution-nav-item ${
                isActive ? "active" : ""
              }`
            }
          >
            <Icon size={19} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="institution-sidebar-footer">
        <div className="institution-sidebar-footer-icon">
          <Building2 size={18} />
        </div>

        <div>
          <strong>Institution Portal</strong>
          <span>NEXORA Workspace</span>
        </div>
      </div>
    </aside>
  );
}