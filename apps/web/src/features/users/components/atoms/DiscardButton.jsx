import React from "react";

export default function DiscardButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        px-4 py-2 
        bg-surface 
        text-secondary 
        rounded 
        hover:bg-gray-300 
        disabled:bg-gray-200 
        disabled:text-gray-400
        transition-colors
      "
    >
      Discard
    </button>
  );
}
