import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getMyUserController } from "../controllers/users.controller.js";

const router = express.Router();

// REVIEW
// router.use("/:userId/profile", porfileRouter);

router.get("/me", authMiddleware, getMyUserController);

// hostname/user/me

export default router;
