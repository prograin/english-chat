import React from "react";

export default function Checkbox({ name, value, checked, onChange, label }) {
  return (
    <label className="inline-flex items-center space-x-2">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
      />
      <span className="text-primary">{label}</span>
    </label>
  );
}
