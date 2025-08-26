import express from "express";
import dotenv from "dotenv";
import routerUser from "./routes/users.router.js";
import routerUsersTelegram from "./routes/users-telegram.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", routerUser);
app.use("/users-telegram", routerUsersTelegram);

export default app;
