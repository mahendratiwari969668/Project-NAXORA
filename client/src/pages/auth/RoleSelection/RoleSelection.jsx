import {
  Building2,
  GraduationCap,
  Users,
} from "lucide-react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import ThemeToggle from "../../../components/common/ThemeToggle";

const roles = [
  [
    "Student",
    "Build your profile, map skills and discover opportunities.",
    GraduationCap,
  ],
  [
    "Institution",
    "Manage students, skill intelligence and placements.",
    Building2,
  ],
  [
    "Company",
    "Create opportunities, discover candidates and hire.",
    Users,
  ],
];

export default function RoleSelection() {
  const [searchParams] = useSearchParams();

  // login or register
  const mode = searchParams.get("mode") || "register";

  return (
    <main className="auth-page">
      <div className="auth-shell">

        {/* Brand */}
        <Link className="brand" to="/">
          <span className="brand-mark">N</span>
          NEXORA
        </Link>

        <ThemeToggle />

        {/* Heading */}
        <div className="narrow-heading">
          <div className="eyebrow">
            {mode === "login"
              ? "WELCOME BACK"
              : "GET STARTED"}
          </div>

          <h2>
            Choose your workspace
          </h2>

          <p>
            {mode === "login"
              ? "Select the role you want to sign in with."
              : "Select the role you want to continue with. Your registration will be created for this role."}
          </p>
        </div>

        {/* Roles */}
        <div className="role-select-grid">

          {roles.map(([title, text, Icon]) => {
            const role = title.toLowerCase();

            /*
             * Login:
             * /auth/student/login
             * /auth/institution/login
             * /auth/company/login
             *
             * Register:
             * /auth/student/register
             * /auth/institution/register
             * /auth/company/register
             */
            const destination =
              mode === "login"
                ? `/auth/${role}/login`
                : `/auth/${role}/register`;

            return (
              <Link
                className="role-select-card"
                to={destination}
                key={title}
              >
                <div className="icon-box">
                  <Icon size={22} />
                </div>

                <h3>{title}</h3>

                <p>{text}</p>

                <span>
                  Continue →
                </span>
              </Link>
            );
          })}

        </div>

        <Link className="back-link" to="/">
          ← Back to NEXORA
        </Link>

      </div>
    </main>
  );
}