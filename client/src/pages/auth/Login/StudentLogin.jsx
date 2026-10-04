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
  ShieldCheck,
} from "lucide-react";


import ThemeToggle from "../../../components/common/ThemeToggle";

export default function StudentLogin() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      return;
    }

    /*
      Backend authentication will be connected here.

      Expected flow:

      Email/Mobile
          ↓
      Password
          ↓
      OTP
          ↓
      Student Dashboard
    */

    setOtpMode(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
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
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <ThemeToggle />
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-lg font-bold text-white">
              N
            </div>

            <span className="text-xl font-semibold tracking-tight">
              NEXORA
            </span>
          </Link>

          <Link
            to="/auth/role-selection"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <ArrowLeft size={17} />
            Change role
          </Link>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <GraduationCap size={28} strokeWidth={1.8} />
            </div>

            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              Student workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Sign in to manage your skills, opportunities and applications.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-[#111C2E] sm:p-8">

            {!otpMode ? (
              <form onSubmit={handleLogin} className="space-y-5">

                {/* Email / Mobile */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email or mobile number
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="you@example.com or mobile number"
                      className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white dark:placeholder:text-slate-500"
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white dark:placeholder:text-slate-500"
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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
                  className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">

                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-500/10">
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        Verification required
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                        Enter the 6-digit verification code sent to your
                        registered contact.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Verification code
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter 6-digit code"
                      className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm tracking-[0.3em] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0B1220] dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Verify & Continue
                </button>

                <button
                  type="button"
                  onClick={() => setOtpMode(false)}
                  className="w-full text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Back to login
                </button>
              </form>
            )}

            {/* Register */}
            {!otpMode && (
              <div className="mt-6 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Don't have a student account?
                </p>

                <Link
                  to="/auth/student/register"
                  className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Create student account
                </Link>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            NEXORA · Connecting Talent and Skills, Academia & Industry
          </p>
        </div>
      </main>
    </div>
  );
}