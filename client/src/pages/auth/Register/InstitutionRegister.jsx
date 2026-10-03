import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  ChevronDown,
  Eye,
  EyeOff,
  FileCheck2,
  Globe2,
  LockKeyhole,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import ThemeToggle from "../../../components/common/ThemeToggle";
import "../InstitutionAuth.css";

export default function InstitutionRegister() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    institutionName: "",
    institutionType: "",
    affiliation: "",
    officialEmail: "",
    website: "",
    country: "",
    state: "",
    district: "",
    extraAddress: "",
    authorizedPerson: "",
    designation: "",
    contactNumber: "",
    password: "",
    supportingDocument: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend registration will be connected later.
    console.log("Institution Registration:", formData);
  };

  return (
    <div className="institution-auth-page institution-register-page">
      <div className="institution-auth-top">
        <Link
          to="/auth/role-selection?mode=register"
          className="institution-back"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="institution-brand">
          <span className="institution-brand-mark">N</span>
          <span>NEXORA</span>
        </div>

        <ThemeToggle />
      </div>

      <main className="institution-register-container">
        <div className="institution-auth-header">
          <div className="institution-auth-icon">
            <Building2 size={25} />
          </div>

          <p className="institution-auth-eyebrow">
            INSTITUTION REGISTRATION
          </p>

          <h1>Create your institution account</h1>

          <p>
            Register your college or university to manage students,
            skill intelligence and industry connections.
          </p>
        </div>

        <form
          className="institution-register-card"
          onSubmit={handleSubmit}
        >
          <section className="institution-form-section">
            <div className="institution-section-heading">
              <Building2 size={19} />

              <div>
                <h2>Institution Details</h2>
                <p>Tell us about your college or university.</p>
              </div>
            </div>

            <div className="institution-form-grid">
              <div className="institution-form-group full">
                <label htmlFor="institutionName">
                  Institution Name
                </label>

                <div className="institution-input-wrapper">
                  <Building2 size={18} />

                  <input
                    id="institutionName"
                    name="institutionName"
                    type="text"
                    placeholder="Enter official institution name"
                    value={formData.institutionName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <span className="institution-field-note">
                  Institution details will be verified during review.
                </span>
              </div>

              <div className="institution-form-group">
                <label htmlFor="institutionType">
                  Institution Type
                </label>

                <div className="institution-input-wrapper select">
                  <Building2 size={18} />

                  <select
                    id="institutionType"
                    name="institutionType"
                    value={formData.institutionType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select institution type
                    </option>
                    <option value="college">College</option>
                    <option value="university">University</option>
                    <option value="institute">Institute</option>
                    <option value="other">Other</option>
                  </select>

                  <ChevronDown size={17} />
                </div>
              </div>

              <div className="institution-form-group">
                <label htmlFor="affiliation">
                  University / Affiliation
                </label>

                <div className="institution-input-wrapper">
                  <Globe2 size={18} />

                  <input
                    id="affiliation"
                    name="affiliation"
                    type="text"
                    placeholder="Enter university / affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="institution-form-section">
            <div className="institution-section-heading">
              <Globe2 size={19} />

              <div>
                <h2>Official Contact</h2>
                <p>Use official institutional information.</p>
              </div>
            </div>

            <div className="institution-form-grid">
              <div className="institution-form-group">
                <label htmlFor="officialEmail">
                  Official Email
                </label>

                <div className="institution-input-wrapper">
                  <Globe2 size={18} />

                  <input
                    id="officialEmail"
                    name="officialEmail"
                    type="email"
                    placeholder="admin@institution.edu"
                    value={formData.officialEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="institution-form-group">
                <label htmlFor="website">
                  Official Website
                </label>

                <div className="institution-input-wrapper">
                  <Globe2 size={18} />

                  <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://www.example.edu"
                    value={formData.website}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="institution-form-section">
            <div className="institution-section-heading">
              <MapPin size={19} />

              <div>
                <h2>Institution Address</h2>
                <p>Select location step by step.</p>
              </div>
            </div>

            <div className="institution-form-grid">
              <div className="institution-form-group">
                <label htmlFor="country">Country</label>

                <div className="institution-input-wrapper select">
                  <MapPin size={18} />

                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select country</option>
                    <option value="india">India</option>
                  </select>

                  <ChevronDown size={17} />
                </div>
              </div>

              <div className="institution-form-group">
                <label htmlFor="state">State</label>

                <div className="institution-input-wrapper select">
                  <MapPin size={18} />

                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select state</option>
                    <option value="uttar-pradesh">
                      Uttar Pradesh
                    </option>
                  </select>

                  <ChevronDown size={17} />
                </div>
              </div>

              <div className="institution-form-group">
                <label htmlFor="district">District</label>

                <div className="institution-input-wrapper select">
                  <MapPin size={18} />

                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select district</option>
                    <option value="varanasi">Varanasi</option>
                    <option value="lucknow">Lucknow</option>
                    <option value="prayagraj">Prayagraj</option>
                    <option value="kanpur-nagar">
                      Kanpur Nagar
                    </option>
                  </select>

                  <ChevronDown size={17} />
                </div>
              </div>

              <div className="institution-form-group full">
                <label htmlFor="extraAddress">
                  Additional Address
                </label>

                <div className="institution-input-wrapper">
                  <MapPin size={18} />

                  <input
                    id="extraAddress"
                    name="extraAddress"
                    type="text"
                    placeholder="Building, road, area, landmark..."
                    value={formData.extraAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="institution-location-box">
              <MapPin size={18} />

              <div>
                <strong>Location detection</strong>
                <p>
                  Your institution location can be detected
                  automatically when location permission is available.
                </p>
              </div>
            </div>
          </section>

          <section className="institution-form-section">
            <div className="institution-section-heading">
              <UserRound size={19} />

              <div>
                <h2>Authorized Person</h2>
                <p>Details of the person registering the institution.</p>
              </div>
            </div>

            <div className="institution-form-grid">
              <div className="institution-form-group">
                <label htmlFor="authorizedPerson">
                  Authorized Person Name
                </label>

                <div className="institution-input-wrapper">
                  <UserRound size={18} />

                  <input
                    id="authorizedPerson"
                    name="authorizedPerson"
                    type="text"
                    placeholder="Full name"
                    value={formData.authorizedPerson}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="institution-form-group">
                <label htmlFor="designation">
                  Designation
                </label>

                <div className="institution-input-wrapper">
                  <UserRound size={18} />

                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    placeholder="Director / Principal / Registrar..."
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="institution-form-group">
                <label htmlFor="contactNumber">
                  Contact Number
                </label>

                <div className="institution-input-wrapper">
                  <Phone size={18} />

                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="institution-form-section">
            <div className="institution-section-heading">
              <LockKeyhole size={19} />

              <div>
                <h2>Account Security</h2>
                <p>Create the password for institution access.</p>
              </div>
            </div>

            <div className="institution-form-grid">
              <div className="institution-form-group full">
                <label htmlFor="password">Password</label>

                <div className="institution-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="institution-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="institution-form-section">
            <div className="institution-section-heading">
              <FileCheck2 size={19} />

              <div>
                <h2>Supporting Document</h2>
                <p>
                  Upload a document that supports institutional
                  verification.
                </p>
              </div>
            </div>

            <label
              htmlFor="supportingDocument"
              className="institution-upload-box"
            >
              <FileCheck2 size={24} />

              <span>
                {formData.supportingDocument
                  ? formData.supportingDocument.name
                  : "Choose supporting document"}
              </span>

              <small>
                PDF, JPG or PNG
              </small>
            </label>

            <input
              id="supportingDocument"
              name="supportingDocument"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              required
              hidden
            />
          </section>

          <div className="institution-registration-notice">
            <ShieldCheck size={18} />

            <p>
              After registration, the institution will go through
              email/domain verification, document verification and
              admin review before dashboard access.
            </p>
          </div>

          <button
            type="submit"
            className="institution-submit institution-register-submit"
          >
            Submit institution registration
          </button>
        </form>

        <p className="institution-auth-switch">
          Already have an institution account?{" "}
          <Link to="/auth/institution/login">
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}