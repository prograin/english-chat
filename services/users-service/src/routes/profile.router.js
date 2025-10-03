import express from "express";
import { getMyProfileController, updateMyProfileController } from "../controllers/profile.controller.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../schemas/profile.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const selfProfileRouter = express.Router();
export const userProfileRouter = express.Router();
export const adminProfileRouter = express.Router();

selfProfileRouter.put("/me", authMiddleware, validateMiddleware(updateProfileSchema), updateMyProfileController);
selfProfileRouter.get("/me", authMiddleware, getMyProfileController);

// POST   user/profile/:id
// GET    user/:userId/profiles/me
// GET    user/:userId/profiles/:id
