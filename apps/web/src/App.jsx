import UserRoutes from "./app/routes/UserRoutes";
import AuthRoute from "./app/routes/AuthRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user/*" element={<UserRoutes />} />
        <Route path="auth/*" element={<AuthRoute />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
