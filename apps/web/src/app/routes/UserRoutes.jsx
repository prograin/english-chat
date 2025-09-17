// src/app/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import HomePage from "../../features/home/pages/HomePage";
import AboutPage from "../../features/home/pages/AboutPage";
import UserRoutes from "./UserRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* User feature routes */}
      <UserRoutes />

      {/* 404 fallback */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}
