import React from "react";

export default function SaveButton({ onClick, disabled, saving, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-sm py-xs
        rounded
        bg-primary 
        text-white
        hover:bg-primary/90
        disabled:bg-surface/50 
        disabled:text-[var(--text-secondary)]/50
        transition-colors 
        duration-200
        font-sans text-sm
        ${className}
      `}
    >
      {saving ? "Saving..." : "Save"}
    </button>
  );
}
