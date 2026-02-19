import React from "react";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="flex items-center justify-center w-8 h-8 transition-colors border rounded-lg border-surface-200 dark:border-surface-700 disabled:opacity-40 hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? "bg-brand-500 text-white shadow-sm"
              : "border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center justify-center w-8 h-8 transition-colors border rounded-lg border-surface-200 dark:border-surface-700 disabled:opacity-40 hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
