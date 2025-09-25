import React from "react";

export default function Loader({ message = "Loading..." }) {
  return (
    <p className="text-center text-[var(--text-secondary)] mt-xl text-lg font-sans">{message}</p>
  );
}
