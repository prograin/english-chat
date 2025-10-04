import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["silver-ducks-smoke.loca.lt"],
    proxy: {
      "/auth": {
        target: "http://localhost:3003",
        changeOrigin: true,
        secure: false,
      },
      "/profiles": {
        target: "http://localhost:3004",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
