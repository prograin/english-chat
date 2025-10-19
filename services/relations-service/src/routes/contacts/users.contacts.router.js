import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { allowRole } from "../../middlewares/allow-role.middleware.js";
import {
  createContactController,
  checkContactByTargetIdController,
  deleteContactByTargetIdController,
} from "../../controllers/contacts.controller.js";

const router = express.Router();

router.post("/", authMiddleware, allowRole("admin"), createContactController);
router.get("/check/:targetId", authMiddleware, allowRole("admin"), checkContactByTargetIdController);
router.delete("/:targetId", authMiddleware, allowRole("admin"), deleteContactByTargetIdController);

export default router;
