npm install tailwindcss @tailwindcss/vite
change vite config

```js
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
      "/profile": {
        target: "http://localhost:3002",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="./src/styles/index.css" rel="stylesheet" />         Add this
  <title>Vite + React</title>
</head>
```
