import React from "react";

export default function DiscardButton({ onClick, disabled, className }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={className}>
      Discard
    </button>
  );
}
