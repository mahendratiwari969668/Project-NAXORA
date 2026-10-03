import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import ThemeToggle from "../../../components/common/ThemeToggle";
import "../InstitutionAuth.css";

export default function InstitutionLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend-only authentication for now.
    // Backend authentication and OTP verification
    // will be connected later.

    localStorage.setItem("nexoraInstitutionLoggedIn", "true");
    localStorage.setItem(
      "nexoraInstitutionIdentifier",
      formData.identifier
    );

    // Continue to Institution Dashboard
    navigate("/institution/dashboard");
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
          onSubmit={handleSubmit}
        >
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
          >
            Continue to verification
          </button>

          <div className="institution-login-divider">
            <span>Secure institution access</span>
          </div>

          <div className="institution-security-note">
            <ShieldCheck size={17} />

            <span>
              Your account will require OTP verification before
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
      </main>
    </div>
  );
}