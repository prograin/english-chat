import React from "react";
import Checkbox from "../atoms/Checkbox";

export default function CheckboxGroup({ label, name, value = [], options, onChange }) {
  return (
    <div className="mb-md w-full">
      {/* Group label */}
      <div className="text-text-primary font-medium mb-sm font-sans">{label}</div>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-sm mt-xs">
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            name={name}
            value={opt.value}
            checked={value.includes(opt.value)}
            onChange={onChange}
            label={opt.label}
          />
        ))}
      </div>
    </div>
  );
}
