import React from "react";

export default function Input({
  label,
  id,
  error,
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-surface-700 dark:text-surface-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-surface-400" />
          </div>
        )}
        <input
          id={id}
          className={`input-base ${Icon ? "pl-10" : ""} ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/30"
              : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
