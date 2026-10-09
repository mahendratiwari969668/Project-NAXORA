import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  FileCheck2,
  Globe2,
  KeyRound,
  Loader2,
  LockKeyhole,
  LogIn,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import ThemeToggle from "../../../components/common/ThemeToggle";
import "../CompanyAuth.css";

const API_BASE = "http://localhost:5000";

export default function CompanyRegister() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    industry: "",
    officialEmail: "",
    website: "",
    country: "india",
    state: "",
    district: "",
    extraAddress: "",
    authorizedPerson: "",
    designation: "",
    phone: "",
    password: "",
    companyVerification: null,
  });

  // Auth flow states
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [verificationMode, setVerificationMode] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerifiedNotice, setIsVerifiedNotice] = useState(false);
  const [alreadyVerifiedEmail, setAlreadyVerifiedEmail] = useState(false);
  const [existingUserRole, setExistingUserRole] = useState("company");

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "companyVerification") {
      const file = files?.[0];
      if (!file) return;

      const allowedExts = [".pdf", ".jpg", ".jpeg", ".png"];
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!allowedExts.includes(ext)) {
        setError("Invalid document format. Only PDF, JPG, and PNG files are allowed.");
        event.target.value = "";
        setFormData((prev) => ({ ...prev, companyVerification: null }));
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("Document size exceeds the 10 MB limit. Please upload a smaller file.");
        event.target.value = "";
        setFormData((prev) => ({ ...prev, companyVerification: null }));
        return;
      }

      setError("");
      setFormData((prev) => ({
        ...prev,
        companyVerification: file,
      }));
      return;
    }

    if (name === "officialEmail") {
      setAlreadyVerifiedEmail(false);
      setError("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, companyVerification: null }));
    const fileInput = document.getElementById("companyVerification");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMsg("");
    setAlreadyVerifiedEmail(false);

    if (!formData.companyVerification) {
      setError("Please select and upload a company verification document (PDF, JPG or PNG).");
      const uploadLabel = document.querySelector(".company-upload-box");
      if (uploadLabel) {
        uploadLabel.scrollIntoView({ behavior: "smooth", block: "center" });
        uploadLabel.focus();
      }
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("companyName", formData.companyName.trim());
      payload.append("companyType", formData.companyType.trim());
      payload.append("industry", formData.industry.trim());
      payload.append("officialEmail", formData.officialEmail.trim());
      payload.append("website", formData.website.trim());
      payload.append("country", formData.country || "India");
      payload.append("state", formData.state.trim());
      payload.append("district", formData.district.trim());
      payload.append("extraAddress", formData.extraAddress.trim());
      payload.append("authorizedPerson", formData.authorizedPerson.trim());
      payload.append("designation", formData.designation.trim());
      payload.append("phone", formData.phone.trim());
      payload.append("password", formData.password);
      payload.append("companyVerification", formData.companyVerification);

      const response = await fetch(`${API_BASE}/api/auth/company/register`, {
        method: "POST",
        credentials: "include",
        body: payload,
      });

      const data = await response.json();

      // Duplicate email that is verified or wrong role
      if (response.status === 409 || data.alreadyVerified) {
        setAlreadyVerifiedEmail(true);
        setExistingUserRole(data.role || "company");
        setError(
          data.message ||
            "An account with this official email already exists and is verified. Please sign in."
        );
        setTimeout(() => {
          const bottomAlert = document.getElementById("company-bottom-conflict-alert");
          if (bottomAlert) {
            bottomAlert.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 60);
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit company registration.");
      }

      // Successful registration (either fresh or resuming unverified account)
      setRegisteredEmail(data.email || formData.officialEmail.trim().toLowerCase());
      setVerificationMode(true);
      setSuccessMsg(
        data.message ||
          "Registration initiated. A 6-digit verification code has been sent to your official company email."
      );
      setResendCooldown(data.cooldownSeconds || 60);
    } catch (err) {
      console.error("Company registration failed:", err);
      setError(err.message || "Registration failed. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const cleanOtp = otp.trim();
    if (cleanOtp.length !== 6) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    setVerifying(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/company/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: registeredEmail,
          otp: cleanOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Verification failed. Please check the code.");
      }

      setIsVerifiedNotice(true);
      setSuccessMsg(
        data.message ||
          "Official email verified successfully. Your account is submitted for administrative review."
      );
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError(err.message || "Failed to verify OTP. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || resending) return;
    setError("");
    setSuccessMsg("");
    setResending(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/company/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: registeredEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to resend verification code.");
      }

      setSuccessMsg(data.message || "A new verification code has been sent to your email.");
      setResendCooldown(data.cooldownSeconds || 60);
    } catch (err) {
      console.error("Resend OTP failed:", err);
      setError(err.message || "Failed to resend verification code.");
    } finally {
      setResending(false);
    }
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
        {/* State 1: Email Verified & Pending Admin Review */}
        {verificationMode && isVerifiedNotice ? (
          <div className="company-auth-card" style={{ padding: "40px 32px", textAlign: "center" }}>
            <div
              className="company-auth-icon"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                borderColor: "rgba(16, 185, 129, 0.3)",
              }}
            >
              <ShieldCheck size={28} />
            </div>

            <p className="company-auth-eyebrow" style={{ color: "#10b981" }}>
              REGISTRATION SUBMITTED
            </p>

            <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>
              Official Email Verified
            </h1>

            <p
              style={{
                color: "var(--company-muted, #94a3b8)",
                fontSize: "15px",
                lineHeight: "1.65",
                maxWidth: "560px",
                margin: "0 auto 24px",
              }}
            >
              Your official email <strong>{registeredEmail}</strong> has been successfully verified.
              Your company profile and verification documents are now under administrative review. Once validated, full portal access will be granted.
            </p>

            <div
              className="company-alert-warning"
              style={{ textAlign: "left", maxWidth: "560px", margin: "0 auto 28px" }}
            >
              <Clock size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ display: "block", color: "inherit", marginBottom: "4px" }}>
                  Administrative Approval Pending
                </strong>
                <span>
                  Our compliance team reviews corporate registrations within 1-2 business days. You can sign in using your credentials to check the current review status.
                </span>
              </div>
            </div>

            <button
              type="button"
              className="company-submit"
              style={{ maxWidth: "340px", margin: "0 auto" }}
              onClick={() => navigate("/auth/company/login", { state: { email: registeredEmail } })}
            >
              Proceed to Company Sign In
            </button>
          </div>
        ) : verificationMode ? (
          /* State 2: OTP Verification Stage */
          <div className="company-auth-container" style={{ margin: "20px auto 0" }}>
            <div className="company-auth-header">
              <div className="company-auth-icon">
                <KeyRound size={25} />
              </div>

              <p className="company-auth-eyebrow">
                OFFICIAL EMAIL VERIFICATION
              </p>

              <h1>Verify your company email</h1>

              <p>
                We sent a 6-digit verification code to{" "}
                <strong style={{ color: "var(--company-text, #0f172a)" }}>
                  {registeredEmail}
                </strong>
                . Enter the code below to complete your registration.
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--company-muted, #94a3b8)",
                  marginTop: "6px",
                }}
              >
                Tip: Please also check your <strong>Spam or Junk</strong> folder if the email does not appear in your Primary Inbox.
              </p>
            </div>

            <form className="company-auth-card" onSubmit={handleVerifyOtp}>
              {error && (
                <div className="company-alert-error">
                  <AlertCircle size={17} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="company-alert-success">
                  <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="company-form-group">
                <label htmlFor="otp">6-Digit Verification Code</label>

                <div className="company-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="••••••"
                    className="company-otp-input"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                className="company-submit"
                disabled={verifying || otp.length !== 6}
                style={{ opacity: verifying || otp.length !== 6 ? 0.7 : 1 }}
              >
                {verifying ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <Loader2 size={18} className="animate-spin" /> Verifying Code...
                  </span>
                ) : (
                  "Verify & Complete Registration"
                )}
              </button>

              <div className="company-resend-row">
                <span>
                  {resendCooldown > 0
                    ? `Resend available in ${resendCooldown}s`
                    : "Didn't receive the email?"}
                </span>

                <button
                  type="button"
                  className="company-text-btn"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || resending}
                >
                  {resending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={14} /> Resend Code
                    </>
                  )}
                </button>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "18px",
                  borderTop: "1px solid var(--company-border, #e2e8f0)",
                  textAlign: "center",
                }}
              >
                <button
                  type="button"
                  className="company-text-btn"
                  onClick={() => {
                    setVerificationMode(false);
                    setError("");
                    setSuccessMsg("");
                  }}
                >
                  <ArrowLeft size={14} /> Back to edit registration form
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* State 3: Standard 5-Section Registration Form */
          <>
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
              {/* Duplicate Email Detected Notice with Direct Sign In Action */}
              {alreadyVerifiedEmail ? (
                <div
                  className="company-alert-warning"
                  style={{
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <AlertCircle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ display: "block", color: "inherit", marginBottom: "4px" }}>
                        Account Already Exists
                      </strong>
                      <span>{error}</span>
                    </div>
                  </div>
                  <Link
                    to={
                      existingUserRole === "company"
                        ? "/auth/company/login"
                        : existingUserRole === "student"
                        ? "/auth/student/login"
                        : "/auth/institution/login"
                    }
                    className="company-submit"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      padding: "10px 18px",
                      minHeight: "38px",
                      fontSize: "13px",
                      width: "100%",
                      marginTop: 0,
                    }}
                  >
                    <LogIn size={16} />
                    Sign In to {existingUserRole === "company" ? "Company Portal" : existingUserRole === "student" ? "Student Portal" : "Institution Portal"}
                  </Link>
                </div>
              ) : error ? (
                <div className="company-alert-error">
                  <AlertCircle size={17} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              ) : null}

              {successMsg && (
                <div className="company-alert-success">
                  <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* SECTION 1: Company Information */}
              <section className="company-form-section">
                <div className="company-section-heading">
                  <Building2 size={19} />
                  <div>
                    <h2>Company Information</h2>
                    <p>Provide the official details of your company.</p>
                  </div>
                </div>

                <div className="company-form-grid">
                  {/* Company Name */}
                  <div className="company-form-group full">
                    <label htmlFor="companyName">Company Name</label>
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
                    <label htmlFor="companyType">Company Type</label>
                    <div className="company-select-wrapper">
                      <select
                        id="companyType"
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select company type</option>
                        <option value="private">Private Company</option>
                        <option value="public">Public Company</option>
                        <option value="startup">Startup</option>
                        <option value="ngo">NGO / Non-Profit</option>
                        <option value="government">Government Organization</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown size={17} />
                    </div>
                  </div>

                  {/* Industry */}
                  <div className="company-form-group">
                    <label htmlFor="industry">Industry</label>
                    <div className="company-select-wrapper">
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select industry</option>
                        <option value="information-technology">Information Technology</option>
                        <option value="software-development">Software Development</option>
                        <option value="finance">Finance & Banking</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="consulting">Consulting</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="telecommunications">Telecommunications</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown size={17} />
                    </div>
                  </div>

                  {/* Official Email */}
                  <div className="company-form-group">
                    <label htmlFor="officialEmail">Official Email</label>
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
                    <label htmlFor="website">Official Website</label>
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

              {/* SECTION 2: Company Location */}
              <section className="company-form-section">
                <div className="company-section-heading">
                  <MapPin size={19} />
                  <div>
                    <h2>Company Location</h2>
                    <p>Add the registered location of your company.</p>
                  </div>
                </div>

                <div className="company-form-grid">
                  {/* Country */}
                  <div className="company-form-group">
                    <label htmlFor="country">Country</label>
                    <div className="company-select-wrapper">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select country</option>
                        <option value="india">India</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown size={17} />
                    </div>
                  </div>

                  {/* State */}
                  <div className="company-form-group">
                    <label htmlFor="state">State</label>
                    <div className="company-select-wrapper">
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select state</option>
                        <option value="uttar-pradesh">Uttar Pradesh</option>
                        <option value="delhi">Delhi</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="tamil-nadu">Tamil Nadu</option>
                        <option value="telangana">Telangana</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown size={17} />
                    </div>
                  </div>

                  {/* District */}
                  <div className="company-form-group">
                    <label htmlFor="district">District</label>
                    <div className="company-select-wrapper">
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
                        <option value="kanpur">Kanpur Nagar</option>
                        <option value="prayagraj">Prayagraj</option>
                        <option value="noida">Gautam Buddha Nagar</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown size={17} />
                    </div>
                  </div>

                  {/* Extra Address */}
                  <div className="company-form-group full">
                    <label htmlFor="extraAddress">Extra Address</label>
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
                    Location can be automatically detected from the user's device when location permission is available.
                  </span>
                </div>
              </section>

              {/* SECTION 3: Authorized Person */}
              <section className="company-form-section">
                <div className="company-section-heading">
                  <UserRound size={19} />
                  <div>
                    <h2>Authorized Person</h2>
                    <p>Provide the details of the person responsible for this company account.</p>
                  </div>
                </div>

                <div className="company-form-grid">
                  {/* Authorized Person */}
                  <div className="company-form-group">
                    <label htmlFor="authorizedPerson">Authorized Person</label>
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
                    <label htmlFor="designation">Designation</label>
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
                    <label htmlFor="phone">Phone Number</label>
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

              {/* SECTION 4: Account Security */}
              <section className="company-form-section">
                <div className="company-section-heading">
                  <LockKeyhole size={19} />
                  <div>
                    <h2>Account Security</h2>
                    <p>Create the password for company access.</p>
                  </div>
                </div>

                <div className="company-form-grid">
                  <div className="company-form-group full">
                    <label htmlFor="password">Password</label>
                    <div className="company-input-wrapper">
                      <LockKeyhole size={18} />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password (minimum 8 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                        required
                      />
                      <button
                        type="button"
                        className="company-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 5: Company Verification */}
              <section className="company-form-section">
                <div className="company-section-heading">
                  <FileCheck2 size={19} />
                  <div>
                    <h2>Company Verification</h2>
                    <p>Upload company identification or verification details.</p>
                  </div>
                </div>

                <label
                  htmlFor="companyVerification"
                  className="company-upload-box"
                  tabIndex={0}
                >
                  <FileCheck2 size={25} />
                  <span>
                    {formData.companyVerification
                      ? "Change verification document"
                      : "Choose company verification document"}
                  </span>
                  <small>PDF, JPG or PNG (up to 10 MB)</small>
                </label>

                <input
                  id="companyVerification"
                  name="companyVerification"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="company-file-hidden-input"
                />

                {formData.companyVerification && (
                  <div className="company-file-preview">
                    <div className="company-file-info">
                      <FileCheck2 size={20} color="#3b82f6" />
                      <div>
                        <div className="company-file-name">
                          {formData.companyVerification.name}
                        </div>
                        <div className="company-file-size">
                          {(formData.companyVerification.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="company-text-btn"
                      onClick={removeFile}
                      title="Remove document"
                      style={{ color: "#ef4444" }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </section>

              <div className="company-registration-notice">
                <ShieldCheck size={18} />
                <p>
                  After registration, the company will go through email verification, company verification and admin review before full dashboard access.
                </p>
              </div>

              {/* Bottom Duplicate Alert if conflict detected */}
              {alreadyVerifiedEmail && (
                <div
                  id="company-bottom-conflict-alert"
                  className="company-alert-warning"
                  style={{
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <AlertCircle size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>
                      An account with <strong>{formData.officialEmail}</strong> already exists. Please sign in to proceed.
                    </span>
                  </div>
                  <Link
                    to={
                      existingUserRole === "company"
                        ? "/auth/company/login"
                        : existingUserRole === "student"
                        ? "/auth/student/login"
                        : "/auth/institution/login"
                    }
                    state={{ email: formData.officialEmail.trim() }}
                    className="company-submit"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      padding: "10px 18px",
                      minHeight: "40px",
                      fontSize: "14px",
                      width: "100%",
                      marginTop: 0,
                    }}
                  >
                    <LogIn size={16} />
                    Sign In to {existingUserRole === "company" ? "Company Portal" : existingUserRole === "student" ? "Student Portal" : "Institution Portal"}
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="company-submit company-register-submit"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <Loader2 size={18} className="animate-spin" /> Submitting Registration...
                  </span>
                ) : alreadyVerifiedEmail ? (
                  "Account Exists - Please Sign In Above"
                ) : (
                  "Create Company Account"
                )}
              </button>
            </form>

            <p className="company-auth-switch">
              Already have a company account?{" "}
              <Link to="/auth/company/login">Sign in</Link>
            </p>
          </>
        )}
      </main>
    </div>
  );
}