import express from "express";
import { topLevelRequestsRouter } from "./routes/requests.router.js";
import { topLevelSessionsRouter } from "./routes/sessions.router.js";
import { errorHandler } from "./handlers/error.handler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/chat/requests", topLevelRequestsRouter);
app.use("/chat/sessions", topLevelSessionsRouter);
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
