import React from "react";

export default function FormField({ label, children }) {
  return (
    <label className="block font-sans">
      <span className="block text-text-primary font-medium mb-sm">{label}</span>
      <div className="text-text-primary">{children}</div>
    </label>
  );
}
