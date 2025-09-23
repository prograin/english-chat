import { useAuthContext } from "../context/AuthContext";

export default function useTelegramAuth() {
  const { user, token } = useAuthContext();
  return {
    isLoggedIn: Boolean(token),
    user,
    token,
  };
}
