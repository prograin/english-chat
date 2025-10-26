import express from "express";
import { createPresencesSchema } from "../schemas/presence.schema.js";
import { postPresenceController, deletePresenceByUserIdController } from "../controllers/presence.controller.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRole } from "../middlewares/allow-role.middleware.js";

export const userPresenceRouter = express.Router();

userPresenceRouter.use(authMiddleware, allowRole("admin"));

userPresenceRouter.post("/:userId/presence", validate(createPresencesSchema), postPresenceController);
userPresenceRouter.delete("/:userId/presence", deletePresenceByUserIdController);
