import React from "react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  color = "brand",
}) {
  const colors = {
    brand:
      "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    violet:
      "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
    orange:
      "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  };

  return (
    <div className="p-5 transition-shadow duration-300 card hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium tracking-wider uppercase text-surface-500 dark:text-surface-400">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-surface-900 dark:text-white">
            {value}
          </p>
          {delta !== undefined && (
            <p
              className={`mt-1 text-xs font-medium ${delta >= 0 ? "text-brand-600" : "text-red-500"}`}
            >
              {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)}% vs last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${colors[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
