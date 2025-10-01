import express from "express";
import porfileRouter from "./profile.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getMyUserController } from "../controllers/users.controller.js";

const router = express.Router();

router.use("/:userId/profile", porfileRouter);

router.get("/me", authMiddleware, getMyUserController);

export default router;
