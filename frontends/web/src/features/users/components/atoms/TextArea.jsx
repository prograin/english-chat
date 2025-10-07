import React from "react";

export default function TextArea({ value, onChange, name, className = "" }) {
  return <textarea name={name} value={value} onChange={onChange} className="input-glass" />;
}
