import { useState } from "react";

import {
  Bell,
  Check,
  ChevronRight,
  Eye,
  KeyRound,
  Lock,
  LogOut,
  Moon,
  Shield,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";

import { useTheme } from "../../../context/ThemeContext";

import "./StudentSettings.css";

const settingsSections = [
  {
    id: "account",
    label: "Account",
    icon: UserRound,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Lock,
  },
];

export default function StudentSettings() {
  /* =========================================================
     GLOBAL THEME
  ========================================================= */

  const { theme, setTheme } = useTheme();

  const [activeSection, setActiveSection] =
    useState("account");

  /* =========================================================
     ACCOUNT
  ========================================================= */

  const [account, setAccount] = useState({
    name: "",
    email: "",
    phone: "",
    language: "English",
  });

  const [accountSaved, setAccountSaved] = useState(false);

  /* =========================================================
     NOTIFICATIONS
  ========================================================= */

  const [notifications, setNotifications] = useState({
    applications: true,
    opportunities: true,
    learning: true,
    system: true,
  });

  /* =========================================================
     PRIVACY
  ========================================================= */

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    activityVisibility: false,
  });

  /* =========================================================
     SECURITY MODALS
  ========================================================= */

  const [securityModal, setSecurityModal] = useState(null);

  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] =
    useState(false);

  /* =========================================================
     ACCOUNT UPDATE
  ========================================================= */

  const updateAccount = (field, value) => {
    setAccount((current) => ({
      ...current,
      [field]: value,
    }));

    setAccountSaved(false);
  };

  /* =========================================================
     SAVE ACCOUNT
  ========================================================= */

  const handleSaveAccount = () => {
    setAccountSaved(true);

    setTimeout(() => {
      setAccountSaved(false);
    }, 2500);
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    setLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setLogoutConfirm(false);
  };

  const confirmLogout = () => {
    setLogoutConfirm(false);
    window.location.href = "/";
  };

  /* =========================================================
     NOTIFICATION UPDATE
  ========================================================= */

  const toggleNotification = (field) => {
    setNotifications((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  /* =========================================================
     PRIVACY UPDATE
  ========================================================= */

  const togglePrivacy = (field) => {
    setPrivacy((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  /* =========================================================
     CLOSE SECURITY MODAL
  ========================================================= */

  const closeSecurityModal = () => {
    setSecurityModal(null);

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  /* =========================================================
     CHANGE PASSWORD
  ========================================================= */

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      return;
    }

    /*
      Actual password update will be connected
      with backend authentication later.
    */

    closeSecurityModal();
  };

  /* =========================================================
     TWO FACTOR
  ========================================================= */

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled((current) => !current);
  };

  /* =========================================================
     SECURITY CONTENT
  ========================================================= */

  const renderSecurity = () => (
    <section className="settings-panel">
      <div className="settings-panel-header">
        <div>
          <span className="settings-eyebrow">
            SECURITY
          </span>

          <h1>Security Settings</h1>

          <p>
            Manage your password and account security.
          </p>
        </div>

        <div className="settings-header-icon">
          <Shield size={21} />
        </div>
      </div>

      <div className="settings-security-list">

        {/* PASSWORD */}

        <div className="settings-row">
          <div className="settings-row-icon">
            <KeyRound size={19} />
          </div>

          <div className="settings-row-content">
            <strong>Password</strong>

            <span>
              Keep your password secure and up to date.
            </span>
          </div>

          <button
            type="button"
            className="settings-outline-button"
            onClick={() =>
              setSecurityModal("password")
            }
          >
            Change
          </button>
        </div>

        {/* TWO FACTOR */}

        <div className="settings-row">
          <div className="settings-row-icon">
            <Lock size={19} />
          </div>

          <div className="settings-row-content">
            <strong>
              Two-factor authentication
            </strong>

            <span>
              Add another layer of protection to your account.
            </span>
          </div>

          <button
            type="button"
            className="settings-outline-button"
            onClick={() =>
              setSecurityModal("two-factor")
            }
          >
            Manage
          </button>
        </div>

        {/* ACTIVE SESSIONS */}

        <div className="settings-row">
          <div className="settings-row-icon">
            <Eye size={19} />
          </div>

          <div className="settings-row-content">
            <strong>Active sessions</strong>

            <span>
              Review devices where your account is signed in.
            </span>
          </div>

          <button
            type="button"
            className="settings-outline-button"
            onClick={() =>
              setSecurityModal("sessions")
            }
          >
            View
          </button>
        </div>

      </div>
    </section>
  );

  /* =========================================================
     NOTIFICATION CONTENT
  ========================================================= */

  const renderNotifications = () => (
    <section className="settings-panel">
      <div className="settings-panel-header">
        <div>
          <span className="settings-eyebrow">
            NOTIFICATIONS
          </span>

          <h1>Notification Settings</h1>

          <p>
            Choose which updates you want to receive.
          </p>
        </div>

        <div className="settings-header-icon">
          <Bell size={21} />
        </div>
      </div>

      <div className="settings-toggle-list">

        <SettingToggle
          title="Application updates"
          description="Get notified when your application status changes."
          checked={notifications.applications}
          onChange={() =>
            toggleNotification("applications")
          }
        />

        <SettingToggle
          title="Opportunity alerts"
          description="Receive relevant internship and job updates."
          checked={notifications.opportunities}
          onChange={() =>
            toggleNotification("opportunities")
          }
        />

        <SettingToggle
          title="Learning updates"
          description="Get updates about learning recommendations."
          checked={notifications.learning}
          onChange={() =>
            toggleNotification("learning")
          }
        />

        <SettingToggle
          title="System notifications"
          description="Important updates related to your account."
          checked={notifications.system}
          onChange={() =>
            toggleNotification("system")
          }
        />

      </div>
    </section>
  );

  /* =========================================================
     PRIVACY CONTENT
  ========================================================= */

  const renderPrivacy = () => (
    <section className="settings-panel">
      <div className="settings-panel-header">
        <div>
          <span className="settings-eyebrow">
            PRIVACY
          </span>

          <h1>Privacy Settings</h1>

          <p>
            Control how your profile and activity are visible.
          </p>
        </div>

        <div className="settings-header-icon">
          <Lock size={21} />
        </div>
      </div>

      <div className="settings-toggle-list">

        <SettingToggle
          title="Profile visibility"
          description="Allow institutions and companies to view your profile."
          checked={privacy.profileVisibility}
          onChange={() =>
            togglePrivacy("profileVisibility")
          }
        />

        <SettingToggle
          title="Activity visibility"
          description="Allow others to see relevant profile activity."
          checked={privacy.activityVisibility}
          onChange={() =>
            togglePrivacy("activityVisibility")
          }
        />

      </div>

      <div className="settings-info-box">
        <Shield size={18} />

        <div>
          <strong>Your data matters</strong>

          <p>
            Your privacy preferences control how your
            information is shared across NEXORA.
          </p>
        </div>
      </div>
    </section>
  );

  /* =========================================================
     ACCOUNT CONTENT
  ========================================================= */

  const renderAccount = () => (
    <section className="settings-panel">
      <div className="settings-panel-header">
        <div>
          <span className="settings-eyebrow">
            ACCOUNT
          </span>

          <h1>Account Settings</h1>

          <p>
            Manage your basic account information and preferences.
          </p>
        </div>

        <div className="settings-header-icon">
          <UserRound size={21} />
        </div>
      </div>

      <div className="settings-account-grid">

        {/* NAME */}

        <SettingField
          label="Name"
          value={account.name}
          placeholder="Enter your name"
          onChange={(value) =>
            updateAccount("name", value)
          }
        />

        {/* EMAIL */}

        <SettingField
          label="Email"
          value={account.email}
          type="email"
          placeholder="Enter your email"
          onChange={(value) =>
            updateAccount("email", value)
          }
        />

        {/* PHONE */}

        <SettingField
          label="Phone"
          value={account.phone}
          type="tel"
          placeholder="+91 XXXXX XXXXX"
          onChange={(value) =>
            updateAccount("phone", value)
          }
        />

        {/* LANGUAGE */}

        <div className="settings-field">
          <label>Language</label>

          <div className="settings-select-wrapper">
            <select
              value={account.language}
              onChange={(event) =>
                updateAccount(
                  "language",
                  event.target.value
                )
              }
            >
              <option value="English">
                English
              </option>

              <option value="Hindi">
                Hindi
              </option>
            </select>
          </div>
        </div>

        {/* THEME */}

        <div className="settings-field">
          <label>Theme</label>

          <div className="settings-select-wrapper">
            <Moon size={16} />

            <select
              value={theme}
              onChange={(event) => {
                setTheme(event.target.value);
              }}
            >
              <option value="light">
                Light
              </option>

              <option value="dark">
                Dark
              </option>
            </select>
          </div>
        </div>

        {/* LOGOUT */}

        <div className="settings-field">
          <label>Logout</label>

          <button
            type="button"
            className="settings-outline-button settings-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

      </div>

      <div className="settings-save-area">

        {accountSaved && (
          <span className="settings-save-message">
            Changes saved
          </span>
        )}

        <button
          type="button"
          className="settings-save-button"
          onClick={handleSaveAccount}
        >
          <Check size={17} />

          {accountSaved
            ? "Saved"
            : "Save Changes"}
        </button>

      </div>
    </section>
  );

  /* =========================================================
     RENDER CONTENT
  ========================================================= */

  const renderContent = () => {
    switch (activeSection) {
      case "security":
        return renderSecurity();

      case "notifications":
        return renderNotifications();

      case "privacy":
        return renderPrivacy();

      default:
        return renderAccount();
    }
  };

  /* =========================================================
     MAIN RETURN
  ========================================================= */

  return (
    <div className="student-settings">

      {/* =================================================
          PAGE HEADING
      ================================================= */}

      <div className="settings-page-heading">

        <div>
          <span className="settings-page-label">
            STUDENT SETTINGS
          </span>

          <h1>Settings</h1>

          <p>
            Manage your account, security, notifications and privacy.
          </p>
        </div>

        <div className="settings-heading-icon">
          <SlidersHorizontal size={23} />
        </div>

      </div>


      {/* =================================================
          SETTINGS LAYOUT
      ================================================= */}

      <div className="settings-layout">

        {/* =================================================
            SETTINGS NAVIGATION
        ================================================= */}

        <aside className="settings-navigation">

          <div className="settings-navigation-title">
            Settings
          </div>

          <nav>
            {settingsSections.map(
              ({ id, label, icon: Icon }) => {
                const active =
                  activeSection === id;

                return (
                  <button
                    key={id}
                    type="button"
                    className={`settings-navigation-item ${
                      active ? "active" : ""
                    }`}
                    onClick={() =>
                      setActiveSection(id)
                    }
                  >
                    <Icon size={18} />

                    <span>{label}</span>

                    {active && (
                      <ChevronRight
                        className="settings-nav-arrow"
                        size={16}
                      />
                    )}
                  </button>
                );
              }
            )}
          </nav>

        </aside>


        {/* =================================================
            SETTINGS CONTENT
        ================================================= */}

        <div className="settings-content">
          {renderContent()}
        </div>

      </div>


      {/* =====================================================
          LOGOUT CONFIRMATION
      ===================================================== */}

      {logoutConfirm && (
        <div
          className="settings-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              cancelLogout();
            }
          }}
        >
          <div className="settings-modal settings-logout-modal">
            <div className="settings-modal-header">
              <div>
                <span className="settings-eyebrow">
                  LOGOUT
                </span>

                <h2>Confirm Logout</h2>

                <p>
                  Are you sure you want to log out of your account?
                </p>
              </div>

              <button
                type="button"
                className="settings-modal-close"
                onClick={cancelLogout}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="settings-modal-actions">
              <button
                type="button"
                className="settings-modal-cancel"
                onClick={cancelLogout}
              >
                Cancel
              </button>

              <button
                type="button"
                className="settings-modal-primary settings-logout-confirm"
                onClick={confirmLogout}
              >
                <LogOut size={16} />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SECURITY MODALS
      ===================================================== */}

      {securityModal && (
        <div
          className="settings-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeSecurityModal();
            }
          }}
        >

          <div className="settings-modal">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="settings-modal-header">

              <div>

                {securityModal === "password" && (
                  <>
                    <span className="settings-eyebrow">
                      PASSWORD
                    </span>

                    <h2>Change Password</h2>

                    <p>
                      Update your account password.
                    </p>
                  </>
                )}

                {securityModal === "two-factor" && (
                  <>
                    <span className="settings-eyebrow">
                      SECURITY
                    </span>

                    <h2>
                      Two-factor authentication
                    </h2>

                    <p>
                      Add another layer of protection to your account.
                    </p>
                  </>
                )}

                {securityModal === "sessions" && (
                  <>
                    <span className="settings-eyebrow">
                      SECURITY
                    </span>

                    <h2>Active Sessions</h2>

                    <p>
                      Review devices where your account is signed in.
                    </p>
                  </>
                )}

              </div>

              <button
                type="button"
                className="settings-modal-close"
                onClick={closeSecurityModal}
                aria-label="Close"
              >
                <X size={18} />
              </button>

            </div>


            {/* =================================================
                PASSWORD MODAL
            ================================================= */}

            {securityModal === "password" && (
              <form
                className="settings-modal-form"
                onSubmit={handlePasswordSubmit}
              >

                <div className="settings-modal-field">
                  <label>
                    Current Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={
                      passwordForm.currentPassword
                    }
                    onChange={(event) =>
                      setPasswordForm(
                        (current) => ({
                          ...current,
                          currentPassword:
                            event.target.value,
                        })
                      )
                    }
                    required
                  />
                </div>

                <div className="settings-modal-field">
                  <label>
                    New Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={
                      passwordForm.newPassword
                    }
                    onChange={(event) =>
                      setPasswordForm(
                        (current) => ({
                          ...current,
                          newPassword:
                            event.target.value,
                        })
                      )
                    }
                    required
                  />
                </div>

                <div className="settings-modal-field">
                  <label>
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={
                      passwordForm.confirmPassword
                    }
                    onChange={(event) =>
                      setPasswordForm(
                        (current) => ({
                          ...current,
                          confirmPassword:
                            event.target.value,
                        })
                      )
                    }
                    required
                  />
                </div>

                {passwordForm.confirmPassword &&
                  passwordForm.newPassword !==
                    passwordForm.confirmPassword && (
                    <p className="settings-modal-error">
                      Passwords do not match.
                    </p>
                  )}

                <div className="settings-modal-actions">

                  <button
                    type="button"
                    className="settings-modal-cancel"
                    onClick={closeSecurityModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="settings-modal-primary"
                    disabled={
                      passwordForm.newPassword !==
                      passwordForm.confirmPassword
                    }
                  >
                    <Check size={16} />
                    Update Password
                  </button>

                </div>

              </form>
            )}


            {/* =================================================
                TWO FACTOR MODAL
            ================================================= */}

            {securityModal === "two-factor" && (
              <div className="settings-security-modal-content">

                <div className="settings-security-status">

                  <div className="settings-security-status-icon">
                    <Shield size={22} />
                  </div>

                  <div>
                    <strong>
                      Two-factor authentication
                    </strong>

                    <span>
                      {twoFactorEnabled
                        ? "Enabled"
                        : "Not enabled"}
                    </span>
                  </div>

                </div>

                <p className="settings-security-description">
                  Two-factor authentication adds an extra
                  verification step when signing in.
                </p>

                <div className="settings-modal-actions">

                  <button
                    type="button"
                    className="settings-modal-cancel"
                    onClick={closeSecurityModal}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="settings-modal-primary"
                    onClick={handleTwoFactorToggle}
                  >
                    {twoFactorEnabled
                      ? "Disable 2FA"
                      : "Enable 2FA"}
                  </button>

                </div>

              </div>
            )}


            {/* =================================================
                ACTIVE SESSIONS MODAL
            ================================================= */}

            {securityModal === "sessions" && (
              <div className="settings-security-modal-content">

                <div className="settings-session-card">

                  <div className="settings-session-icon">
                    <Eye size={19} />
                  </div>

                  <div className="settings-session-content">

                    <strong>
                      Current browser session
                    </strong>

                    <span>
                      Chrome · Windows
                    </span>

                    <small>
                      Active now
                    </small>

                  </div>

                  <span className="settings-session-active">
                    Active
                  </span>

                </div>

                <div className="settings-info-box">

                  <Shield size={17} />

                  <div>

                    <strong>
                      Session management
                    </strong>

                    <p>
                      Real session management and sign-out
                      controls will be connected to the backend
                      authentication system later.
                    </p>

                  </div>

                </div>

                <div className="settings-modal-actions">

                  <button
                    type="button"
                    className="settings-modal-primary"
                    onClick={closeSecurityModal}
                  >
                    Done
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}


/* =========================================================
   SETTING FIELD
========================================================= */

function SettingField({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}) {
  return (
    <div className="settings-field">

      <label>{label}</label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

    </div>
  );
}


/* =========================================================
   SETTING TOGGLE
========================================================= */

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="settings-toggle-row">

      <div className="settings-toggle-content">
        <strong>{title}</strong>

        <span>{description}</span>
      </div>

      <button
        type="button"
        className={`settings-switch ${
          checked ? "active" : ""
        }`}
        onClick={onChange}
        aria-pressed={checked}
      >
        <span />
      </button>

    </div>
  );
}