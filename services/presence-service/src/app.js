import express from "express";
import presenceRoute from "./routes/presence.route.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();
app.use(express.json());
app.use("/presence", presenceRoute);
app.use(errorHandler);

export default app;
