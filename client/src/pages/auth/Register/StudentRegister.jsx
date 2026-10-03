import { useState } from "react";
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
} from "lucide-react";

import ThemeToggle from "../../../components/common/ThemeToggle";

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    /*
      Backend registration will be connected here.

      Important:
      universityId
      institutionId
      courseId
      departmentId

      will eventually come from controlled master-data APIs.
    */

    setVerificationMode(true);
  };

  const handleVerification = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return;
    }

    // Backend OTP verification will be connected here.
    navigate("/student/dashboard");
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

            <span className="text-xl font-semibold">
              NEXORA
            </span>
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

          {!verificationMode ? (
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Basic Information */}
              <section>
                <div className="mb-5">
                  <h2 className="text-lg font-semibold">
                    Basic information
                  </h2>

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
                      Email
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
                        required
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
                        minLength={8}
                        placeholder="Minimum 8 characters"
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
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
                  <h2 className="text-lg font-semibold">
                    Academic information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Select your academic relationships from controlled data.
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
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220]"
                    >
                      <option value="">Select university</option>
                      <option value="demo-university">
                        Select after master data is connected
                      </option>
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
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220]"
                    >
                      <option value="">Select institution</option>
                      <option value="demo-institution">
                        Select after master data is connected
                      </option>
                    </select>
                  </div>

                  {/* Course */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Course
                    </label>

                    <select
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220]"
                    >
                      <option value="">Select course</option>
                      <option value="demo-course">
                        Select after master data is connected
                      </option>
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
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220]"
                    >
                      <option value="">Select department</option>
                      <option value="demo-department">
                        Select after master data is connected
                      </option>
                    </select>
                  </div>

                  {/* Graduation */}
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
                      placeholder="Enter student ID"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220]"
                    />
                  </div>
                </div>
              </section>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                Create student account
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                Your academic relationships will be stored using controlled
                identifiers rather than arbitrary institution names.
              </p>
            </form>
          ) : (
            /* OTP */
            <form
              onSubmit={handleVerification}
              className="mx-auto max-w-md space-y-6"
            >
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  <CheckCircle2 size={28} />
                </div>

                <h2 className="text-xl font-semibold">
                  Verify your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter the 6-digit verification code sent to your registered
                  email or mobile number.
                </p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                placeholder="000000"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-center text-xl tracking-[0.5em] outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-[#0B1220]"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Verify account
              </button>

              <button
                type="button"
                onClick={() => setVerificationMode(false)}
                className="w-full text-sm font-medium text-slate-500 hover:text-blue-600"
              >
                Back to registration
              </button>
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