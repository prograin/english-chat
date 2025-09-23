import React from "react";

export default function SaveButton({ onClick, disabled, saving }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 
        bg-primary 
        text-white 
        rounded 
        hover:bg-primary/90 
        disabled:bg-gray-300 
        disabled:text-gray-400
        transition-colors
      `}
    >
      {saving ? "Saving..." : "Save"}
    </button>
  );
}
