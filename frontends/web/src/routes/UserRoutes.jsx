// src/app/routes/UserRoute.jsx
import { Routes, Route } from "react-router-dom";

import ProfileEditPage from "../features/users/pages/ProfileEditPage";
import UserLayout from "../features/users/layouts/UserLayout";
import AuthGuard from "../shared/components/AuthGuard";

function UserRoutes() {
  return (
    <Routes>
      <Route
        element={
          <AuthGuard>
            <UserLayout />
          </AuthGuard>
        }
      >
        <Route path="profile" element={<ProfileEditPage />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
