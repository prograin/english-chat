import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { allowRole } from "../../middlewares/allow-role.middleware.js";
import { createBlockController, checkBlockByTargetIdController, deleteBlockByTargetIdController } from "../../controllers/blocks.controller.js";

const router = express.Router();

router.post("/", authMiddleware, allowRole("admin"), createBlockController);
router.get("/check/:targetId", authMiddleware, allowRole("admin"), checkBlockByTargetIdController);
router.delete("/:targetId", authMiddleware, allowRole("admin"), deleteBlockByTargetIdController);

export default router;
