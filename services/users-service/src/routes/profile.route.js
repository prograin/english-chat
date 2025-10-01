import express from "express";
import { getMyProfileController, updateMyProfileController } from "../controllers/profile.controller.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../schemas/profile.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/me", authMiddleware, validateMiddleware(updateProfileSchema), updateMyProfileController);
router.get("/me", authMiddleware, getMyProfileController);

export default router;

// GET    user/:userId/profiles/me
// POST   user/:userId/profiles/me
// GET    user/:userId/profiles/:profile_id
