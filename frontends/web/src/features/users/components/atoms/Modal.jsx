// components/atoms/Modal.jsx
import React from "react";

export default function Modal({ open, onClose, message, type }) {
  if (!open) return null;

  // Theme-based colors
  const titleColor = type === "error" ? "text-[var(--color-error)]" : "text-[var(--color-success)]";
  const borderColor = type === "error" ? "border-[var(--color-error)]" : "border-[var(--color-success)]";
  const bgColor = type === "error" ? "bg-[var(--color-error)]/10" : "bg-[var(--color-success)]/10";
  const textColor = type === "error" ? "text-[var(--color-error)]" : "text-[var(--color-success)]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Circular Modal */}
      <div
        className={`relative w-80 h-80 ${bgColor} border-2 ${borderColor} rounded-full 
                   flex flex-col items-center justify-center backdrop-blur-md shadow-[var(--color-shadow-medium)] 
                   modal-pop-in`}
      >
        {/* Title */}
        <h2 className={`text-2xl font-bold mb-2 font-sans ${titleColor} text-center`}>{type === "error" ? "Error" : "Success"}</h2>

        {/* Message */}
        <p className={`mb-4 px-6 text-center text-lg font-medium ${textColor} leading-relaxed`}>{message}</p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`w-20 h-12 flex items-center justify-center rounded-full 
                     bg-white/20 backdrop-blur-md border-2 ${borderColor} 
                     text-[var(--color-text-primary)] font-semibold shadow-md 
                     hover:bg-white/30 hover:scale-105 transition-all duration-300 button-pulse`}
        >
          Close
        </button>
      </div>
    </div>
  );
}
