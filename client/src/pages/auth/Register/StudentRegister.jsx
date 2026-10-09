import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  Phone,
  User,
  CheckCircle2,
  RefreshCw,
  Loader2,
} from "lucide-react";

import ThemeToggle from "../../../components/common/ThemeToggle";

const API_BASE = "http://localhost:5000";

const graduationYears = Array.from(
  { length: 8 },
  (_, index) => new Date().getFullYear() + index
);

export default function StudentRegister() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationMode, setVerificationMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Master Data state
  const [universities, setUniversities] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const [loadingInstitutions, setLoadingInstitutions] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    universityId: "",
    institutionId: "",
    courseId: "",
    departmentId: "",
    graduationYear: "",
    studentId: "",
  });

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Fetch universities on mount
  useEffect(() => {
    const fetchUniversities = async () => {
      setLoadingUniversities(true);
      try {
        const res = await fetch(`${API_BASE}/api/master-data/universities`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setUniversities(json.data);
        }
      } catch (err) {
        console.error("Failed to load universities:", err);
      } finally {
        setLoadingUniversities(false);
      }
    };

    fetchUniversities();
  }, []);

  // Fetch institutions when universityId changes
  const handleUniversityChange = async (e) => {
    const universityId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      universityId,
      institutionId: "",
      departmentId: "",
      courseId: "",
    }));
    setInstitutions([]);
    setDepartments([]);
    setCourses([]);

    if (!universityId) return;

    setLoadingInstitutions(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/master-data/universities/${universityId}/institutions`
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setInstitutions(json.data);
      }
    } catch (err) {
      console.error("Failed to load institutions:", err);
    } finally {
      setLoadingInstitutions(false);
    }
  };

  // Fetch departments when institutionId changes
  const handleInstitutionChange = async (e) => {
    const institutionId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      institutionId,
      departmentId: "",
      courseId: "",
    }));
    setDepartments([]);
    setCourses([]);

    if (!institutionId) return;

    setLoadingDepartments(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/master-data/institutions/${institutionId}/departments`
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setDepartments(json.data);
      }
    } catch (err) {
      console.error("Failed to load departments:", err);
    } finally {
      setLoadingDepartments(false);
    }
  };

  // Fetch courses when departmentId changes
  const handleDepartmentChange = async (e) => {
    const departmentId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      departmentId,
      courseId: "",
    }));
    setCourses([]);

    if (!departmentId) return;

    setLoadingCourses(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/master-data/departments/${departmentId}/courses`
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setCourses(json.data);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (
      !formData.universityId ||
      !formData.institutionId ||
      !formData.departmentId ||
      !formData.courseId ||
      !formData.graduationYear
    ) {
      setError("Please complete all required academic fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/student/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          mobile: formData.mobile.trim(),
          password: formData.password,
          universityId: formData.universityId,
          institutionId: formData.institutionId,
          departmentId: formData.departmentId,
          courseId: formData.courseId,
          graduationYear: formData.graduationYear,
          studentId: formData.studentId.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      setVerificationMode(true);
      setSuccessMsg(data.message || "A verification code has been sent to your email.");
      setResendCooldown(data.cooldownSeconds || 60);
    } catch (err) {
      console.error("Student registration failed:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
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
      const response = await fetch(`${API_BASE}/api/auth/student/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          otp: cleanOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Verification failed");
      }

      // Verification successful, navigate to student dashboard
      navigate("/student/dashboard");
    } catch (err) {
      console.error("OTP verification failed:", err);
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
      const response = await fetch(`${API_BASE}/api/auth/student/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to resend verification code");
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
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-[#0B1220] dark:text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-[#0B1220]/80">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <ThemeToggle />

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-lg font-bold text-white">
              N
            </div>
            <span className="text-xl font-semibold">NEXORA</span>
          </Link>

          <Link
            to="/auth/role-selection"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <ArrowLeft size={17} />
            Change role
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <GraduationCap size={28} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Student registration
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Create your NEXORA account
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Create your student account and connect your academic profile
            with skills, learning and career opportunities.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111C2E] sm:p-8">
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-300">
              {successMsg}
            </div>
          )}

          {!verificationMode ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <section>
                <div className="mb-5">
                  <h2 className="text-lg font-semibold">Basic information</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Use your real contact details for account verification.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      Full name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Mobile number
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220]"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        placeholder="Minimum 6 characters"
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Confirm password
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Re-enter password"
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Academic Information */}
              <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold">Academic information</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Select your academic relationships from controlled master data.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* University */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      University
                    </label>
                    <select
                      name="universityId"
                      value={formData.universityId}
                      onChange={handleUniversityChange}
                      required
                      disabled={loadingUniversities}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220] disabled:opacity-60"
                    >
                      <option value="">
                        {loadingUniversities
                          ? "Loading universities..."
                          : "Select university"}
                      </option>
                      {universities.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.name} ({u.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Institution */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      College / Institution
                    </label>
                    <select
                      name="institutionId"
                      value={formData.institutionId}
                      onChange={handleInstitutionChange}
                      required
                      disabled={!formData.universityId || loadingInstitutions}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220] disabled:opacity-60"
                    >
                      <option value="">
                        {!formData.universityId
                          ? "Select university first"
                          : loadingInstitutions
                          ? "Loading colleges..."
                          : "Select institution / college"}
                      </option>
                      {institutions.map((inst) => (
                        <option key={inst._id} value={inst._id}>
                          {inst.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Department / Branch
                    </label>
                    <select
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleDepartmentChange}
                      required
                      disabled={!formData.institutionId || loadingDepartments}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220] disabled:opacity-60"
                    >
                      <option value="">
                        {!formData.institutionId
                          ? "Select institution first"
                          : loadingDepartments
                          ? "Loading departments..."
                          : "Select department"}
                      </option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name} ({dept.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Course */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Course / Program
                    </label>
                    <select
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleChange}
                      required
                      disabled={!formData.departmentId || loadingCourses}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220] disabled:opacity-60"
                    >
                      <option value="">
                        {!formData.departmentId
                          ? "Select department first"
                          : loadingCourses
                          ? "Loading courses..."
                          : "Select course"}
                      </option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Graduation Year */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Graduation year
                    </label>
                    <select
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220]"
                    >
                      <option value="">Select year</option>
                      {graduationYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Student ID */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Student ID / Roll No.
                      <span className="ml-1 text-xs text-slate-400">
                        Optional
                      </span>
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="Enter student ID or roll number"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220]"
                    />
                  </div>
                </div>
              </section>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-60"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? "Creating account..." : "Create student account"}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                Your academic relationships will be stored using verified master
                data identifiers rather than arbitrary institution names.
              </p>
            </form>
          ) : (
            /* OTP Verification Screen */
            <form onSubmit={handleVerification} className="mx-auto max-w-md space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  <CheckCircle2 size={28} />
                </div>

                <h2 className="text-xl font-semibold">Verify your account</h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter the 6-digit verification code sent to{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formData.email}
                  </span>
                  .
                </p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                autoFocus
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220]"
              />

              <button
                type="submit"
                disabled={verifying || otp.length !== 6}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {verifying && <Loader2 size={18} className="animate-spin" />}
                {verifying ? "Verifying..." : "Verify account"}
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || resending}
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-slate-400 dark:text-blue-400 dark:disabled:text-slate-600"
                >
                  <RefreshCw
                    size={14}
                    className={resending ? "animate-spin" : ""}
                  />
                  {resending
                    ? "Sending..."
                    : resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : "Resend code"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVerificationMode(false);
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  Back to registration
                </button>
              </div>
            </form>
          )}

          {!verificationMode && (
            <div className="mt-6 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Already have a student account?
              </p>

              <Link
                to="/auth/student/login"
                className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}