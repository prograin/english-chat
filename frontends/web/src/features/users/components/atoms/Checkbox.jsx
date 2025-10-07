import React from "react";

export default function Checkbox({ name, value, checked, onChange, label }) {
  return (
    <label className="flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className={`checkbox-glass ${checked ? "checkbox-glass-checked" : ""}`}>{label}</span>
    </label>
  );
}
