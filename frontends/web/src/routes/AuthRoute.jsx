// src/app/routes/AuthRoute.jsx
import { Route, Routes } from "react-router-dom";
import LoginLanding from "../features/auth/pages/LoginLanding";

function AuthRoute() {
  return (
    <Routes>
      <Route path="telegram/login" element={<LoginLanding />} />
      <Route index element={<h1 className="text-center mt-20 text-3xl text-white">404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default AuthRoute;
