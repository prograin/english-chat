import React from "react";

export default function Select({ name, value, onChange, options, className = "" }) {
  return (
    <select name={name} value={value} onChange={onChange} className={className}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
