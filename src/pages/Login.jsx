import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSession, validateEmail, validateRequired } from "../utils/auth";
import Input from "../components/Input";
import Button from "../components/Button";

const APP_NAME = import.meta.env.VITE_APP_NAME || "UserFlow";

function MailIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  function validate() {
    const errs = {};
    if (!validateRequired(form.email)) errs.email = "Email is required";
    else if (!validateEmail(form.email))
      errs.email = "Enter a valid email address";
    if (!validateRequired(form.password))
      errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate latency
    saveSession(form.email);
    navigate("/dashboard");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="relative flex-col items-center justify-center hidden p-16 overflow-hidden lg:flex lg:w-1/2 bg-surface-900 dark:bg-surface-950">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 blur-3xl" />
          <div className="absolute w-64 h-64 rounded-full bottom-1/4 right-1/4 bg-violet-500/10 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-8 shadow-lg rounded-2xl bg-brand-500 shadow-brand-500/30">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
            {APP_NAME}
          </h1>
          <p className="text-lg leading-relaxed text-surface-400">
            A modern platform to manage your team, track users, and keep
            everything organized.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-12 text-center">
            {[
              ["10K+", "Users managed"],
              ["99.9%", "Uptime SLA"],
              ["4.9★", "User rating"],
            ].map(([val, lbl]) => (
              <div key={lbl} className="p-4 bg-white/5 rounded-xl">
                <p className="text-xl font-bold text-white">{val}</p>
                <p className="mt-1 text-xs text-surface-500">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center flex-1 p-6 bg-surface-50 dark:bg-surface-950">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-500">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-surface-900 dark:text-white">
              {APP_NAME}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-surface-500 dark:text-surface-400">
              Sign in to access your dashboard
            </p>
          </div>

          <div className="p-8 shadow-sm card">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <Input
                label="Email address"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                icon={MailIcon}
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-surface-700 dark:text-surface-300"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LockIcon className="w-4 h-4 text-surface-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className={`input-base pl-10 pr-10 ${errors.password ? "border-red-400 focus:border-red-400 focus:ring-red-400/30" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                  >
                    {showPwd ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1 text-xs text-red-500">
                    <span>⚠</span> {errors.password}
                  </p>
                )}
              </div>

              <Button type="submit" loading={loading} className="w-full mt-2">
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <div className="p-3 mt-5 border rounded-xl bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700">
              <p className="text-xs text-center text-surface-500 dark:text-surface-400">
                Demo: use{" "}
                <span className="font-mono font-medium text-brand-600 dark:text-brand-400">
                  any@email.com
                </span>{" "}
                and any 6+ char password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
