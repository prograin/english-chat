we make vite port public and make domain with

1-npx localtunnel --port 5173

In vite.config.ts
2-server:{allowhost: ["tame-melons-cover.loca.lt"]}

| Header / Concept         | Example Value                                                             | Purpose / Meaning                                                    | Who Checks It           | Effect / Notes                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Host**                 | `localhost:3002`                                                          | Specifies which server/domain the request is intended for            | Backend server          | If wrong (e.g., `localhost:5173`), backend may reject request or route incorrectly. `changeOrigin: true` rewrites this to match the target. |
| **Origin**               | `http://localhost:5173`                                                   | Specifies where the request originated from (scheme + domain + port) | Browser & server (CORS) | Used for cross-origin requests. Browser blocks requests if server doesn’t allow this origin. Not modified by `changeOrigin`.                |
| **CORS**                 | Server responds with `Access-Control-Allow-Origin: http://localhost:5173` | Lets browser know cross-origin request is allowed                    | Browser                 | If missing or mismatched, browser blocks JS from reading the response.                                                                      |
| **Without changeOrigin** | `Host: localhost:5173`, `Origin: http://localhost:5173`                   | Host header remains as dev server                                    | Backend may reject      | Backend sees unexpected host; may fail if it enforces virtual host rules                                                                    |
| **With changeOrigin**    | `Host: localhost:3002`, `Origin: http://localhost:5173`                   | Host header rewritten to target                                      | Backend accepts request | Backend sees expected host, request succeeds. Origin still tells browser where it came from                                                 |
