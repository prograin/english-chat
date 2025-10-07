import React from "react";

export default function FormField({ label, children }) {
  return (
    <label className="block font-sans">
      <span className="block text-[var(--text-primary)] font-medium mb-sm">{label}</span>
      <div className="text-[var(--text-primary)]">{children}</div>
    </label>
  );
}
