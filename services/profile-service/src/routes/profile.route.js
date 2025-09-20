import express from "express";
import {
  createProfileController,
  deleteProfileByUserIdController,
  getProfileByUserIdController,
} from "../controller/profile.controller.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { createProfileSchema } from "../schemas/profile.schema.js";

const router = express.Router();

router.post("/", validateMiddleware(createProfileSchema), createProfileController);
router.get("/", getProfileByUserIdController);
router.delete("/", deleteProfileByUserIdController);

export default router;
