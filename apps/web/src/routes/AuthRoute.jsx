// src/app/routes/AuthRoute.jsx
import { Route, Routes } from "react-router-dom";
import LoginLanding from "../features/auth/pages/LoginLanding";

function AuthRoute() {
  return (
    <Routes>
      <Route path="telegram/login" element={<LoginLanding />} />
    </Routes>
  );
}

export default AuthRoute;
