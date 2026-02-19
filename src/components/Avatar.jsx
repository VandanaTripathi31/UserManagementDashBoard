import React from "react";

const COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-cyan-500",
  "bg-teal-500",
  "bg-brand-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-rose-500",
];

function getColor(name = "") {
  let hash = 0;
  for (let c of name) hash = (hash * 31 + c.charCodeAt(0)) % COLORS.length;
  return COLORS[hash];
}

export default function Avatar({ name = "", size = "md" }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
  const color = getColor(name);
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div
      className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}
    >
      {initials || "?"}
    </div>
  );
}
