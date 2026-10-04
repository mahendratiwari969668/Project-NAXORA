import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import "../CompanyAuth.css";

export default function CompanyRegister() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    industry: "",
    officialEmail: "",
    website: "",
    country: "",
    state: "",
    district: "",
    extraAddress: "",
    authorizedPerson: "",
    designation: "",
    phone: "",
    password: "",
    companyVerification: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Frontend-only registration for now.
    // Backend registration + email verification will be connected later.

    console.log("Company Registration:", formData);

    navigate("/company/dashboard");
  };

  return (
    <div className="company-auth-page company-register-page">


      <div className="company-auth-top">

        <Link
          to="/auth/role-selection?mode=register"
          className="company-back"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <Link to="/" className="company-brand">
          <span className="company-brand-mark">
            N
          </span>

          <span>NEXORA</span>
        </Link>

        <ThemeToggle />

      </div>



      <main className="company-auth-container company-register-container">

        <div className="company-auth-header">

          <div className="company-auth-icon">
            <Building2 size={25} />
          </div>

          <p className="company-auth-eyebrow">
            COMPANY PORTAL
          </p>

          <h1>Create your company account</h1>

          <p>
            Register your company to connect with students,
            institutions and emerging talent.
          </p>

        </div>


        <form
          className="company-auth-card company-register-card"
          onSubmit={handleSubmit}
        >

          <section className="company-form-section">

            <div className="company-section-heading">

              <Building2 size={19} />

              <div>
                <h2>Company Information</h2>

                <p>
                  Provide the official details of your company.
                </p>
              </div>

            </div>


            <div className="company-form-grid">

              {/* Company Name */}

              <div className="company-form-group full">

                <label htmlFor="companyName">
                  Company Name
                </label>

                <div className="company-input-wrapper">

                  <Building2 size={18} />

                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Enter official company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* Company Type */}

              <div className="company-form-group">

                <label htmlFor="companyType">
                  Company Type
                </label>

                <div className="company-select-wrapper">

                  <select
                    id="companyType"
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select company type
                    </option>

                    <option value="private">
                      Private Company
                    </option>

                    <option value="public">
                      Public Company
                    </option>

                    <option value="startup">
                      Startup
                    </option>

                    <option value="ngo">
                      NGO / Non-Profit
                    </option>

                    <option value="government">
                      Government Organization
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>


              {/* Industry */}

              <div className="company-form-group">

                <label htmlFor="industry">
                  Industry
                </label>

                <div className="company-select-wrapper">

                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select industry
                    </option>

                    <option value="information-technology">
                      Information Technology
                    </option>

                    <option value="software-development">
                      Software Development
                    </option>

                    <option value="finance">
                      Finance & Banking
                    </option>

                    <option value="healthcare">
                      Healthcare
                    </option>

                    <option value="education">
                      Education
                    </option>

                    <option value="manufacturing">
                      Manufacturing
                    </option>

                    <option value="consulting">
                      Consulting
                    </option>

                    <option value="ecommerce">
                      E-commerce
                    </option>

                    <option value="telecommunications">
                      Telecommunications
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>


              {/* Official Email */}

              <div className="company-form-group">

                <label htmlFor="officialEmail">
                  Official Email
                </label>

                <div className="company-input-wrapper">

                  <Globe2 size={18} />

                  <input
                    id="officialEmail"
                    name="officialEmail"
                    type="email"
                    placeholder="hr@company.com"
                    value={formData.officialEmail}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* Website */}

              <div className="company-form-group">

                <label htmlFor="website">
                  Official Website
                </label>

                <div className="company-input-wrapper">

                  <Globe2 size={18} />

                  <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://company.com"
                    value={formData.website}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

            </div>

          </section>



          <section className="company-form-section">

            <div className="company-section-heading">

              <MapPin size={19} />

              <div>
                <h2>Company Location</h2>

                <p>
                  Add the registered location of your company.
                </p>
              </div>

            </div>


            <div className="company-form-grid">

              {/* Country */}

              <div className="company-form-group">

                <label htmlFor="country">
                  Country
                </label>

                <div className="company-select-wrapper">

                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select country
                    </option>

                    <option value="india">
                      India
                    </option>

                    <option value="usa">
                      United States
                    </option>

                    <option value="uk">
                      United Kingdom
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>


              {/* State */}

              <div className="company-form-group">

                <label htmlFor="state">
                  State
                </label>

                <div className="company-select-wrapper">

                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select state
                    </option>

                    <option value="uttar-pradesh">
                      Uttar Pradesh
                    </option>

                    <option value="delhi">
                      Delhi
                    </option>

                    <option value="maharashtra">
                      Maharashtra
                    </option>

                    <option value="karnataka">
                      Karnataka
                    </option>

                    <option value="tamil-nadu">
                      Tamil Nadu
                    </option>

                    <option value="telangana">
                      Telangana
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>


              {/* District */}

              <div className="company-form-group">

                <label htmlFor="district">
                  District
                </label>

                <div className="company-select-wrapper">

                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select district
                    </option>

                    <option value="varanasi">
                      Varanasi
                    </option>

                    <option value="lucknow">
                      Lucknow
                    </option>

                    <option value="kanpur">
                      Kanpur Nagar
                    </option>

                    <option value="prayagraj">
                      Prayagraj
                    </option>

                    <option value="noida">
                      Gautam Buddha Nagar
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                  <ChevronDown size={17} />

                </div>

              </div>


              {/* Extra Address */}

              <div className="company-form-group full">

                <label htmlFor="extraAddress">
                  Extra Address
                </label>

                <div className="company-input-wrapper">

                  <MapPin size={18} />

                  <input
                    id="extraAddress"
                    name="extraAddress"
                    type="text"
                    placeholder="Building, street, area, landmark..."
                    value={formData.extraAddress}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

            </div>


            <div className="company-location-note">

              <MapPin size={16} />

              <span>
                Location can be automatically detected from
                the user's device when location permission
                is available.
              </span>

            </div>

          </section>



          <section className="company-form-section">

            <div className="company-section-heading">

              <UserRound size={19} />

              <div>
                <h2>Authorized Person</h2>

                <p>
                  Provide the details of the person
                  responsible for this company account.
                </p>
              </div>

            </div>


            <div className="company-form-grid">

              {/* Authorized Person */}

              <div className="company-form-group">

                <label htmlFor="authorizedPerson">
                  Authorized Person
                </label>

                <div className="company-input-wrapper">

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


              {/* Designation */}

              <div className="company-form-group">

                <label htmlFor="designation">
                  Designation
                </label>

                <div className="company-input-wrapper">

                  <UserRound size={18} />

                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    placeholder="HR Manager / Director..."
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* Phone */}

              <div className="company-form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="company-input-wrapper">

                  <Phone size={18} />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter contact number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

            </div>

          </section>



          <section className="company-form-section">

            <div className="company-section-heading">

              <LockKeyhole size={19} />

              <div>
                <h2>Account Security</h2>

                <p>
                  Create the password for company access.
                </p>
              </div>

            </div>


            <div className="company-form-grid">

              <div className="company-form-group full">

                <label htmlFor="password">
                  Password
                </label>

                <div className="company-input-wrapper">

                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="company-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label="Toggle password visibility"
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



          <section className="company-form-section">

            <div className="company-section-heading">

              <FileCheck2 size={19} />

              <div>
                <h2>Company Verification</h2>

                <p>
                  Upload company identification or
                  verification details.
                </p>
              </div>

            </div>


            <label
              htmlFor="companyVerification"
              className="company-upload-box"
            >

              <FileCheck2 size={25} />

              <span>
                {formData.companyVerification
                  ? formData.companyVerification.name
                  : "Choose company verification document"}
              </span>

              <small>
                PDF, JPG or PNG
              </small>

            </label>


            <input
              id="companyVerification"
              name="companyVerification"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              required
              hidden
            />

          </section>



          <div className="company-registration-notice">

            <ShieldCheck size={18} />

            <p>
              After registration, the company will go
              through email verification, company
              verification and admin review before
              full dashboard access.
            </p>

          </div>


          <button
            type="submit"
            className="company-submit company-register-submit"
          >
            Create Company Account
          </button>

        </form>


        <p className="company-auth-switch">

          Already have a company account?{" "}

          <Link to="/auth/company/login">
            Sign in
          </Link>

        </p>

      </main>

    </div>
  );
}