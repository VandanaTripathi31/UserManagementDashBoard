import React, { useState, useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import { userService } from "../services/api";
import Avatar from "../components/Avatar";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import AddUserForm from "../components/AddUserForm";
import Toast from "../components/Toast";
import Button from "../components/Button";

const PAGE_SIZE = 5;

function SearchIcon({ className }) {
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
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
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
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}

function RefreshIcon() {
  return (
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
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

export default function Users() {
  const { data: users, loading, error, refetch } = useFetch(userService.getAll);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    if (!users) return [];
    const q = debouncedSearch.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.company?.name?.toLowerCase().includes(q),
    );
  }, [users, debouncedSearch]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleAddSuccess() {
    setToast({ message: "User created successfully!", type: "success" });
    refetch();
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            Users
          </h1>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            {loading
              ? "Loading…"
              : `${filtered.length} user${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            className="flex items-center justify-center transition-colors border w-9 h-9 rounded-xl border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500"
            title="Refresh"
          >
            <RefreshIcon />
          </button>
          <Button onClick={() => setShowModal(true)}>
            <PlusIcon /> Add User
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
        <input
          type="search"
          placeholder="Search by name, email or company…"
          value={search}
          onChange={handleSearchChange}
          className="w-full pl-10 input-base"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden card">
        {loading ? (
          <Spinner className="py-16" size="lg" />
        ) : error ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-red-100 rounded-full dark:bg-red-900/30">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="font-medium text-surface-900 dark:text-white">
              Failed to load users
            </p>
            <p className="mt-1 mb-4 text-sm text-surface-500">{error}</p>
            <Button variant="secondary" onClick={refetch}>
              Try again
            </Button>
          </div>
        ) : paged.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-surface-100 dark:bg-surface-800">
              <svg
                className="w-6 h-6 text-surface-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <p className="font-medium text-surface-900 dark:text-white">
              No users found
            </p>
            <p className="mt-1 text-sm text-surface-500">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-200 dark:border-surface-800">
                    {["User", "Email", "Phone", "Company", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider px-5 py-3.5"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                  {paged.map((u) => (
                    <tr
                      key={u.id}
                      className="transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/50 group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} />
                          <div>
                            <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                              {u.name}
                            </p>
                            <p className="font-mono text-xs text-surface-400">
                              #{u.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <a
                          href={`mailto:${u.email}`}
                          className="text-sm transition-colors text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400"
                        >
                          {u.email}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-sm text-surface-600 dark:text-surface-400">
                          {u.phone}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                          {u.company?.name}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="badge bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y md:hidden divide-surface-100 dark:divide-surface-800">
              {paged.map((u) => (
                <div
                  key={u.id}
                  className="p-4 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/50"
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={u.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold truncate text-surface-900 dark:text-surface-100">
                          {u.name}
                        </p>
                        <span className="badge bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 shrink-0">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5 truncate">
                        {u.email}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-surface-500 dark:text-surface-400">
                        <span>{u.phone}</span>
                        <span className="text-surface-300">·</span>
                        <span>{u.company?.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center justify-between gap-3 px-5 py-4 border-t border-surface-100 dark:border-surface-800 sm:flex-row">
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Showing {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length}
              </p>
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </div>
          </>
        )}
      </div>

      <AddUserForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleAddSuccess}
      />

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
