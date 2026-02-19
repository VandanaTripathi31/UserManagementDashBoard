import React, { useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { getUser } from "../utils/auth";
import Button from "../components/Button";
import Toast from "../components/Toast";

function Section({ title, description, children }) {
  return (
    <div className="p-6 card">
      <div className="pb-4 mb-5 border-b border-surface-100 dark:border-surface-800">
        <h2 className="font-semibold text-surface-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-surface-500 mt-0.5">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
          {label}
        </p>
        {description && (
          <p className="text-xs text-surface-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${checked ? "bg-brand-500" : "bg-surface-300 dark:bg-surface-700"}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const user = getUser();
  const [dark, setDark] = useDarkMode();
  const [toast, setToast] = useState(null);
  const [notifs, setNotifs] = useState({
    email: true,
    push: false,
    weekly: true,
  });

  function handleSave() {
    setToast({ message: "Settings saved successfully!", type: "success" });
  }

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          Manage your account preferences
        </p>
      </div>

      <Section title="Profile" description="Your account information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
              Display Name
            </label>
            <input
              defaultValue={user.name || "Admin"}
              className="capitalize input-base"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
              Email
            </label>
            <input
              defaultValue={user.email || ""}
              type="email"
              className="input-base"
            />
          </div>
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </Section>

      <Section title="Appearance" description="Customize the visual experience">
        <Toggle
          label="Dark Mode"
          description="Use a dark color scheme across the app"
          checked={dark}
          onChange={setDark}
        />
      </Section>

      <Section
        title="Notifications"
        description="Choose what updates you receive"
      >
        <Toggle
          label="Email Notifications"
          description="Receive updates via email"
          checked={notifs.email}
          onChange={(v) => setNotifs((n) => ({ ...n, email: v }))}
        />
        <Toggle
          label="Push Notifications"
          description="Browser push alerts for important events"
          checked={notifs.push}
          onChange={(v) => setNotifs((n) => ({ ...n, push: v }))}
        />
        <Toggle
          label="Weekly Summary"
          description="Get a weekly digest every Monday"
          checked={notifs.weekly}
          onChange={(v) => setNotifs((n) => ({ ...n, weekly: v }))}
        />
        <Button onClick={handleSave}>Save Preferences</Button>
      </Section>

      <Section title="Danger Zone" description="Irreversible actions">
        <div className="flex items-center justify-between p-4 border border-red-200 rounded-xl dark:border-red-800 bg-red-50 dark:bg-red-900/10">
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              Delete Account
            </p>
            <p className="text-xs text-red-500 dark:text-red-500 mt-0.5">
              Permanently remove your data
            </p>
          </div>
          <Button
            variant="danger"
            onClick={() =>
              setToast({
                message: "Feature not available in demo",
                type: "info",
              })
            }
          >
            Delete
          </Button>
        </div>
      </Section>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
