import React from "react";

export default function Input({ value, onChange, name, type = "text", className = "" }) {
  return <input name={name} type={type} value={value} onChange={onChange} className={className} />;
}
