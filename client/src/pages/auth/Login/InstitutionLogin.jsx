import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
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
import "../InstitutionAuth.css";

const API_BASE = "http://localhost:5000";

export default function InstitutionLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

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

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setWrongRole("");

    if (!formData.identifier || !formData.password) {
      setError("Please enter your official email or contact number and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/institution/login`, {
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
        if (data.role && data.role !== "institution") {
          setWrongRole(data.role);
          setError(
            data.message ||
              `This account is registered as a ${data.role}. Please sign in via the ${data.role} portal.`
          );
          return;
        }

        if (data.isUnverified) {
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
        setIsUnverifiedMode(false);
        setOtpMode(true);
        setUserEmail(data.email || formData.identifier.trim());
        setSuccessMsg(
          data.message || "Verification code sent to your registered official email."
        );
        setResendCooldown(data.cooldownSeconds || 60);
      } else {
        // Direct session
        localStorage.setItem("nexoraInstitutionLoggedIn", "true");
        localStorage.setItem(
          "nexoraInstitutionIdentifier",
          formData.identifier.trim()
        );
        if (data.approvalStatus) {
          localStorage.setItem("nexoraInstitutionApprovalStatus", data.approvalStatus);
        }
        navigate("/institution/dashboard");
      }
    } catch (err) {
      console.error("Institution login error:", err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
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
        ? `${API_BASE}/api/auth/institution/verify-otp`
        : `${API_BASE}/api/auth/institution/verify-login-otp`;

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

      localStorage.setItem("nexoraInstitutionLoggedIn", "true");
      localStorage.setItem(
        "nexoraInstitutionIdentifier",
        userEmail || formData.identifier.trim()
      );
      if (data.approvalStatus) {
        localStorage.setItem("nexoraInstitutionApprovalStatus", data.approvalStatus);
      }

      navigate("/institution/dashboard");
    } catch (err) {
      console.error("Institution OTP verification error:", err);
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
        ? `${API_BASE}/api/auth/institution/resend-otp`
        : `${API_BASE}/api/auth/institution/resend-login-otp`;

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
    <div className="institution-auth-page">
      <div className="institution-auth-top">
        <Link
          to="/auth/role-selection?mode=login"
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

      <main className="institution-auth-container">
        {otpMode ? (
          /* OTP Verification Stage */
          <>
            <div className="institution-auth-header">
              <div className="institution-auth-icon">
                <KeyRound size={25} />
              </div>

              <p className="institution-auth-eyebrow">
                {isUnverifiedMode ? "EMAIL VERIFICATION" : "TWO-FACTOR SECURITY"}
              </p>

              <h1>{isUnverifiedMode ? "Verify your email" : "Enter verification code"}</h1>

              <p>
                We sent a 6-digit verification code to{" "}
                <strong style={{ color: "var(--institution-text, #eef4ff)" }}>
                  {userEmail}
                </strong>
                . Enter the code below to access your portal.
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
                    <Loader2 size={18} className="animate-spin" /> Verifying...
                  </span>
                ) : (
                  "Verify & Sign In"
                )}
              </button>

              <div className="institution-resend-row">
                <span>
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
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

              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "18px",
                  borderTop: "1px solid var(--institution-border, #20334b)",
                  textAlign: "center",
                }}
              >
                <button
                  type="button"
                  className="institution-text-btn"
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
            <div className="institution-auth-header">
              <div className="institution-auth-icon">
                <ShieldCheck size={25} />
              </div>

              <p className="institution-auth-eyebrow">
                INSTITUTION PORTAL
              </p>

              <h1>Welcome back</h1>

              <p>
                Sign in to manage your institution, students and
                industry connections.
              </p>
            </div>

            <form
              className="institution-auth-card"
              onSubmit={handleLogin}
            >
              {wrongRole ? (
                <div
                  className="institution-alert-warning"
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
                    className="institution-submit"
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
                    Go to {wrongRole === "student" ? "Student" : wrongRole} Sign In
                  </Link>
                </div>
              ) : error ? (
                <div className="institution-alert-error">
                  <AlertCircle size={17} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              ) : null}

              {successMsg && (
                <div className="institution-alert-success">
                  <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="institution-form-group">
                <label htmlFor="identifier">
                  Official Email or Contact Number
                </label>

                <div className="institution-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="Enter official email or contact number"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="institution-form-group">
                <div className="institution-label-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="institution-forgot"
                    onClick={() => {}}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="institution-input-wrapper">
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
                    className="institution-password-toggle"
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

              <button
                type="submit"
                className="institution-submit"
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <Loader2 size={18} className="animate-spin" /> Verifying credentials...
                  </span>
                ) : (
                  "Continue to verification"
                )}
              </button>

              <div className="institution-login-divider">
                <span>Secure institution access</span>
              </div>

              <div className="institution-security-note">
                <ShieldCheck size={17} />

                <span>
                  Your account requires two-factor OTP verification before
                  access is granted.
                </span>
              </div>
            </form>

            <p className="institution-auth-switch">
              Don't have an institution account?{" "}
              <Link to="/auth/institution/register">
                Register institution
              </Link>
            </p>
          </>
        )}
      </main>
    </div>
  );
}