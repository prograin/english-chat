import React from "react";

export default function Input({ value, onChange, name, type = "text", className = "" }) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`
        w-full 
        px-3 py-2 
        border border-gray-300 
        rounded-md 
        shadow-sm 
        focus:outline-none 
        focus:ring-2 focus:ring-primary 
        bg-surface 
        text-primary
        placeholder:text-secondary
        ${className}
      `}
    />
  );
}
