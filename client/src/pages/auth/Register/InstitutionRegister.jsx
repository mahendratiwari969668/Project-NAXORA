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
import "../InstitutionAuth.css";

const API_BASE = "http://localhost:5000";

export default function InstitutionRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    institutionName: "",
    institutionType: "",
    affiliation: "",
    officialEmail: "",
    website: "",
    country: "india",
    state: "",
    district: "",
    extraAddress: "",
    authorizedPerson: "",
    designation: "",
    contactNumber: "",
    password: "",
    supportingDocument: null,
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
  const [existingUserRole, setExistingUserRole] = useState("institution");

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "supportingDocument") {
      const file = files?.[0];
      if (!file) return;

      // Validate allowed file extensions
      const allowedExts = [".pdf", ".jpg", ".jpeg", ".png"];
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!allowedExts.includes(ext)) {
        setError("Invalid document format. Only PDF, JPG, and PNG files are allowed.");
        e.target.value = "";
        setFormData((prev) => ({ ...prev, supportingDocument: null }));
        return;
      }

      // Validate maximum file size (10 MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Document size exceeds the 10 MB limit. Please upload a smaller file.");
        e.target.value = "";
        setFormData((prev) => ({ ...prev, supportingDocument: null }));
        return;
      }

      setError("");
      setFormData((prev) => ({
        ...prev,
        supportingDocument: file,
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
    setFormData((prev) => ({ ...prev, supportingDocument: null }));
    const fileInput = document.getElementById("supportingDocument");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setAlreadyVerifiedEmail(false);

    if (!formData.supportingDocument) {
      setError("Please select and upload a supporting document (PDF, JPG or PNG).");
      const uploadLabel = document.querySelector(".institution-upload-box");
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
      payload.append("institutionName", formData.institutionName.trim());
      payload.append("institutionType", formData.institutionType.trim());
      payload.append("affiliation", formData.affiliation.trim());
      payload.append("officialEmail", formData.officialEmail.trim());
      payload.append("website", formData.website.trim());
      payload.append("country", formData.country || "India");
      payload.append("state", formData.state.trim());
      payload.append("district", formData.district.trim());
      payload.append("extraAddress", formData.extraAddress.trim());
      payload.append("authorizedPerson", formData.authorizedPerson.trim());
      payload.append("designation", formData.designation.trim());
      payload.append("contactNumber", formData.contactNumber.trim());
      payload.append("password", formData.password);
      payload.append("supportingDocument", formData.supportingDocument);

      const response = await fetch(`${API_BASE}/api/auth/institution/register`, {
        method: "POST",
        credentials: "include",
        body: payload,
      });

      const data = await response.json();

      // Handle duplicate email that is already verified or wrong role
      if (response.status === 409 || data.alreadyVerified) {
        setAlreadyVerifiedEmail(true);
        setExistingUserRole(data.role || "institution");
        setError(
          data.message ||
            "An account with this official email already exists and is verified. Please sign in."
        );
        setTimeout(() => {
          const bottomAlert = document.getElementById("institution-bottom-conflict-alert");
          if (bottomAlert) {
            bottomAlert.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 60);
        return;
      }

      // Handle existing unverified account -> resume OTP flow directly
      if (data.isExistingUnverified) {
        setRegisteredEmail(data.email || formData.officialEmail.trim().toLowerCase());
        setVerificationMode(true);
        setSuccessMsg(
          data.message ||
            "An unverified registration exists for this email. Please enter your verification code below."
        );
        setResendCooldown(data.cooldownSeconds || 60);
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit institution registration.");
      }

      // Standard new registration initiated
      setRegisteredEmail(formData.officialEmail.trim().toLowerCase());
      setVerificationMode(true);
      setSuccessMsg(
        data.message ||
          "Registration initiated. A 6-digit verification code has been sent to your official email."
      );
      setResendCooldown(data.cooldownSeconds || 60);
    } catch (err) {
      console.error("Institution registration failed:", err);
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
      const response = await fetch(`${API_BASE}/api/auth/institution/verify-otp`, {
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
      const response = await fetch(`${API_BASE}/api/auth/institution/resend-otp`, {
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
        {/* Verification Success / Pending Review Notice */}
        {verificationMode && isVerifiedNotice ? (
          <div className="institution-auth-card" style={{ padding: "40px 32px", textAlign: "center" }}>
            <div className="institution-auth-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981", borderColor: "rgba(16, 185, 129, 0.3)" }}>
              <ShieldCheck size={28} />
            </div>

            <p className="institution-auth-eyebrow" style={{ color: "#10b981" }}>
              REGISTRATION SUBMITTED
            </p>

            <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>
              Official Email Verified
            </h1>

            <p style={{ color: "var(--institution-muted, #9dadc2)", fontSize: "15px", lineHeight: "1.65", maxWidth: "560px", margin: "0 auto 24px" }}>
              Your official email <strong>{registeredEmail}</strong> has been successfully verified. Your institution profile and supporting documents are now under administrative review. Once validated, full portal access will be granted.
            </p>

            <div className="institution-alert-warning" style={{ textAlign: "left", maxWidth: "560px", margin: "0 auto 28px" }}>
              <Clock size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ display: "block", color: "inherit", marginBottom: "4px" }}>
                  Administrative Approval Pending
                </strong>
                <span>
                  Our compliance team reviews institutional accreditations within 1-2 business days. You can sign in using your credentials to check the current review status.
                </span>
              </div>
            </div>

            <button
              type="button"
              className="institution-submit"
              style={{ maxWidth: "340px", margin: "0 auto" }}
              onClick={() => navigate("/auth/institution/login")}
            >
              Proceed to Institution Sign In
            </button>
          </div>
        ) : verificationMode ? (
          /* OTP Verification Stage */
          <div className="institution-auth-container" style={{ margin: "20px auto 0" }}>
            <div className="institution-auth-header">
              <div className="institution-auth-icon">
                <KeyRound size={25} />
              </div>

              <p className="institution-auth-eyebrow">
                OFFICIAL EMAIL VERIFICATION
              </p>

              <h1>Verify your email</h1>

              <p>
                We sent a 6-digit verification code to{" "}
                <strong style={{ color: "var(--institution-text, #eef4ff)" }}>
                  {registeredEmail}
                </strong>
                . Enter the code below to complete your registration.
              </p>
              <p style={{ fontSize: "12px", color: "var(--institution-muted, #9dadc2)", marginTop: "6px" }}>
                Tip: Please also check your <strong>Spam or Junk</strong> folder if the email does not appear in your Primary Inbox.
              </p>
            </div>

            <form className="institution-auth-card" onSubmit={handleVerifyOtp}>
              {error && (
                <div className="institution-alert-error">
                  <AlertCircle size={17} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="institution-alert-success">
                  <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="institution-form-group">
                <label htmlFor="otp">6-Digit Verification Code</label>

                <div className="institution-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="••••••"
                    className="institution-otp-input"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                className="institution-submit"
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

              <div className="institution-resend-row">
                <span>
                  {resendCooldown > 0
                    ? `Resend available in ${resendCooldown}s`
                    : "Didn't receive the email?"}
                </span>

                <button
                  type="button"
                  className="institution-text-btn"
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

              <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid var(--institution-border, #20334b)", textAlign: "center" }}>
                <button
                  type="button"
                  className="institution-text-btn"
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
          /* Standard 5-Section Registration Form */
          <>
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
              {/* Duplicate Email Detected Notice with Direct Sign In Action */}
              {alreadyVerifiedEmail ? (
                <div
                  className="institution-alert-warning"
                  style={{
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: "14px",
                    marginTop: "20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <AlertCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ fontSize: "14px" }}>
                        {existingUserRole === "student"
                          ? "Student Account Detected"
                          : "Account Already Verified"}
                      </strong>
                      <p style={{ margin: "4px 0 0", fontSize: "13px", lineHeight: "1.5" }}>
                        {error ||
                          "An account with this official email already exists and is verified. Please log in."}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <Link
                      to={
                        existingUserRole === "student"
                          ? "/auth/student/login"
                          : "/auth/institution/login"
                      }
                      className="institution-submit"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        textDecoration: "none",
                        padding: "10px 22px",
                        minHeight: "42px",
                        fontSize: "13px",
                        width: "auto",
                        marginTop: 0,
                      }}
                    >
                      <LogIn size={15} />
                      Sign in as {existingUserRole === "student" ? "Student" : "Institution"}
                    </Link>

                    <button
                      type="button"
                      className="institution-text-btn"
                      style={{ padding: "0 8px" }}
                      onClick={() => {
                        setAlreadyVerifiedEmail(false);
                        setError("");
                        const emailInput = document.getElementById("officialEmail");
                        if (emailInput) {
                          emailInput.focus();
                          emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                    >
                      Use a different email address
                    </button>
                  </div>
                </div>
              ) : (
                error && (
                  <div className="institution-alert-error" style={{ marginTop: "20px" }}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                  </div>
                )
              )}

              {successMsg && (
                <div className="institution-alert-success" style={{ marginTop: "20px" }}>
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* 1. Institution Details */}
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

              {/* 2. Official Contact */}
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

                    {alreadyVerifiedEmail && (
                      <span
                        className="institution-field-note"
                        style={{
                          color: "#fbbf24",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginTop: "6px",
                          fontSize: "12px",
                        }}
                      >
                        <AlertCircle size={14} style={{ flexShrink: 0 }} />
                        <span>
                          {existingUserRole === "student"
                            ? "This email is registered to a Student account. "
                            : "This email is already registered and verified. "}
                          <Link
                            to={
                              existingUserRole === "student"
                                ? "/auth/student/login"
                                : "/auth/institution/login"
                            }
                            style={{
                              color: "#60a5fa",
                              textDecoration: "underline",
                              fontWeight: 600,
                            }}
                          >
                            Sign in here
                          </Link>
                        </span>
                      </span>
                    )}
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
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Address */}
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
                        <option value="delhi">Delhi</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="tamil-nadu">Tamil Nadu</option>
                        <option value="other">Other State</option>
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
                        <option value="noida">Noida / Gautam Buddha Nagar</option>
                        <option value="bengaluru">Bengaluru</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="other">Other District</option>
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

              {/* 4. Authorized Person */}
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

              {/* 5. Account Security */}
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
                        placeholder="Create a strong password (minimum 8 characters)"
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

              {/* 6. Supporting Document */}
              <section className="institution-form-section">
                <div className="institution-section-heading">
                  <FileCheck2 size={19} />

                  <div>
                    <h2>Supporting Document</h2>
                    <p>
                      Upload a document that supports institutional
                      verification (Affiliation letter, UGC approval, or ID).
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="supportingDocument"
                  className="institution-upload-box"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      document.getElementById("supportingDocument")?.click();
                    }
                  }}
                >
                  <FileCheck2 size={24} />

                  <span>
                    {formData.supportingDocument
                      ? formData.supportingDocument.name
                      : "Choose supporting document"}
                  </span>

                  <small>
                    {formData.supportingDocument
                      ? `${(formData.supportingDocument.size / (1024 * 1024)).toFixed(2)} MB · Click to change file`
                      : "PDF, JPG or PNG (Up to 10 MB)"}
                  </small>
                </label>

                {formData.supportingDocument && (
                  <div className="institution-file-preview">
                    <div className="institution-file-info">
                      <FileCheck2 size={18} color="#65a9ff" />
                      <div>
                        <div className="institution-file-name">
                          {formData.supportingDocument.name}
                        </div>
                        <div className="institution-file-size">
                          {(formData.supportingDocument.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="institution-text-btn"
                      style={{ color: "#f87171" }}
                      onClick={removeFile}
                      aria-label="Remove uploaded document"
                    >
                      <X size={15} /> Remove
                    </button>
                  </div>
                )}

                <input
                  id="supportingDocument"
                  name="supportingDocument"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="institution-file-hidden-input"
                  aria-label="Upload supporting document"
                />
              </section>

              <div className="institution-registration-notice">
                <ShieldCheck size={18} />

                <p>
                  After registration, the institution will go through
                  email verification, document validation and
                  administrative review before full dashboard access.
                </p>
              </div>

              {/* Bottom Conflict Alert — immediately visible without scrolling */}
              {alreadyVerifiedEmail && (
                <div
                  id="institution-bottom-conflict-alert"
                  className="institution-alert-warning"
                  style={{
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: "14px",
                    margin: "18px 0 10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <AlertCircle size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ fontSize: "14px" }}>
                        {existingUserRole === "student"
                          ? "Student Account Detected"
                          : "Account Already Verified"}
                      </strong>
                      <p style={{ margin: "4px 0 0", fontSize: "13px", lineHeight: "1.5" }}>
                        {error ||
                          "An account with this official email already exists and is verified. Please log in."}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <Link
                      to={
                        existingUserRole === "student"
                          ? "/auth/student/login"
                          : "/auth/institution/login"
                      }
                      className="institution-submit"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        textDecoration: "none",
                        padding: "10px 22px",
                        minHeight: "42px",
                        fontSize: "13px",
                        width: "auto",
                        marginTop: 0,
                      }}
                    >
                      <LogIn size={15} />
                      Sign in as {existingUserRole === "student" ? "Student" : "Institution"}
                    </Link>

                    <button
                      type="button"
                      className="institution-text-btn"
                      style={{ padding: "0 8px" }}
                      onClick={() => {
                        setAlreadyVerifiedEmail(false);
                        setError("");
                        const emailInput = document.getElementById("officialEmail");
                        if (emailInput) {
                          emailInput.focus();
                          emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                    >
                      Use a different email address
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom General Error Banner */}
              {!alreadyVerifiedEmail && error && (
                <div className="institution-alert-error" style={{ margin: "16px 0 8px" }}>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="institution-submit institution-register-submit"
                disabled={loading || alreadyVerifiedEmail}
                style={{
                  opacity: alreadyVerifiedEmail ? 0.65 : 1,
                  cursor: alreadyVerifiedEmail ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <Loader2 size={18} className="animate-spin" /> Submitting registration...
                  </span>
                ) : alreadyVerifiedEmail ? (
                  `Email Already Registered (${existingUserRole === "student" ? "Student" : "Institution"})`
                ) : (
                  "Submit institution registration"
                )}
              </button>
            </form>

            <p className="institution-auth-switch">
              Already have an institution account?{" "}
              <Link to="/auth/institution/login">
                Sign in
              </Link>
            </p>
          </>
        )}
      </main>
    </div>
  );
}