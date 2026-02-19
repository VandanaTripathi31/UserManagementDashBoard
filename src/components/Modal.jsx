import React, { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-surface-950/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${sizes[size]} card shadow-2xl animate-slide-up p-6`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 hover:text-surface-700 dark:hover:text-surface-200"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
