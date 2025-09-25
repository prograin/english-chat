import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen flex-col text-[var(--text-primary)] bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
      <Header />
      <main className="flex-1 flex justify-center items-center w-full px-md py-md">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
