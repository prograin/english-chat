import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/user.router.js";
import { topProfilesRouter } from "./routes/profile.router.js";

import { errorHandler } from "./handlers/error.handler.js";

dotenv.config({ path: ".users.env" });

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/profiles", topProfilesRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

export default app;
