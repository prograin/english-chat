import express from "express";
import { adminPresenceRouter } from "./routes/presence.route.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();
app.use(express.json());
app.use("/admin", adminPresenceRouter);
app.use(errorHandler);

export default app;
