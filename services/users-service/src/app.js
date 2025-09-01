import express from "express";
import dotenv from "dotenv";
import routerUser from "./routes/users.router.js";
import { errorHandler } from "./middlewares/error.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", routerUser);
app.use(errorHandler);

export default app;
