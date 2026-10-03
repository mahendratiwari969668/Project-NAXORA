import { useEffect, useRef, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  Camera,
  CircleHelp,
  Eye,
  Globe2,
  KeyRound,
  LockKeyhole,
  Mail,
  X,
  Monitor,
  Palette,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  UserRound,
  Users,
  FileText,
} from "lucide-react";

import "./CompanySettings.css";

const settingsSections = [
  {
    id: "account",
    label: "Account",
    icon: UserRound,
    description: "Personal account details",
  },
  {
    id: "company",
    label: "Company Profile",
    icon: Building2,
    description: "Company information",
  },
  {
    id: "hiring",
    label: "Hiring Preferences",
    icon: SlidersHorizontal,
    description: "Recruitment preferences",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Email and workspace alerts",
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
    description: "Password and access",
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Eye,
    description: "Visibility and data",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Workspace appearance",
  },
];

export default function CompanySettings() {
  const [activeSection, setActiveSection] = useState("account");
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("nexora-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [compactWorkspace, setCompactWorkspace] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [sessions, setSessions] = useState([
    {
      id: "current-windows",
      device: "Windows · Chrome",
      detail: "Current device · Varanasi, India",
      current: true,
    },
    {
      id: "android-chrome",
      device: "Android · Chrome",
      detail: "Last active 2 days ago",
      current: false,
    },
    {
      id: "laptop-edge",
      device: "Windows · Edge",
      detail: "Last active 5 days ago",
      current: false,
    },
  ]);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [dangerAction, setDangerAction] = useState(null);
  const [dangerStep, setDangerStep] = useState(1);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationOtp, setVerificationOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [dangerError, setDangerError] = useState("");
  const [dangerConfirmed, setDangerConfirmed] = useState(false);
  const [accountStatus, setAccountStatus] = useState("Active");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [toast, setToast] = useState("");
  const photoInputRef = useRef(null);

  const [account, setAccount] = useState({
    firstName: "Amit",
    lastName: "Kumar",
    email: "amit.kumar@technova.com",
    phone: "+91 98765 43210",
    designation: "HR Manager",
  });

  const [company, setCompany] = useState({
    name: "TechNova",
    website: "https://technova.example",
    industry: "Information Technology",
    size: "201-500 employees",
    location: "Varanasi, Uttar Pradesh, India",
  });

  const [hiring, setHiring] = useState({
    defaultWorkMode: "Hybrid",
    defaultEmployment: "Full-time",
    preferredExperience: "0-3 years",
    defaultApplicationDays: "30",
    allowOpenApplications: true,
    requireResume: true,
    requireCoverLetter: false,
  });

  const [notifications, setNotifications] = useState({
    newApplications: true,
    candidateUpdates: true,
    interviewReminders: true,
    collegeRequests: true,
    opportunityDeadlines: true,
    weeklyReports: true,
    productUpdates: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: "30 minutes",
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "Connected users",
    showCompanyEmail: true,
    allowCandidateDiscovery: true,
    allowCollegeDiscovery: true,
  });

  useEffect(() => {
    const applyTheme = (selectedTheme) => {
      const root = document.documentElement;
      const body = document.body;
      const resolvedTheme =
        selectedTheme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : selectedTheme;

      root.dataset.theme = resolvedTheme;
      body.dataset.theme = resolvedTheme;
      root.classList.toggle("dark", resolvedTheme === "dark");
      body.classList.toggle("dark", resolvedTheme === "dark");
    };

    applyTheme(theme);

    try {
      localStorage.setItem("nexora-theme", theme);
    } catch {
      // Local storage can be unavailable in restricted browser contexts.
    }

    if (theme !== "system") {
      return undefined;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemTheme = () => applyTheme("system");
    media.addEventListener?.("change", handleSystemTheme);

    return () => {
      media.removeEventListener?.("change", handleSystemTheme);
    };
  }, [theme]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message) => {
    setToast(message);
  };

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    showToast(
      `${nextTheme === "system" ? "System" : nextTheme === "dark" ? "Dark" : "Light"} theme applied.`
    );
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfilePhoto(file.name);
    showToast("Profile photo selected. Save Changes to keep this selection.");
  };

  const handleSave = () => {
    try {
      localStorage.setItem(
        "nexora-company-settings",
        JSON.stringify({
          account,
          company,
          hiring,
          notifications,
          security,
          privacy,
          theme,
          compactWorkspace,
          showNotificationBadge,
        })
      );
    } catch {
      // Keep the demo usable even if browser storage is unavailable.
    }

    setSaved(true);
    showToast("Your workspace settings have been saved.");

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const openChangePassword = () => {
    setPasswordForm({ current: "", next: "", confirm: "" });
    setPasswordError("");
    setChangePasswordOpen(true);
  };

  const handlePasswordChange = () => {
    if (!passwordForm.current.trim()) {
      setPasswordError("Enter your current password.");
      return;
    }

    if (passwordForm.next.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setChangePasswordOpen(false);
    setPasswordForm({ current: "", next: "", confirm: "" });
    setPasswordError("");
    showToast("Password changed successfully in this demo workspace.");
  };

  const openDangerAction = (action) => {
    setDangerAction(action);
    setDangerStep(1);
    setVerificationEmail("");
    setVerificationOtp("");
    setGeneratedOtp("");
    setDangerError("");
    setDangerConfirmed(false);
  };

  const sendDangerOtp = () => {
    if (verificationEmail.trim().toLowerCase() !== account.email.toLowerCase()) {
      setDangerError("Enter the official account email shown in Account.");
      return;
    }

    const otp = "482913";
    setGeneratedOtp(otp);
    setDangerStep(3);
    setDangerError("");
    showToast("Verification OTP generated for this frontend demo.");
  };

  const verifyDangerOtp = () => {
    if (verificationOtp !== generatedOtp) {
      setDangerError("Invalid OTP. Enter the 6-digit verification code.");
      return;
    }

    if (dangerAction === "delete") {
      setDangerStep(4);
    } else {
      setAccountStatus("Deactivated");
      setDangerAction(null);
      setDangerStep(1);
      showToast("Company workspace deactivated.");
    }
  };

  const confirmDelete = () => {
    setAccountStatus("Deleted");
    setDangerAction(null);
    setDangerStep(1);
    setVerificationOtp("");
    showToast("Company account deletion confirmed in this demo workspace.");
  };

  const signOutSession = (sessionId) => {
    setSessions((current) =>
      current.filter((session) => session.id !== sessionId)
    );
    showToast("Selected device session has been signed out.");
  };

  const contactSupport = () => {
    showToast("Support contact is ready for the backend support integration.");
  };

  const updateState = (setter, key, value) => {
    setter((current) => ({
      ...current,
      [key]: value,
    }));
    setSaved(false);
  };

  const renderToggle = (checked, onChange) => (
    <button
      type="button"
      className={`company-settings-toggle ${
        checked ? "active" : ""
      }`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span />
    </button>
  );

  return (
    <div className="company-settings-page">
      {/* HEADER */}

      <header className="company-settings-header">
        <div>
          <span className="company-settings-eyebrow">
            <SlidersHorizontal size={15} />
            Workspace Configuration
          </span>

          <h1>Settings</h1>

          <p>
            Manage your company account, hiring preferences, security and
            workspace controls.
          </p>
        </div>

        <button
          className={`company-settings-save ${
            saved ? "saved" : ""
          }`}
          onClick={handleSave}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Changes Saved" : "Save Changes"}
        </button>
      </header>

      <div className="company-settings-layout">
        {/* SETTINGS NAV */}

        <aside className="company-settings-navigation">
          <div className="company-settings-nav-title">
            SETTINGS
          </div>

          {settingsSections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                className={
                  activeSection === section.id ? "active" : ""
                }
                onClick={() => setActiveSection(section.id)}
              >
                <span className="company-settings-nav-icon">
                  <Icon size={17} />
                </span>

                <span className="company-settings-nav-copy">
                  <strong>{section.label}</strong>
                  <small>{section.description}</small>
                </span>

                <ChevronRight size={15} />
              </button>
            );
          })}

          <div className="company-settings-help-card">
            <div>
              <CircleHelp size={17} />
            </div>

            <strong>Need help?</strong>

            <p>
              Contact NEXORA support if you need assistance with your
              company workspace.
            </p>

            <button type="button" onClick={contactSupport}>
              Contact Support
            </button>
          </div>
        </aside>

        {/* CONTENT */}

        <main className="company-settings-content">
          {/* ACCOUNT */}

          {activeSection === "account" && (
            <section className="company-settings-section">
              <SectionHeader
                icon={UserRound}
                title="Account Information"
                description="Manage the personal details associated with your company account."
              />

              <div className="company-settings-profile-banner">
                <div className="company-settings-avatar">
                  AK
                </div>

                <div>
                  <strong>
                    {account.firstName} {account.lastName}
                  </strong>
                  <span>{account.designation}</span>
                  <small>{account.email}</small>
                  <span className="company-settings-account-status">
                    {accountStatus}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Camera size={13} />
                  {profilePhoto ? "Change Photo" : "Change Photo"}
                </button>
                <input
                  ref={photoInputRef}
                  className="company-settings-hidden-file"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>

              <div className="company-settings-form-grid">
                <FormField
                  label="First Name"
                  value={account.firstName}
                  onChange={(value) =>
                    updateState(
                      setAccount,
                      "firstName",
                      value
                    )
                  }
                />

                <FormField
                  label="Last Name"
                  value={account.lastName}
                  onChange={(value) =>
                    updateState(
                      setAccount,
                      "lastName",
                      value
                    )
                  }
                />

                <FormField
                  label="Official Email"
                  icon={Mail}
                  value={account.email}
                  onChange={(value) =>
                    updateState(
                      setAccount,
                      "email",
                      value
                    )
                  }
                />

                <FormField
                  label="Phone Number"
                  value={account.phone}
                  onChange={(value) =>
                    updateState(
                      setAccount,
                      "phone",
                      value
                    )
                  }
                />

                <FormField
                  label="Designation"
                  value={account.designation}
                  onChange={(value) =>
                    updateState(
                      setAccount,
                      "designation",
                      value
                    )
                  }
                />
              </div>

              <SettingsDivider />

              <SettingRow
                icon={Mail}
                title="Email verification"
                description="Your official company email is verified."
                right={
                  <span className="company-settings-verified">
                    <Check size={13} />
                    Verified
                  </span>
                }
              />
            </section>
          )}

          {/* COMPANY */}

          {activeSection === "company" && (
            <section className="company-settings-section">
              <SectionHeader
                icon={Building2}
                title="Company Profile"
                description="Control the company information visible across the NEXORA platform."
              />

              <div className="company-settings-company-card">
                <div className="company-settings-company-logo">
                  <Building2 size={25} />
                </div>

                <div>
                  <strong>{company.name}</strong>
                  <span>{company.industry}</span>
                </div>

                <span className="company-settings-status">
                  Active
                </span>
              </div>

              <div className="company-settings-form-grid">
                <FormField
                  label="Company Name"
                  value={company.name}
                  onChange={(value) =>
                    updateState(setCompany, "name", value)
                  }
                />

                <FormField
                  label="Website"
                  icon={Globe2}
                  value={company.website}
                  onChange={(value) =>
                    updateState(
                      setCompany,
                      "website",
                      value
                    )
                  }
                />

                <FormField
                  label="Industry"
                  value={company.industry}
                  onChange={(value) =>
                    updateState(
                      setCompany,
                      "industry",
                      value
                    )
                  }
                />

                <SelectField
                  label="Company Size"
                  value={company.size}
                  options={[
                    "1-10 employees",
                    "11-50 employees",
                    "51-200 employees",
                    "201-500 employees",
                    "500+ employees",
                  ]}
                  onChange={(value) =>
                    updateState(setCompany, "size", value)
                  }
                />

                <FormField
                  label="Headquarters"
                  value={company.location}
                  onChange={(value) =>
                    updateState(
                      setCompany,
                      "location",
                      value
                    )
                  }
                />
              </div>

              <div className="company-settings-info-box">
                <Building2 size={17} />
                <span>
                  Some verified company details may require
                  verification before they can be changed.
                </span>
              </div>
            </section>
          )}

          {/* HIRING */}

          {activeSection === "hiring" && (
            <section className="company-settings-section">
              <SectionHeader
                icon={SlidersHorizontal}
                title="Hiring Preferences"
                description="Set defaults that make creating and managing opportunities faster."
              />

              <div className="company-settings-form-grid">
                <SelectField
                  label="Default Work Mode"
                  value={hiring.defaultWorkMode}
                  options={[
                    "On-site",
                    "Hybrid",
                    "Remote",
                  ]}
                  onChange={(value) =>
                    updateState(
                      setHiring,
                      "defaultWorkMode",
                      value
                    )
                  }
                />

                <SelectField
                  label="Default Employment Type"
                  value={hiring.defaultEmployment}
                  options={[
                    "Full-time",
                    "Part-time",
                    "Internship",
                    "Contract",
                  ]}
                  onChange={(value) =>
                    updateState(
                      setHiring,
                      "defaultEmployment",
                      value
                    )
                  }
                />

                <SelectField
                  label="Preferred Experience"
                  value={hiring.preferredExperience}
                  options={[
                    "0-3 years",
                    "1-3 years",
                    "3-5 years",
                    "5+ years",
                  ]}
                  onChange={(value) =>
                    updateState(
                      setHiring,
                      "preferredExperience",
                      value
                    )
                  }
                />

                <SelectField
                  label="Default Application Window"
                  value={hiring.defaultApplicationDays}
                  options={["15", "30", "45", "60"]}
                  onChange={(value) =>
                    updateState(
                      setHiring,
                      "defaultApplicationDays",
                      value
                    )
                  }
                />
              </div>

              <SettingsDivider />

              <SettingRow
                icon={FileIcon}
                title="Allow open applications"
                description="Let candidates submit applications even when they are not matched to a specific opportunity."
                right={renderToggle(
                  hiring.allowOpenApplications,
                  (value) =>
                    updateState(
                      setHiring,
                      "allowOpenApplications",
                      value
                    )
                )}
              />

              <SettingRow
                icon={FileIcon}
                title="Require resume"
                description="Require candidates to upload a resume before submitting an application."
                right={renderToggle(
                  hiring.requireResume,
                  (value) =>
                    updateState(
                      setHiring,
                      "requireResume",
                      value
                    )
                )}
              />

              <SettingRow
                icon={FileIcon}
                title="Require cover letter"
                description="Ask candidates to submit a cover letter with eligible applications."
                right={renderToggle(
                  hiring.requireCoverLetter,
                  (value) =>
                    updateState(
                      setHiring,
                      "requireCoverLetter",
                      value
                    )
                )}
              />
            </section>
          )}

          {/* NOTIFICATIONS */}

          {activeSection === "notifications" && (
            <section className="company-settings-section">
              <SectionHeader
                icon={Bell}
                title="Notification Preferences"
                description="Choose which company activities should generate alerts."
              />

              <SettingRow
                icon={Users}
                title="New applications"
                description="Notify me when a candidate applies to an opportunity."
                right={renderToggle(
                  notifications.newApplications,
                  (value) =>
                    updateState(
                      setNotifications,
                      "newApplications",
                      value
                    )
                )}
              />

              <SettingRow
                icon={UserRound}
                title="Candidate updates"
                description="Receive updates when candidate status changes."
                right={renderToggle(
                  notifications.candidateUpdates,
                  (value) =>
                    updateState(
                      setNotifications,
                      "candidateUpdates",
                      value
                    )
                )}
              />

              <SettingRow
                icon={Bell}
                title="Interview reminders"
                description="Get reminders before scheduled candidate interviews."
                right={renderToggle(
                  notifications.interviewReminders,
                  (value) =>
                    updateState(
                      setNotifications,
                      "interviewReminders",
                      value
                    )
                )}
              />

              <SettingRow
                icon={Building2}
                title="College collaboration requests"
                description="Notify me when colleges send collaboration requests."
                right={renderToggle(
                  notifications.collegeRequests,
                  (value) =>
                    updateState(
                      setNotifications,
                      "collegeRequests",
                      value
                    )
                )}
              />

              <SettingRow
                icon={BriefcaseIcon}
                title="Opportunity deadline reminders"
                description="Receive reminders before active opportunity deadlines."
                right={renderToggle(
                  notifications.opportunityDeadlines,
                  (value) =>
                    updateState(
                      setNotifications,
                      "opportunityDeadlines",
                      value
                    )
                )}
              />

              <SettingRow
                icon={FileIcon}
                title="Weekly recruitment reports"
                description="Receive a weekly summary of company hiring activity."
                right={renderToggle(
                  notifications.weeklyReports,
                  (value) =>
                    updateState(
                      setNotifications,
                      "weeklyReports",
                      value
                    )
                )}
              />

              <SettingRow
                icon={Globe2}
                title="NEXORA product updates"
                description="Occasional updates about new platform features and improvements."
                right={renderToggle(
                  notifications.productUpdates,
                  (value) =>
                    updateState(
                      setNotifications,
                      "productUpdates",
                      value
                    )
                )}
              />
            </section>
          )}

          {/* SECURITY */}

          {activeSection === "security" && (
            <section className="company-settings-section">
              <SectionHeader
                icon={ShieldCheck}
                title="Security & Access"
                description="Protect your company account and control login security."
              />

              <div className="company-settings-security-card">
                <div className="company-settings-security-icon">
                  <LockKeyhole size={21} />
                </div>

                <div>
                  <strong>Password</strong>
                  <span>
                    Last changed 24 days ago
                  </span>
                </div>

                <button type="button" onClick={openChangePassword}>
                  Change Password
                </button>
              </div>

              <SettingsDivider />

              <SettingRow
                icon={KeyRound}
                title="Two-factor authentication"
                description="Add an additional verification step when signing in."
                right={renderToggle(
                  security.twoFactor,
                  (value) =>
                    updateState(
                      setSecurity,
                      "twoFactor",
                      value
                    )
                )}
              />

              <SettingRow
                icon={Bell}
                title="Login alerts"
                description="Notify me whenever a new device signs into this account."
                right={renderToggle(
                  security.loginAlerts,
                  (value) =>
                    updateState(
                      setSecurity,
                      "loginAlerts",
                      value
                    )
                )}
              />

              <div className="company-settings-select-row">
                <div>
                  <strong>Session timeout</strong>
                  <p>
                    Automatically sign out after a period of inactivity.
                  </p>
                </div>

                <select
                  value={security.sessionTimeout}
                  onChange={(event) =>
                    updateState(
                      setSecurity,
                      "sessionTimeout",
                      event.target.value
                    )
                  }
                >
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                </select>
              </div>

              <div className="company-settings-sessions">
                <div className="company-settings-session-header">
                  <div>
                    <strong>Active sessions</strong>
                    <span>
                      Devices currently signed into your account.
                    </span>
                  </div>
                </div>

                {sessions.map((session) => (
                  <div
                    className="company-settings-session"
                    key={session.id}
                  >
                    <Monitor size={19} />

                    <div>
                      <strong>{session.device}</strong>
                      <span>{session.detail}</span>
                    </div>

                    {session.current ? (
                      <em>Active now</em>
                    ) : (
                      <button
                        type="button"
                        onClick={() => signOutSession(session.id)}
                      >
                        Sign out
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PRIVACY */}

          {activeSection === "privacy" && (
            <section className="company-settings-section">
              <SectionHeader
                icon={Eye}
                title="Privacy & Visibility"
                description="Control how your company information is discovered across NEXORA."
              />

              <div className="company-settings-form-grid single">
                <SelectField
                  label="Company profile visibility"
                  value={privacy.profileVisibility}
                  options={[
                    "Everyone",
                    "Connected users",
                    "Only connected colleges",
                  ]}
                  onChange={(value) =>
                    updateState(
                      setPrivacy,
                      "profileVisibility",
                      value
                    )
                  }
                />
              </div>

              <SettingsDivider />

              <SettingRow
                icon={Mail}
                title="Show company email"
                description="Allow eligible candidates and connected institutions to view your official email."
                right={renderToggle(
                  privacy.showCompanyEmail,
                  (value) =>
                    updateState(
                      setPrivacy,
                      "showCompanyEmail",
                      value
                    )
                )}
              />

              <SettingRow
                icon={Users}
                title="Allow candidate discovery"
                description="Allow eligible candidates to discover your company and active opportunities."
                right={renderToggle(
                  privacy.allowCandidateDiscovery,
                  (value) =>
                    updateState(
                      setPrivacy,
                      "allowCandidateDiscovery",
                      value
                    )
                )}
              />

              <SettingRow
                icon={Building2}
                title="Allow college discovery"
                description="Allow colleges to discover your company for industry collaboration."
                right={renderToggle(
                  privacy.allowCollegeDiscovery,
                  (value) =>
                    updateState(
                      setPrivacy,
                      "allowCollegeDiscovery",
                      value
                    )
                )}
              />

              <div className="company-settings-privacy-note">
                <ShieldCheck size={17} />

                <div>
                  <strong>Your data stays controlled</strong>
                  <p>
                    Visibility settings affect what other NEXORA users
                    can discover. Private account and security information
                    is not exposed through your public company profile.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* APPEARANCE */}

          {activeSection === "appearance" && (
            <section className="company-settings-section">
              <SectionHeader
                icon={Palette}
                title="Appearance"
                description="Customize how your company workspace looks on your device."
              />

              <div className="company-settings-theme-grid">
                <button
                  type="button"
                  className={`company-settings-theme-card ${
                    theme === "light" ? "active" : ""
                  }`}
                  onClick={() => handleThemeChange("light")}
                  aria-pressed={theme === "light"}
                >
                  <div className="company-settings-theme-preview light">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div>
                    <strong>Light</strong>
                    <small>Clean and bright workspace</small>
                  </div>

                  {theme === "light" && <Check size={18} />}
                </button>

                <button
                  type="button"
                  className={`company-settings-theme-card ${
                    theme === "dark" ? "active" : ""
                  }`}
                  onClick={() => handleThemeChange("dark")}
                  aria-pressed={theme === "dark"}
                >
                  <div className="company-settings-theme-preview dark">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div>
                    <strong>Dark</strong>
                    <small>Dark navy workspace</small>
                  </div>

                  {theme === "dark" && <Check size={18} />}
                </button>

                <button
                  type="button"
                  className={`company-settings-theme-card ${
                    theme === "system" ? "active" : ""
                  }`}
                  onClick={() => handleThemeChange("system")}
                  aria-pressed={theme === "system"}
                >
                  <div className="company-settings-theme-preview system">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div>
                    <strong>System</strong>
                    <small>Follow device preference</small>
                  </div>

                  {theme === "system" && <Check size={18} />}
                </button>
              </div>

              <SettingsDivider />

              <SettingRow
                icon={Monitor}
                title="Compact workspace"
                description="Use a denser layout to display more recruitment information at once."
                right={renderToggle(
                  compactWorkspace,
                  setCompactWorkspace
                )}
              />

              <SettingRow
                icon={Bell}
                title="Show notification badge"
                description="Display unread notification count in the sidebar."
                right={renderToggle(
                  showNotificationBadge,
                  setShowNotificationBadge
                )}
              />
            </section>
          )}

          {/* DANGER ZONE - shown only on Account */}

          {activeSection === "account" && (
            <section className="company-settings-danger">
            <div className="company-settings-danger-icon">
              <Trash2 size={18} />
            </div>

            <div className="company-settings-danger-content">
              <strong>Danger Zone</strong>

              <p>
                These actions can affect your company workspace and
                recruitment data. Proceed carefully.
              </p>

              <div className="company-settings-danger-actions">
                <button type="button">
                  Deactivate Company Workspace
                </button>

                <button type="button" className="delete">
                  Delete Company Account
                </button>
              </div>
            </div>
          </section>
          )}
          {changePasswordOpen && (
            <div
              className="company-settings-modal-backdrop"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setChangePasswordOpen(false);
                }
              }}
            >
              <div
                className="company-settings-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="change-password-title"
              >
                <div className="company-settings-modal-header">
                  <div>
                    <span className="company-settings-modal-icon">
                      <LockKeyhole size={18} />
                    </span>
                    <div>
                      <h3 id="change-password-title">Change Password</h3>
                      <p>Update the password used to access this company workspace.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="company-settings-modal-close"
                    onClick={() => setChangePasswordOpen(false)}
                    aria-label="Close change password dialog"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="company-settings-modal-body">
                  <FormField
                    label="Current Password"
                    type="password"
                    value={passwordForm.current}
                    onChange={(value) =>
                      setPasswordForm((current) => ({
                        ...current,
                        current: value,
                      }))
                    }
                  />
                  <FormField
                    label="New Password"
                    type="password"
                    value={passwordForm.next}
                    onChange={(value) =>
                      setPasswordForm((current) => ({
                        ...current,
                        next: value,
                      }))
                    }
                  />
                  <FormField
                    label="Confirm New Password"
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(value) =>
                      setPasswordForm((current) => ({
                        ...current,
                        confirm: value,
                      }))
                    }
                  />

                  {passwordError && (
                    <div className="company-settings-modal-error">
                      {passwordError}
                    </div>
                  )}
                </div>

                <div className="company-settings-modal-actions">
                  <button
                    type="button"
                    className="company-settings-secondary-button"
                    onClick={() => setChangePasswordOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="company-settings-primary-button"
                    onClick={handlePasswordChange}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {dangerAction && (
            <div
              className="company-settings-modal-backdrop"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setDangerAction(null);
                }
              }}
            >
              <div
                className="company-settings-modal company-settings-danger-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="danger-action-title"
              >
                <div className="company-settings-modal-header">
                  <div>
                    <span className="company-settings-modal-icon danger">
                      <Trash2 size={18} />
                    </span>
                    <div>
                      <h3 id="danger-action-title">
                        {dangerAction === "delete"
                          ? "Delete Company Account"
                          : "Deactivate Company Workspace"}
                      </h3>
                      <p>
                        This is a protected action. Complete each verification
                        step before anything is changed.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="company-settings-modal-close"
                    onClick={() => setDangerAction(null)}
                    aria-label="Close security confirmation"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="company-settings-verification-steps">
                  <span className={dangerStep >= 1 ? "active" : ""}>1</span>
                  <i />
                  <span className={dangerStep >= 2 ? "active" : ""}>2</span>
                  <i />
                  <span className={dangerStep >= 3 ? "active" : ""}>3</span>
                  {dangerAction === "delete" && (
                    <>
                      <i />
                      <span className={dangerStep >= 4 ? "active" : ""}>4</span>
                    </>
                  )}
                </div>

                <div className="company-settings-modal-body">
                  {dangerStep === 1 && (
                    <>
                      <div className="company-settings-danger-warning">
                        <strong>
                          {dangerAction === "delete"
                            ? "Permanent account deletion"
                            : "Workspace deactivation"}
                        </strong>
                        <p>
                          {dangerAction === "delete"
                            ? "Deletion is permanent in the production version and will remove access to company data."
                            : "Deactivation will disable the company workspace while preserving its data for a future reactivation flow."}
                        </p>
                      </div>

                      <label className="company-settings-confirm-check">
                        <input
                          type="checkbox"
                          checked={dangerConfirmed}
                          onChange={(event) => {
                            setDangerConfirmed(event.target.checked);
                            setDangerError("");
                          }}
                        />
                        <span>
                          I understand this is a protected account action and
                          want to continue.
                        </span>
                      </label>
                    </>
                  )}

                  {dangerStep === 2 && (
                    <>
                      <div className="company-settings-verification-note">
                        <ShieldCheck size={18} />
                        <span>
                          Enter the official email linked to this company
                          account. We will use it for the verification step.
                        </span>
                      </div>

                      <FormField
                        label="Official Account Email"
                        icon={Mail}
                        value={verificationEmail}
                        onChange={(value) => {
                          setVerificationEmail(value);
                          setDangerError("");
                        }}
                      />
                    </>
                  )}

                  {dangerStep === 3 && (
                    <>
                      <div className="company-settings-verification-note">
                        <KeyRound size={18} />
                        <span>
                          Enter the 6-digit OTP sent to the verified account
                          email.
                        </span>
                      </div>

                      <div className="company-settings-demo-otp">
                        <span>Frontend demo OTP</span>
                        <strong>{generatedOtp}</strong>
                      </div>

                      <FormField
                        label="Verification OTP"
                        value={verificationOtp}
                        onChange={(value) => {
                          setVerificationOtp(value.replace(/\D/g, "").slice(0, 6));
                          setDangerError("");
                        }}
                      />
                    </>
                  )}

                  {dangerStep === 4 && (
                    <div className="company-settings-danger-warning final">
                      <strong>Final confirmation</strong>
                      <p>
                        OTP verification passed. Press the final button only
                        if you are certain you want to delete this account.
                      </p>
                    </div>
                  )}

                  {dangerError && (
                    <div className="company-settings-modal-error">
                      {dangerError}
                    </div>
                  )}
                </div>

                <div className="company-settings-modal-actions">
                  <button
                    type="button"
                    className="company-settings-secondary-button"
                    onClick={() => setDangerAction(null)}
                  >
                    Cancel
                  </button>

                  {dangerStep === 1 && (
                    <button
                      type="button"
                      className="company-settings-danger-button"
                      onClick={() => {
                        if (!dangerConfirmed) {
                          setDangerError(
                            "Please confirm that you understand the action."
                          );
                          return;
                        }
                        setDangerStep(2);
                        setDangerError("");
                      }}
                    >
                      Continue Verification
                    </button>
                  )}

                  {dangerStep === 2 && (
                    <button
                      type="button"
                      className="company-settings-danger-button"
                      onClick={sendDangerOtp}
                    >
                      Send OTP
                    </button>
                  )}

                  {dangerStep === 3 && (
                    <button
                      type="button"
                      className="company-settings-danger-button"
                      onClick={verifyDangerOtp}
                    >
                      Verify OTP
                    </button>
                  )}

                  {dangerStep === 4 && (
                    <button
                      type="button"
                      className="company-settings-danger-button delete"
                      onClick={confirmDelete}
                    >
                      Delete Account
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {toast && (
            <div className="company-settings-toast" role="status">
              {toast}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

/* ---------- SMALL REUSABLE UI ---------- */

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="company-settings-section-header">
      <div className="company-settings-section-icon">
        <Icon size={19} />
      </div>

      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function SettingsDivider() {
  return <div className="company-settings-divider" />;
}

function FormField({
  label,
  value,
  onChange,
  icon: Icon,
  type = "text",
}) {
  return (
    <label className="company-settings-field">
      <span>{label}</span>

      <div className="company-settings-input-wrap">
        {Icon && <Icon size={15} />}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <label className="company-settings-field">
      <span>{label}</span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  right,
}) {
  return (
    <div className="company-settings-row">
      <div className="company-settings-row-icon">
        <Icon size={17} />
      </div>

      <div className="company-settings-row-content">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <div className="company-settings-row-control">
        {right}
      </div>
    </div>
  );
}

function FileIcon({ size = 17 }) {
  return <FileText size={size} />;
}

function BriefcaseIcon({ size = 17 }) {
  return <BriefcaseBusiness size={size} />;
}