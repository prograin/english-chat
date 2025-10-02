import express from "express";
import usersRouter from "./routes/users.router.js";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

export default app;
