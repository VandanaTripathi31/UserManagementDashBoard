import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-surface-50 dark:bg-surface-950">
      <div className="max-w-md text-center animate-fade-in">
        <div className="font-mono font-bold text-8xl text-surface-200 dark:text-surface-800">
          404
        </div>
        <h1 className="mt-4 text-2xl font-bold text-surface-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/dashboard" className="inline-flex mt-6 btn-primary">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
