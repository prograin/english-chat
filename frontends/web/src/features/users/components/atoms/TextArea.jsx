import React from "react";

export default function TextArea({ value, onChange, name, className = "", limit = 500 }) {
  const handleChange = (e) => {
    let val = e.target.value;
    if (limit && val.length > limit) val = val.slice(0, limit);
    onChange({ target: { name, value: val, type: e.target.type } });
  };

  return (
    <div className="textarea-wrapper">
      <textarea name={name} value={value} onChange={handleChange} className={`input-glass ${className}`} />
      {limit && (
        <div className="text-sm text-right right-2 bottom-1" style={{ color: "var(--color-text)", opacity: 0.5 }}>
          {value.length}/{limit} characters
        </div>
      )}
    </div>
  );
}
