import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";

import "./shared/styles/index.css";
import "./shared/styles/variables.css";
import "./shared/styles/theme.css";
import "./shared/styles/animations.css";

// localStorage.setItem("token", import.meta.env.VITE_USER_TEST_TOKEN);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
