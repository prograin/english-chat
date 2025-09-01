import express from "express";
import dotenv from "dotenv";
import routerUser from "./routes/users.router.js";
import routerUsersTelegram from "./routes/users-telegram.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", routerUser);

export default app;
