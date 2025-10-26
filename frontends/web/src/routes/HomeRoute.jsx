// src/app/routes/AuthRoute.jsx
import { Route, Routes } from "react-router-dom";
import MainHomePage from "../features/home/pages/Main";

export default function AuthRoute() {
  return (
    <Routes>
      <Route index element={<MainHomePage />} />
    </Routes>
  );
}
