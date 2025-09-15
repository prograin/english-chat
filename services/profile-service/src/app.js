import express from "express";
import profileRouter from "./routes/profile.route.js";
import { errorHandler } from "./handlers/error.handler.js";

const app = express();

app.use(express.json());
app.use("/profile", profileRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

export default app;
