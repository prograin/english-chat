// molecules/FieldRow.jsx
import React from "react";

export default function FieldRow({ children, className = "" }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-sm ${className}`}>
      {React.Children.map(children, (child) => (
        <div className="flex-1">{child}</div>
      ))}
    </div>
  );
}
