import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users.router.js";
import { errorHandler } from "./middlewares/error.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use(errorHandler);

export default app;
