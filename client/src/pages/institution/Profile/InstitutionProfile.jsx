import { useState } from "react";
import {
  Building2,
  Check,
  Edit3,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import "./InstitutionProfile.css";

export default function InstitutionProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    institutionName: "Institution Name",
    institutionType: "College / University",
    university: "University Name",
    affiliation: "Affiliation details",
    established: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    authorizedPerson: "",
    designation: "",
  });

  const handleChange = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="institution-profile-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="institution-profile-header">
        <div>
          <p className="institution-profile-eyebrow">
            INSTITUTION PROFILE
          </p>

          <h1>Institution Profile</h1>

          <p>
            Manage your institution information, affiliation and
            authorized representative details.
          </p>
        </div>

        <div className="institution-profile-header-status">
          <ShieldCheck size={17} />
          <span>Institution workspace</span>
        </div>
      </section>


      {/* =====================================================
          PROFILE WORKSPACE
      ===================================================== */}

      <section className="institution-profile-workspace">

        {/* ===================================================
            PROFILE SUMMARY
        =================================================== */}

        <div className="institution-profile-summary">

          <div className="institution-profile-avatar">
            <Building2 size={38} />
          </div>

          <div className="institution-profile-summary-content">

            <span className="institution-profile-label">
              INSTITUTION
            </span>

            <h2>{profile.institutionName}</h2>

            <p>{profile.institutionType}</p>

            <div className="institution-profile-contact">

              <span>
                <Mail size={15} />
                {profile.email || "Add institution email"}
              </span>

              <span>
                <Phone size={15} />
                {profile.phone || "Add phone number"}
              </span>

              <span>
                <MapPin size={15} />
                {profile.city || "Add location"}
              </span>

            </div>
          </div>

          <button
            type="button"
            className="institution-profile-edit-button"
            onClick={() => setIsEditing((current) => !current)}
          >
            <Edit3 size={16} />

            {isEditing ? "Close Edit" : "Edit Profile"}
          </button>

        </div>


        {/* ===================================================
            PROFILE INFORMATION
        =================================================== */}

        <div className="institution-profile-card">

          <div className="institution-profile-card-header">

            <div>
              <span className="institution-profile-card-eyebrow">
                INSTITUTION INFORMATION
              </span>

              <h2>Institution Information</h2>

              <p>
                Official information about your institution.
              </p>
            </div>

            <div className="institution-profile-card-icon">
              <Building2 size={21} />
            </div>

          </div>


          {isEditing ? (

            /* =================================================
               EDIT FORM
            ================================================= */

            <div className="institution-profile-form">

              <div className="institution-profile-form-grid">

                <div className="institution-profile-field">
                  <label>Institution Name</label>

                  <input
                    type="text"
                    value={profile.institutionName}
                    onChange={(event) =>
                      handleChange(
                        "institutionName",
                        event.target.value
                      )
                    }
                    placeholder="Enter institution name"
                  />
                </div>


                <div className="institution-profile-field">
                  <label>Institution Type</label>

                  <input
                    type="text"
                    value={profile.institutionType}
                    onChange={(event) =>
                      handleChange(
                        "institutionType",
                        event.target.value
                      )
                    }
                    placeholder="College / University"
                  />
                </div>


                <div className="institution-profile-field">
                  <label>University</label>

                  <input
                    type="text"
                    value={profile.university}
                    onChange={(event) =>
                      handleChange(
                        "university",
                        event.target.value
                      )
                    }
                    placeholder="Enter university"
                  />
                </div>


                <div className="institution-profile-field">
                  <label>Affiliation</label>

                  <input
                    type="text"
                    value={profile.affiliation}
                    onChange={(event) =>
                      handleChange(
                        "affiliation",
                        event.target.value
                      )
                    }
                    placeholder="Enter affiliation details"
                  />
                </div>


                <div className="institution-profile-field">
                  <label>Established Year</label>

                  <input
                    type="text"
                    value={profile.established}
                    onChange={(event) =>
                      handleChange(
                        "established",
                        event.target.value
                      )
                    }
                    placeholder="e.g. 1998"
                  />
                </div>


                <div className="institution-profile-field">
                  <label>Institution Email</label>

                  <input
                    type="email"
                    value={profile.email}
                    onChange={(event) =>
                      handleChange(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="Enter official email"
                  />
                </div>


                <div className="institution-profile-field">
                  <label>Phone</label>

                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(event) =>
                      handleChange(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="Enter phone number"
                  />
                </div>


                <div className="institution-profile-field">
                  <label>Website</label>

                  <input
                    type="url"
                    value={profile.website}
                    onChange={(event) =>
                      handleChange(
                        "website",
                        event.target.value
                      )
                    }
                    placeholder="https://example.com"
                  />
                </div>


                <div className="institution-profile-field institution-profile-field-full">
                  <label>Address</label>

                  <input
                    type="text"
                    value={profile.address}
                    onChange={(event) =>
                      handleChange(
                        "address",
                        event.target.value
                      )
                    }
                    placeholder="Enter complete institution address"
                  />
                </div>


                <div className="institution-profile-field">
                  <label>City</label>

                  <input
                    type="text"
                    value={profile.city}
                    onChange={(event) =>
                      handleChange(
                        "city",
                        event.target.value
                      )
                    }
                    placeholder="Enter city"
                  />
                </div>


                <div className="institution-profile-field">
                  <label>State</label>

                  <input
                    type="text"
                    value={profile.state}
                    onChange={(event) =>
                      handleChange(
                        "state",
                        event.target.value
                      )
                    }
                    placeholder="Enter state"
                  />
                </div>

              </div>


              {/* =============================================
                  AUTHORIZED PERSON
              ============================================= */}

              <div className="institution-profile-form-section">

                <div className="institution-profile-form-section-header">
                  <div>
                    <span>AUTHORIZED REPRESENTATIVE</span>

                    <h3>Authorized Person</h3>
                  </div>

                  <UserRound size={20} />
                </div>


                <div className="institution-profile-form-grid">

                  <div className="institution-profile-field">
                    <label>Full Name</label>

                    <input
                      type="text"
                      value={profile.authorizedPerson}
                      onChange={(event) =>
                        handleChange(
                          "authorizedPerson",
                          event.target.value
                        )
                      }
                      placeholder="Enter authorized person's name"
                    />
                  </div>


                  <div className="institution-profile-field">
                    <label>Designation</label>

                    <input
                      type="text"
                      value={profile.designation}
                      onChange={(event) =>
                        handleChange(
                          "designation",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Principal, Director"
                    />
                  </div>

                </div>

              </div>


              {/* =============================================
                  FORM ACTIONS
              ============================================= */}

              <div className="institution-profile-form-actions">

                <button
                  type="button"
                  className="institution-profile-cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="institution-profile-save-button"
                  onClick={handleSave}
                >
                  <Check size={16} />
                  Save Changes
                </button>

              </div>

            </div>

          ) : (

            /* =================================================
               PROFILE VIEW
            ================================================= */

            <div className="institution-profile-details">

              <div className="institution-profile-detail">
                <span>Institution Name</span>
                <strong>{profile.institutionName}</strong>
              </div>

              <div className="institution-profile-detail">
                <span>Institution Type</span>
                <strong>{profile.institutionType}</strong>
              </div>

              <div className="institution-profile-detail">
                <span>University</span>
                <strong>{profile.university}</strong>
              </div>

              <div className="institution-profile-detail">
                <span>Affiliation</span>
                <strong>{profile.affiliation}</strong>
              </div>

              <div className="institution-profile-detail">
                <span>Established</span>
                <strong>
                  {profile.established || "Not added yet"}
                </strong>
              </div>

              <div className="institution-profile-detail">
                <span>Institution Email</span>
                <strong>
                  {profile.email || "Not added yet"}
                </strong>
              </div>

              <div className="institution-profile-detail">
                <span>Phone</span>
                <strong>
                  {profile.phone || "Not added yet"}
                </strong>
              </div>

              <div className="institution-profile-detail">
                <span>Website</span>
                <strong>
                  {profile.website || "Not added yet"}
                </strong>
              </div>

              <div className="institution-profile-detail institution-profile-detail-full">
                <span>Address</span>
                <strong>
                  {profile.address || "Not added yet"}
                </strong>
              </div>

              <div className="institution-profile-detail">
                <span>City</span>
                <strong>
                  {profile.city || "Not added yet"}
                </strong>
              </div>

              <div className="institution-profile-detail">
                <span>State</span>
                <strong>
                  {profile.state || "Not added yet"}
                </strong>
              </div>

            </div>

          )}

        </div>


        {/* ===================================================
            AUTHORIZED REPRESENTATIVE
        =================================================== */}

        {!isEditing && (
          <div className="institution-profile-card">

            <div className="institution-profile-card-header">

              <div>
                <span className="institution-profile-card-eyebrow">
                  AUTHORIZED REPRESENTATIVE
                </span>

                <h2>Authorized Person</h2>

                <p>
                  The primary person responsible for this
                  institution workspace.
                </p>
              </div>

              <div className="institution-profile-card-icon">
                <UserRound size={21} />
              </div>

            </div>


            <div className="institution-authorized-person">

              <div className="institution-authorized-avatar">
                <UserRound size={26} />
              </div>

              <div>
                <strong>
                  {profile.authorizedPerson || "Not added yet"}
                </strong>

                <span>
                  {profile.designation || "Designation not added"}
                </span>
              </div>

            </div>

          </div>
        )}


        {/* ===================================================
            VERIFICATION STATUS
        =================================================== */}

        <div className="institution-profile-verification">

          <div className="institution-profile-verification-icon">
            <ShieldCheck size={21} />
          </div>

          <div>
            <strong>Institution verification</strong>

            <p>
              Verification status and official documents will
              be available here once the institution completes
              the verification process.
            </p>
          </div>

          <span className="institution-profile-pending">
            Pending
          </span>

        </div>


        {/* ===================================================
            SAVE SUCCESS MESSAGE
        =================================================== */}

        {saved && (
          <div className="institution-profile-success">
            <Check size={17} />
            Institution profile updated successfully.
          </div>
        )}

      </section>
    </div>
  );
}