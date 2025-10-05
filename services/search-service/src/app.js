import express from "express";
import { topLevelUsersRouter, documentsUsersRouter } from "./routes/users.router.js";
import { errorHandler } from "./handlers/error.handler.js";

const app = express();

app.use(express.json());
app.use("/documents/users", documentsUsersRouter);
app.use("/users", topLevelUsersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

export default app;
