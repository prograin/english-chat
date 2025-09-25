import React from "react";

export default function ModernHeader() {
  return (
    <header
      className="w-full py-4 px-6 flex justify-center items-center 
                   bg-background/20 backdrop-blur-md border border-white/20 
                   shadow-medium transition-all duration-500 hover:shadow-heavy hover:-translate-y-1"
    >
      <h1
        className="text-3xl font-extrabold text-[var(--text-accent)] tracking-widest font-sans 
               transition-transform duration-300 hover:scale-105 hover:text-secondary"
      >
        MyApp
      </h1>
    </header>
  );
}
