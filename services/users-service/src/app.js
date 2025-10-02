import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import adminRouter from "./routes/admin.router.js";
import { selfProfileRouter } from "./routes/profile.router.js";
import { errorHandler } from "./handlers/error.handler.js";

dotenv.config({ path: ".users.env" });

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/profile", selfProfileRouter);
app.use("/admin", adminRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

export default app;
