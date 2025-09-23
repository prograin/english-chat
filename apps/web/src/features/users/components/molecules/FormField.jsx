import React from "react";

export default function FormField({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="block text-primary font-medium mb-1">{label}</span>
      {children}
    </label>
  );
}
