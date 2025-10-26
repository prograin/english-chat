import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AuthRoute from "./routes/AuthRoute";
import HomeRoutes from "./routes/HomeRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user/*" element={<UserRoutes />} />
        <Route path="auth/*" element={<AuthRoute />} />
        <Route path="/*" element={<HomeRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
