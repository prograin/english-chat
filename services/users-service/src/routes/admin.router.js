import express from "express";
import {
  getProfileByUserIdController,
  createProfileByUserIdController,
  getProfilesByUserIdsController,
  deleteProfileByUserIdController,
} from "../controllers/profile.controller.js";
import { getUserController, postUserController, getUserByExternalIdController, deleteUserController } from "../controllers/users.controller.js";

import validateMiddleware from "../middlewares/validate.middleware.js";
import { createProfileSchema } from "../schemas/profile.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRole } from "../middlewares/allow-role.middleware.js";
import schemaUsers from "../schemas/users.schema.js";

const router = express.Router();

router.post("/user", authMiddleware, allowRole("admin"), validateMiddleware(schemaUsers), postUserController);
router.get("/user/:id", authMiddleware, allowRole("admin"), getUserController);
router.get("/user", authMiddleware, allowRole("admin"), getUserByExternalIdController);
router.delete("/user/:id", authMiddleware, allowRole("admin"), deleteUserController);

router.post("/user/:userId/profile", authMiddleware, allowRole("admin"), validateMiddleware(createProfileSchema), createProfileByUserIdController);
router.get("/user/:userId/profile", authMiddleware, allowRole("admin"), getProfileByUserIdController);
router.get("/users/profiles", authMiddleware, allowRole("admin"), getProfilesByUserIdsController);
router.delete("/user/:userId/profile", authMiddleware, allowRole("admin"), deleteProfileByUserIdController);

// admin/user
// admin/user/:id
// admin/user
// admin/user/:userId/profile
// admin/users/profiles

export default router;
