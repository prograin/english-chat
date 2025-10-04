import express from "express";
import { userPresenceRouter } from "./routes/presence.route.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();
app.use(express.json());
app.use("/users", userPresenceRouter);
app.use(errorHandler);

export default app;
