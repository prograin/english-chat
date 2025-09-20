// src/app/routes/UserRoute.jsx
import { Routes, Route } from "react-router-dom";

import ProfileEditPage from "../../features/users/pages/ProfileEditPage";
import AuthGuard from "../../shared/components/AuthGuard";

function UserRoutes() {
  return (
    <Routes>
      <Route
        path="profile"
        element={
          <AuthGuard>
            <ProfileEditPage />
          </AuthGuard>
        }
      />
    </Routes>
  );
}

export default UserRoutes;
