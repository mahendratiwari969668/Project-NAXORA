import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import ThemeToggle from "../../../components/common/ThemeToggle";
import "../CompanyAuth.css";

export default function CompanyLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Frontend-only authentication for now.
    // Backend authentication will be connected later.

    console.log("Company Login:", formData);

    navigate("/company/dashboard");
  };

  return (
    <div className="company-auth-page">

      {/* =================================================
          TOP BAR
      ================================================= */}

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


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="company-auth-container">

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


        {/* =================================================
            LOGIN FORM
        ================================================= */}

        <form
          className="company-auth-card"
          onSubmit={handleSubmit}
        >

          {/* Identifier */}

          <div className="company-form-group">

            <label htmlFor="identifier">
              Official Email
            </label>

            <div className="company-input-wrapper">

              <Mail size={18} />

              <input
                id="identifier"
                name="identifier"
                type="email"
                placeholder="Enter your official company email"
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
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="company-password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
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


          {/* Submit */}

          <button
            type="submit"
            className="company-submit"
          >
            Continue to Company Dashboard
          </button>


          {/* Divider */}

          <div className="company-login-divider">
            <span>
              Secure company access
            </span>
          </div>


          {/* Security note */}

          <div className="company-security-note">

            <ShieldCheck size={17} />

            <span>
              Your company account will use secure
              verification when backend authentication
              is connected.
            </span>

          </div>

        </form>


        {/* Register */}

        <p className="company-auth-switch">

          Don't have a company account?{" "}

          <Link to="/auth/company/register">
            Register company
          </Link>

        </p>

      </main>

    </div>
  );
}