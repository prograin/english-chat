import { Router } from "express";
import { authController } from "src/controllers/auth.controller";

const router = Router();

router.post("/", authController);

export default router;
