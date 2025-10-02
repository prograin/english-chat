import express from "express";
import { createPresencesSchema } from "../schemas/presence.schema.js";
import { postPresenceController, deletePresenceByUserIdController } from "../controllers/presence.controller.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRole } from "../../../users-service/src/middlewares/allow-role.middleware.js";

export const adminPresenceRouter = express.Router();

adminPresenceRouter.use(authMiddleware, allowRole("admin"));

adminPresenceRouter.post("/user/:userId/presence", validate(createPresencesSchema), postPresenceController);
adminPresenceRouter.delete("/user/:userId/presence", deletePresenceByUserIdController);
