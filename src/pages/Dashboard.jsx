import React from "react";
import StatCard from "../components/StatCard";
import { useFetch } from "../hooks/useFetch";
import { userService } from "../services/api";
import Avatar from "../components/Avatar";
import Spinner from "../components/Spinner";

function UsersIcon({ className }) {
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
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function ChartIcon({ className }) {
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
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}
function GlobeIcon({ className }) {
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
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function ActivityIcon({ className }) {
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
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}

export default function Dashboard() {
  const { data: users, loading } = useFetch(userService.getAll);

  const stats = [
    {
      label: "Total Users",
      value: users?.length ?? "—",
      icon: UsersIcon,
      color: "brand",
      delta: 12,
    },
    {
      label: "Active Sessions",
      value: "48",
      icon: ActivityIcon,
      color: "blue",
      delta: 8,
    },
    {
      label: "Countries",
      value: "14",
      icon: GlobeIcon,
      color: "violet",
      delta: 3,
    },
    {
      label: "Engagements",
      value: "2.4K",
      icon: ChartIcon,
      color: "orange",
      delta: -2,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Here's what's happening with your users today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Users */}
      <div className="p-6 card">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-surface-900 dark:text-white">
              Recent Users
            </h2>
            <p className="text-xs text-surface-500 mt-0.5">
              Latest registered accounts
            </p>
          </div>
          <a
            href="/users"
            className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
          >
            View all →
          </a>
        </div>

        {loading ? (
          <Spinner className="py-8" />
        ) : (
          <div className="space-y-3">
            {(users || []).slice(0, 5).map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-3 p-3 transition-colors rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800"
              >
                <Avatar name={u.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-surface-900 dark:text-surface-100">
                    {u.name}
                  </p>
                  <p className="text-xs truncate text-surface-500 dark:text-surface-400">
                    {u.email}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-xs font-medium truncate text-surface-700 dark:text-surface-300">
                    {u.company?.name}
                  </p>
                  <p className="text-xs text-surface-400">{u.address?.city}</p>
                </div>
                <span className="badge bg-brand-50 dark:bg-brand-900/25 text-brand-700 dark:text-brand-400 shrink-0">
                  Active
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-6 text-white card bg-gradient-to-br from-brand-500 to-brand-600 border-brand-500">
          <h3 className="text-lg font-semibold">Add New User</h3>
          <p className="mt-1 mb-4 text-sm text-brand-100">
            Create accounts and manage team members.
          </p>
          <a
            href="/users"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors bg-white text-brand-700 rounded-xl hover:bg-brand-50"
          >
            Go to Users →
          </a>
        </div>
        <div className="p-6 card">
          <h3 className="font-semibold text-surface-900 dark:text-white">
            System Status
          </h3>
          <p className="mt-1 mb-4 text-sm text-surface-500">
            All systems operational.
          </p>
          <div className="space-y-2">
            {["API", "Database", "Auth Service"].map((s) => (
              <div
                key={s}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-surface-600 dark:text-surface-400">
                  {s}
                </span>
                <span className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                  Operational
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
