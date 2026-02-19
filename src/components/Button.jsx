import React from "react";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger:
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-sm transition-all duration-200",
  ghost:
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 text-sm font-medium transition-all duration-200",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`${variants[variant]} ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-0.5 w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
