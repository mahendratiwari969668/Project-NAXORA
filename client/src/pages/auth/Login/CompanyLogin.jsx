import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import ThemeToggle from "../../../components/common/ThemeToggle";
import "../CompanyAuth.css";

const API_BASE = "http://localhost:5000";

export default function CompanyLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: location.state?.email || "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({
        ...prev,
        identifier: location.state.email,
      }));
    }
  }, [location.state?.email]);

  // Login & 2FA state
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [isUnverifiedMode, setIsUnverifiedMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [wrongRole, setWrongRole] = useState("");
  const [isDevMode, setIsDevMode] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    if (wrongRole) setWrongRole("");
    if (error) setError("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMsg("");
    setWrongRole("");

    if (!formData.identifier.trim() || !formData.password) {
      setError("Please enter your official email or phone and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/company/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          identifier: formData.identifier.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.role && data.role !== "company") {
          setWrongRole(data.role);
          setError(
            data.message ||
              `This account is registered as a ${data.role}. Please sign in via the ${data.role} portal.`
          );
          return;
        }

        if (response.status === 403 && data.isUnverified) {
          if (data.isDevMode) setIsDevMode(true);
          setIsUnverifiedMode(true);
          setOtpMode(true);
          setUserEmail(data.email || formData.identifier.trim());
          setSuccessMsg(
            data.message ||
              "Your official email is not verified yet. A verification code has been sent to your email."
          );
          setResendCooldown(60);
          return;
        }

        throw new Error(data.message || "Invalid credentials. Please try again.");
      }

      if (data.otpRequired) {
        if (data.isDevMode) setIsDevMode(true);
        setIsUnverifiedMode(false);
        setOtpMode(true);
        setUserEmail(data.email || formData.identifier.trim());
        setSuccessMsg(
          data.message || "Verification code sent to your registered official email."
        );
        setResendCooldown(data.cooldownSeconds || 60);
      } else {
        // Direct session without 2FA
        localStorage.setItem("nexoraCompanyLoggedIn", "true");
        localStorage.setItem(
          "nexoraCompanyIdentifier",
          formData.identifier.trim()
        );
        if (data.approvalStatus) {
          localStorage.setItem("nexoraCompanyApprovalStatus", data.approvalStatus);
        }
        navigate("/company/dashboard");
      }
    } catch (err) {
      console.error("Company login error:", err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMsg("");

    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    setVerifying(true);

    try {
      const endpoint = isUnverifiedMode
        ? `${API_BASE}/api/auth/company/verify-otp`
        : `${API_BASE}/api/auth/company/verify-login-otp`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          otp: cleanOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid verification code.");
      }

      localStorage.setItem("nexoraCompanyLoggedIn", "true");
      localStorage.setItem(
        "nexoraCompanyIdentifier",
        userEmail || formData.identifier.trim()
      );
      if (data.approvalStatus) {
        localStorage.setItem("nexoraCompanyApprovalStatus", data.approvalStatus);
      }

      navigate("/company/dashboard");
    } catch (err) {
      console.error("Company OTP verification error:", err);
      setError(err.message || "Verification failed. Please check your code.");
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
      const endpoint = isUnverifiedMode
        ? `${API_BASE}/api/auth/company/resend-otp`
        : `${API_BASE}/api/auth/company/resend-login-otp`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to resend verification code.");
      }

      if (data.isDevMode) setIsDevMode(true);
      setSuccessMsg(data.message || "A new verification code has been sent to your email.");
      setResendCooldown(data.cooldownSeconds || 60);
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError(err.message || "Failed to resend verification code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="company-auth-page">
      <div className="company-auth-top">
        <Link
          to="/auth/role-selection?mode=login"
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

      <main className="company-auth-container">
        {otpMode ? (
          /* OTP Verification Stage */
          <>
            <div className="company-auth-header">
              <div className="company-auth-icon">
                <KeyRound size={25} />
              </div>

              <p className="company-auth-eyebrow">
                {isUnverifiedMode ? "EMAIL VERIFICATION" : "TWO-FACTOR SECURITY"}
              </p>

              <h1>{isUnverifiedMode ? "Verify your email" : "Enter verification code"}</h1>

              {isDevMode ? (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "rgba(59, 130, 246, 0.08)",
                    border: "1px solid rgba(59, 130, 246, 0.25)",
                    color: "var(--company-text, #0f172a)",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    margin: "12px 0 16px",
                    textAlign: "left",
                  }}
                >
                  <strong style={{ display: "block", color: "#3b82f6", marginBottom: "4px" }}>
                    Development Mode Active
                  </strong>
                  Check your <strong>backend server terminal</strong> to view the generated 6-digit verification code for <strong>{userEmail}</strong>.
                </div>
              ) : (
                <p>
                  We sent a 6-digit verification code to{" "}
                  <strong style={{ color: "var(--company-text, #0f172a)" }}>
                    {userEmail}
                  </strong>
                  . Enter the code below to access your portal.
                </p>
              )}
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
                    <Loader2 size={18} className="animate-spin" /> Verifying...
                  </span>
                ) : (
                  "Verify & Sign In"
                )}
              </button>

              <div className="company-resend-row">
                <span>
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : isDevMode
                    ? "Need a new terminal code?"
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
                    setOtpMode(false);
                    setError("");
                    setSuccessMsg("");
                  }}
                >
                  <ArrowLeft size={14} /> Back to email & password
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Standard Login Form */
          <>
            <div className="company-auth-header">
              <div className="company-auth-icon">
                <Building2 size={25} />
              </div>

              <p className="company-auth-eyebrow">
                COMPANY PORTAL
              </p>

              <h1>Welcome back</h1>

              <p>
                Sign in to manage opportunities, discover
                candidates and build industry connections.
              </p>
            </div>

            <form
              className="company-auth-card"
              onSubmit={handleLogin}
            >
              {wrongRole ? (
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
                    <span>{error}</span>
                  </div>
                  <Link
                    to={`/auth/${wrongRole}/login`}
                    className="company-submit"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      padding: "10px 18px",
                      minHeight: "38px",
                      fontSize: "13px",
                      width: "auto",
                      marginTop: 0,
                    }}
                  >
                    Go to {wrongRole === "student" ? "Student" : wrongRole === "institution" ? "Institution" : wrongRole} Sign In
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

              {/* Identifier */}
              <div className="company-form-group">
                <label htmlFor="identifier">
                  Official Email or Contact Phone
                </label>

                <div className="company-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="Enter your official email or phone"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="company-form-group">
                <div className="company-label-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="company-forgot"
                    onClick={() => {}}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="company-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
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

              {/* Submit */}
              <button
                type="submit"
                className="company-submit"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <Loader2 size={18} className="animate-spin" /> Signing In...
                  </span>
                ) : (
                  "Continue to Company Dashboard"
                )}
              </button>

              {/* Divider */}
              <div className="company-login-divider">
                <span>Secure company access</span>
              </div>

              {/* Security note */}
              <div className="company-security-note">
                <ShieldCheck size={17} />
                <span>
                  Protected by two-factor authentication and official credential verification.
                </span>
              </div>
            </form>

            {/* Register */}
            <p className="company-auth-switch">
              Don't have a company account?{" "}
              <Link to="/auth/company/register">Register company</Link>
            </p>
          </>
        )}
      </main>
    </div>
  );
}