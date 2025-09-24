import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AuthRoute from "./routes/AuthRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user/*" element={<UserRoutes />} />
        <Route path="auth/*" element={<AuthRoute />} />
        <Route
          path="*"
          element={<h1 className="text-center mt-20 text-3xl text-white">404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}
