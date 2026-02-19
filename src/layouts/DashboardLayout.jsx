import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { clearSession, getUser } from "../utils/auth";
import { useDarkMode } from "../hooks/useDarkMode";
import Avatar from "../components/Avatar";

const APP_NAME = import.meta.env.VITE_APP_NAME || "UserFlow";

// SVG Icons
const Icons = {
  Dashboard: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-2a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z"
      />
    </svg>
  ),
  Users: () => (
    <svg
      className="w-5 h-5"
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
  ),
  Settings: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  Logout: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  ),
  Moon: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  ),
  Sun: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
      />
    </svg>
  ),
  Menu: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
  X: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  Bell: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
};

const navItems = [
  { to: "/dashboard", label: "Dashboard", Icon: Icons.Dashboard },
  { to: "/users", label: "Users", Icon: Icons.Users },
  { to: "/settings", label: "Settings", Icon: Icons.Settings },
];

function SidebarLink({ to, label, Icon, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
         ${
           isActive
             ? "bg-brand-50 dark:bg-brand-900/25 text-brand-700 dark:text-brand-400 font-medium"
             : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-100"
         }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={
              isActive
                ? "text-brand-600 dark:text-brand-400"
                : "text-surface-500 dark:text-surface-500 group-hover:text-surface-700 dark:group-hover:text-surface-300"
            }
          >
            <Icon />
          </span>
          {!collapsed && (
            <span className="text-sm whitespace-nowrap">{label}</span>
          )}
          {!collapsed && isActive && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />
          )}
        </>
      )}
    </NavLink>
  );
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebar] = useState(false);
  const [dark, setDark] = useDarkMode();
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`
        flex flex-col h-full bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800
        transition-all duration-300
        ${mobile ? "w-64" : sidebarOpen ? "w-60" : "w-[68px]"}
      `}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-2.5 px-4 h-16 border-b border-surface-200 dark:border-surface-800 shrink-0 ${!sidebarOpen && !mobile ? "justify-center" : ""}`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-500 shrink-0">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        {(sidebarOpen || mobile) && (
          <span className="font-semibold tracking-tight text-surface-900 dark:text-white">
            {APP_NAME}
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, Icon }) => (
          <SidebarLink
            key={to}
            to={to}
            label={label}
            Icon={Icon}
            collapsed={!sidebarOpen && !mobile}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 space-y-1 border-t border-surface-200 dark:border-surface-800">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${!sidebarOpen && !mobile ? "justify-center" : ""}`}
        >
          <Icons.Logout />
          {(sidebarOpen || mobile) && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 dark:bg-surface-950">
      {/* Desktop Sidebar */}
      <div className="flex-col flex-shrink-0 hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-surface-950/50 backdrop-blur-sm"
            onClick={() => setMobileSidebar(false)}
          />
          <div className="absolute top-0 left-0 z-50 h-full animate-slide-in">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <header className="flex items-center h-16 gap-4 px-4 bg-white border-b dark:bg-surface-900 border-surface-200 dark:border-surface-800 shrink-0">
          {/* Mobile menu toggle */}
          <button
            className="p-2 rounded-lg md:hidden btn-ghost"
            onClick={() => setMobileSidebar(true)}
          >
            <Icons.Menu />
          </button>
          {/* Desktop collapse toggle */}
          <button
            className="items-center justify-center hidden w-8 h-8 transition-colors rounded-lg md:flex hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500"
            onClick={() => setSidebarOpen((s) => !s)}
            title="Toggle sidebar"
          >
            <Icons.Menu />
          </button>

          <div className="flex-1" />

          {/* Dark mode */}
          <button
            onClick={() => setDark((d) => !d)}
            className="flex items-center justify-center transition-colors rounded-lg w-9 h-9 hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 dark:text-surface-400"
            title="Toggle dark mode"
          >
            {dark ? <Icons.Sun /> : <Icons.Moon />}
          </button>

          {/* Notifications */}
          <button className="relative flex items-center justify-center transition-colors rounded-lg w-9 h-9 hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 dark:text-surface-400">
            <Icons.Bell />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 border-2 border-white dark:border-surface-900" />
          </button>

          {/* User */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-surface-200 dark:border-surface-700">
            <Avatar name={user.name || user.email} size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-tight capitalize text-surface-800 dark:text-surface-200">
                {user.name || "Admin"}
              </p>
              <p className="text-xs leading-tight text-surface-400 dark:text-surface-500">
                {user.email}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 overflow-y-auto md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
