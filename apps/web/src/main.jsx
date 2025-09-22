import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";

localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMSwidGVsZWdyYW1faWQiOiIxMjIxOTUxODM5IiwiaWF0IjoxNzU4NTM2MTc1LCJleHAiOjE3NjExMjgxNzV9.BA29n9n1GldOWhwdQw6UpWSB9jzC1hVWyn3YTIz-Lxg"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
