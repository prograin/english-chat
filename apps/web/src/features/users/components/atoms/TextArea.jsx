import React from "react";

export default function TextArea({ value, onChange, name, className = "" }) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`
        w-full 
        px-3 py-2 
        border border-gray-300 
        rounded-md 
        shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-primary
        bg-surface 
        text-primary
        placeholder:text-secondary
        ${className}
      `}
    />
  );
}
