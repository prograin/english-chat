import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users.router.js";
import profileRouter from "./routes/profile.route.js";
import { errorHandler } from "./handlers/error.handler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/profile", profileRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

export default app;
