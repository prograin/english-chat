import React from "react";
import Checkbox from "../atoms/Checkbox";

export default function CheckboxGroup({ label, name, value = [], options, onChange }) {
  const handleChange = (e) => {
    const { checked, value: option } = e.target;
    let newValue = [...value];
    if (checked) newValue.push(option);
    else newValue = newValue.filter((v) => v !== option);
    onChange({ target: { name, value: newValue } });
  };

  return (
    <fieldset className="mb-4">
      <legend className="block text-primary font-medium mb-1">{label}:</legend>
      <div className="flex flex-wrap gap-3 mt-1">
        {options.map((opt) => (
          <Checkbox
            key={opt}
            name={name}
            value={opt}
            checked={value.includes(opt)}
            onChange={handleChange}
            label={opt}
          />
        ))}
      </div>
    </fieldset>
  );
}
