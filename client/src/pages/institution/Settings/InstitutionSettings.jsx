import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Building2,
  Check,
  ChevronDown,
  Globe,
  LockKeyhole,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  UserCog,
  Users,
  Upload,
  X,
} from "lucide-react";

import "./InstitutionSettings.css";

const tabs = [
  {
    id: "profile",
    label: "Institution Profile",
    icon: Building2,
  },
  {
    id: "members",
    label: "Members & Roles",
    icon: Users,
  },
  {
    id: "account",
    label: "Account",
    icon: UserCog,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
  },
];

const defaultFormData = {
  institutionName: "Mahatma Gandhi Kashi Vidyapeeth",
  shortName: "MGKVP",
  type: "State University",
  website: "https://www.mgkvp.ac.in",
  establishedYear: "1921",
  email: "placement@mgkvp.ac.in",
  phone: "+91 542 222 1234",
  address: "Varanasi, Uttar Pradesh, India - 221002",
  city: "Varanasi",
  state: "Uttar Pradesh",
};

const STORAGE_KEYS = {
  formData: "nexora_institution_settings",
  logo: "nexora_institution_logo",
};

export default function InstitutionSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState(() => {
    try {
      const stored = localStorage.getItem(
        STORAGE_KEYS.formData
      );

      return stored
        ? {
            ...defaultFormData,
            ...JSON.parse(stored),
          }
        : defaultFormData;
    } catch {
      return defaultFormData;
    }
  });

  const [draftData, setDraftData] = useState(formData);

  const [logo, setLogo] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.logo) || "";
    } catch {
      return "";
    }
  });

  const [draftLogo, setDraftLogo] = useState(logo);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isEditing) {
      setDraftData(formData);
      setDraftLogo(logo);
    }
  }, [formData, logo, isEditing]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDraftData((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
    setMessage("");
  };

  const handleEdit = () => {
    setDraftData(formData);
    setDraftLogo(logo);
    setIsEditing(true);
    setSaved(false);
    setMessage("");
  };

  const handleCancel = () => {
    setDraftData(formData);
    setDraftLogo(logo);
    setIsEditing(false);
    setSaved(false);
    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(
        STORAGE_KEYS.formData,
        JSON.stringify(draftData)
      );

      if (draftLogo) {
        localStorage.setItem(
          STORAGE_KEYS.logo,
          draftLogo
        );
      } else {
        localStorage.removeItem(STORAGE_KEYS.logo);
      }

      setFormData(draftData);
      setLogo(draftLogo);
      setIsEditing(false);
      setSaved(true);
      setMessage("Changes saved successfully.");

      window.dispatchEvent(
        new CustomEvent("nexora:institution-updated", {
          detail: {
            formData: draftData,
            logo: draftLogo,
          },
        })
      );

      window.setTimeout(() => {
        setSaved(false);
        setMessage("");
      }, 2500);
    } catch {
      setMessage(
        "Unable to save changes in this browser."
      );
    }
  };

  const handleLogoButton = () => {
    if (!isEditing) {
      handleEdit();
      window.setTimeout(() => {
        fileInputRef.current?.click();
      }, 0);
      return;
    }

    fileInputRef.current?.click();
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage(
        "Please choose a PNG, JPG or WEBP image."
      );
      event.target.value = "";
      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage(
        "Logo must be smaller than 2 MB."
      );
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result === "string") {
        setDraftLogo(result);
        setSaved(false);
        setMessage(
          "Logo selected. Click Save Changes to apply it."
        );
      }
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const handleRemoveLogo = () => {
    setDraftLogo("");
    setSaved(false);
    setMessage(
      "Logo removed from the draft. Click Save Changes to apply."
    );
  };

  const handlePlaceholderAction = (label) => {
    setMessage(`${label} is ready for configuration.`);
    window.setTimeout(() => {
      setMessage("");
    }, 2200);
  };

  return (
    <div className="institution-settings-page">

      <section className="institution-settings-header">
        <div>
          <p className="institution-settings-eyebrow">
            WORKSPACE SETTINGS
          </p>

          <h1>Settings</h1>

          <p>
            Manage your institution profile, account,
            members and security preferences.
          </p>
        </div>

        {activeTab === "profile" && (
          <div className="institution-settings-header-actions">
            {isEditing && (
              <button
                type="button"
                className="institution-cancel-button"
                onClick={handleCancel}
              >
                <X size={15} />
                Cancel
              </button>
            )}

            <button
              type={isEditing ? "submit" : "button"}
              form={
                isEditing
                  ? "institution-profile-form"
                  : undefined
              }
              className="institution-save-button"
              onClick={
                !isEditing ? handleEdit : undefined
              }
            >
              {isEditing ? (
                saved ? (
                  <>
                    <Check size={16} />
                    Saved
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )
              ) : (
                <>
                  <Pencil size={16} />
                  Edit
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {message && (
        <div className="institution-settings-message">
          <Check size={14} />
          <span>{message}</span>
        </div>
      )}


      <nav className="institution-settings-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              className={
                activeTab === tab.id ? "active" : ""
              }
              onClick={() => {
                setActiveTab(tab.id);
                setMessage("");
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>


      {activeTab === "profile" && (
        <form
          id="institution-profile-form"
          className="institution-settings-content"
          onSubmit={handleSave}
        >
          {/* BASIC INFORMATION */}

          <section className="institution-settings-card">
            <div className="institution-card-heading">
              <div className="institution-card-heading-icon blue">
                <Building2 size={17} />
              </div>

              <div>
                <h2>Basic Information</h2>
                <p>
                  Manage your institution's official
                  information.
                </p>
              </div>
            </div>

            <div className="institution-form-grid">
              <div className="institution-settings-field full">
                <label htmlFor="institutionName">
                  Institution Name
                </label>

                <div className="institution-settings-input">
                  <Building2 size={15} />

                  <input
                    id="institutionName"
                    name="institutionName"
                    value={draftData.institutionName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="institution-settings-field">
                <label htmlFor="shortName">
                  Short Name
                </label>

                <input
                  id="shortName"
                  name="shortName"
                  value={draftData.shortName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="institution-settings-field">
                <label htmlFor="type">
                  Institution Type
                </label>

                <div className="institution-select-wrapper">
                  <select
                    id="type"
                    name="type"
                    value={draftData.type}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option>State University</option>
                    <option>Central University</option>
                    <option>Private University</option>
                    <option>College</option>
                    <option>Institute</option>
                  </select>

                  <ChevronDown size={14} />
                </div>
              </div>

              <div className="institution-settings-field full">
                <label htmlFor="website">
                  Official Website
                </label>

                <div className="institution-settings-input">
                  <Globe size={15} />

                  <input
                    id="website"
                    name="website"
                    value={draftData.website}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="institution-settings-field">
                <label htmlFor="establishedYear">
                  Established Year
                </label>

                <input
                  id="establishedYear"
                  name="establishedYear"
                  value={draftData.establishedYear}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </section>

          {/* CONTACT INFORMATION */}

          <section className="institution-settings-card">
            <div className="institution-card-heading">
              <div className="institution-card-heading-icon cyan">
                <Phone size={17} />
              </div>

              <div>
                <h2>Contact Information</h2>
                <p>
                  Keep your official contact details
                  up to date.
                </p>
              </div>
            </div>

            <div className="institution-form-grid">
              <div className="institution-settings-field">
                <label htmlFor="email">
                  Official Email
                </label>

                <div className="institution-settings-input">
                  <Mail size={15} />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={draftData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="institution-settings-field">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="institution-settings-input">
                  <Phone size={15} />

                  <input
                    id="phone"
                    name="phone"
                    value={draftData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="institution-settings-field full">
                <label htmlFor="address">
                  Address
                </label>

                <div className="institution-settings-input">
                  <MapPin size={15} />

                  <input
                    id="address"
                    name="address"
                    value={draftData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="institution-settings-field">
                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  value={draftData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="institution-settings-field">
                <label htmlFor="state">
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  value={draftData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </section>

          {/* LOGO */}

          <section className="institution-settings-card institution-logo-card">
            <div className="institution-card-heading">
              <div className="institution-card-heading-icon violet">
                <Building2 size={17} />
              </div>

              <div>
                <h2>Institution Logo</h2>
                <p>
                  Use your official institution identity
                  across the platform.
                </p>
              </div>
            </div>

            <div className="institution-logo-section">
              <div className="institution-logo-preview">
                {draftLogo ? (
                  <img
                    src={draftLogo}
                    alt="Institution logo"
                  />
                ) : (
                  <span>
                    {draftData.shortName?.charAt(0) ||
                      draftData.institutionName?.charAt(0) ||
                      "I"}
                  </span>
                )}
              </div>

              <div className="institution-logo-details">
                <strong>
                  {draftData.institutionName ||
                    "Institution Logo"}
                </strong>

                <p>
                  PNG, JPG or WEBP. Maximum size
                  2 MB.
                </p>

                <div className="institution-logo-actions">
                  <button
                    type="button"
                    className="institution-logo-button"
                    onClick={handleLogoButton}
                  >
                    <Upload size={13} />
                    {isEditing
                      ? "Change Logo"
                      : "Edit Logo"}
                  </button>

                  {isEditing && draftLogo && (
                    <button
                      type="button"
                      className="institution-logo-remove"
                      onClick={handleRemoveLogo}
                    >
                      <X size={13} />
                      Remove
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="institution-logo-file-input"
                  onChange={handleLogoChange}
                />
              </div>
            </div>
          </section>
        </form>
      )}


      {activeTab === "members" && (
        <SettingsPlaceholder
          icon={Users}
          color="blue"
          title="Members & Roles"
          description="Manage institution administrators, placement officers and other workspace members."
          button="Manage Members"
          onAction={handlePlaceholderAction}
        />
      )}


      {activeTab === "account" && (
        <SettingsPlaceholder
          icon={UserCog}
          color="cyan"
          title="Account Settings"
          description="Manage your institution account information and workspace preferences."
          button="Account Preferences"
          onAction={handlePlaceholderAction}
        />
      )}

      {activeTab === "notifications" && (
        <SettingsPlaceholder
          icon={Bell}
          color="orange"
          title="Notification Preferences"
          description="Choose which student, company, placement and system activities should notify your institution."
          button="Notification Preferences"
          onAction={handlePlaceholderAction}
        />
      )}


      {activeTab === "security" && (
        <SettingsPlaceholder
          icon={LockKeyhole}
          color="violet"
          title="Security"
          description="Manage password, OTP verification and security preferences for your institution account."
          button="Security Settings"
          onAction={handlePlaceholderAction}
        />
      )}
    </div>
  );
}


function SettingsPlaceholder({
  icon: Icon,
  color,
  title,
  description,
  button,
  onAction,
}) {
  return (
    <section className="institution-settings-placeholder">
      <div
        className={`institution-placeholder-icon ${color}`}
      >
        <Icon size={25} />
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <button
        type="button"
        onClick={() => onAction(button)}
      >
        {button}
      </button>
    </section>
  );
}
