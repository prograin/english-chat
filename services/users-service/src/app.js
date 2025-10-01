import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import adminRouter from "./routes/admin.route.js";
import profileRouter from "./routes/profile.route.js";
import { errorHandler } from "./handlers/error.handler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

export default app;
