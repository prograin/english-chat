import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["silver-ducks-smoke.loca.lt"],
    proxy: {
      "/auth": {
        target: "http://localhost:3003",
        changeOrigin: true,
        secure: false,
      },
      "/profile": {
        target: "http://localhost:3002",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
