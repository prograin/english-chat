import useTelegramAuth from "../../features/auth/hooks/useTelegramAuth";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  const { isLoggedIn } = useTelegramAuth();
  return isLoggedIn ? children : <Navigate to="/auth/telegram/login" replace />;
}
