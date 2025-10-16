import express from "express";
import { createOrUpdateRequestsSchema } from "../schemas/requests.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRole } from "../middlewares/allow-role.middleware.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { createOrUpdateController, getRequestsController, getRequestByTargetController } from "../controllers/requests.controller.js";

export const topLevelRequestsRouter = express.Router();
export const usersRequestsRouter = express.Router();

topLevelRequestsRouter.post(
  "/",
  authMiddleware,
  allowRole("admin", "user"),
  validateMiddleware(createOrUpdateRequestsSchema),
  createOrUpdateController
);
topLevelRequestsRouter.get("/target/:targetId", authMiddleware, allowRole("admin", "user"), getRequestByTargetController);
topLevelRequestsRouter.get("/all", authMiddleware, allowRole("admin", "user"), getRequestsController);
