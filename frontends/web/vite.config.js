import dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: ["heychat.info", "localhost", "127.0.0.1"],
    proxy: {
      "/auth": {
        target: `http://${process.env.API_URL}:3003`,
        changeOrigin: true,
        secure: false,
      },
      "/profiles": {
        target: `http://${process.env.API_URL}:3004`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
