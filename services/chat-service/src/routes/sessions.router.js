import express from "express";
import { createSessionSchema, updateSessionSchema } from "../schemas/sessions.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRole } from "../middlewares/allow-role.middleware.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import {
  createSessionController,
  getSessionByTargetController,
  getSessionsController,
  updateSessionController,
} from "../controllers/sessions.controller.js";

export const topLevelSessionsRouter = express.Router();
export const usersSessionsRouter = express.Router();

topLevelSessionsRouter.post("/me", authMiddleware, allowRole("admin", "user"), validateMiddleware(createSessionSchema), createSessionController);
topLevelSessionsRouter.get("/target/:targetId", authMiddleware, allowRole("admin", "user"), getSessionByTargetController);
topLevelSessionsRouter.get("/me", authMiddleware, allowRole("admin", "user"), getSessionsController);
topLevelSessionsRouter.put("/me", authMiddleware, allowRole("admin", "user"), validateMiddleware(updateSessionSchema), updateSessionController);

usersSessionsRouter.get("/", authMiddleware, allowRole("admin"), getSessionsController);
