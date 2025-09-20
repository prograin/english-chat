import express from "express";
import authRouter from "./routes/auth.routes";
import errorHandler from "./handlers/error.handler";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use(errorHandler);

export default app;
