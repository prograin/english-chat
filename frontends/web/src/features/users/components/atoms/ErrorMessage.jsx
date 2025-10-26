import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div className="w-full max-w-md mx-auto my-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg shadow-sm">
      <p className="text-center text-lg font-medium">{message}</p>
    </div>
  );
}
