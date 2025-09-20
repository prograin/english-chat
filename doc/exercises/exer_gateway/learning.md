# 1️⃣ What Is a Gateway?

### Think of a gateway (often “API Gateway”) as the single front door to all your microservices.

```js
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// --- Middlewares for cross-cutting concerns ---
app.use(express.json());

// Example: simple auth check
app.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (!token || token !== `Bearer ${process.env.API_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// --- Routing to services ---
app.use(
  "/users",
  createProxyMiddleware({
    target: "http://localhost:5001", // user service
    changeOrigin: true,
    pathRewrite: { "^/users": "" },
  })
);

app.use(
  "/orders",
  createProxyMiddleware({
    target: "http://localhost:5002", // order service
    changeOrigin: true,
    pathRewrite: { "^/orders": "" },
  })
);

app.listen(4000, () => console.log("Gateway running on http://localhost:4000"));
```

| Responsibility                      | Example                                                |
| ----------------------------------- | ------------------------------------------------------ |
| **Routing**                         | `/users/*` → User service, `/orders/*` → Order service |
| **Authentication/Authorization**    | Validate JWT or API key before passing request         |
| **Rate limiting / Throttling**      | e.g. 100 requests per minute per user                  |
| **Request/Response Transformation** | Add headers, strip fields, convert formats             |
| **Load Balancing / Failover**       | Distribute requests among many instances of a service  |
| **Aggregation**                     | Combine multiple service responses into one payload    |
| **Monitoring & Logging**            | Centralized request metrics, tracing                   |
