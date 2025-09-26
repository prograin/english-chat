import express from "express";
import {
  getProfileController,
  createProfileController,
  deleteProfileByUserIdController,
  getProfileByUserIdController,
  updateProfileController,
} from "../controllers/profile.controller.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { createProfileSchema, updateProfileSchema } from "../schemas/profile.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", validateMiddleware(createProfileSchema), createProfileController);
router.put("/me", authMiddleware, validateMiddleware(updateProfileSchema), updateProfileController);
router.get("/me", authMiddleware, getProfileController);
router.get("/:user_id", getProfileByUserIdController);
router.delete("/", deleteProfileByUserIdController);

export default router;
