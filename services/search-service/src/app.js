import express from "express";
import docRouter from "./routes/documents.router.js";

const app = express();

app.use(express.json());
app.use("/es/documents", docRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

export default app;
