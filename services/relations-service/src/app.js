import express, { json } from "express";
import { errorHandler } from "./handlers/error.handler.js";
import meBlocksRouter from "./routes/blocks/me.blocks.router.js";
import usersBlocksRouter from "./routes/blocks/users.blocks.router.js";
import meContactsRouter from "./routes/contacts/me.contacts.router.js";
import usersContactsRouter from "./routes/contacts/users.contacts.router.js";
const app = express();

app.use(express.json());

app.use("/relations/blocks", meBlocksRouter);
app.use("/users/:userId/relations/blocks", usersBlocksRouter);
app.use("/relations/contacts", meContactsRouter);
app.use("/users/:userId/relations/contacts", usersContactsRouter);
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
