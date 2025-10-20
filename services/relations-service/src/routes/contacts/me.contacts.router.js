import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { allowRole } from "../../middlewares/allow-role.middleware.js";
import {
  createContactController,
  checkContactByTargetIdController,
  getUserContactsController,
  deleteContactByTargetIdController,
} from "../../controllers/contacts.controller.js";

const router = express.Router();

router.post("/", authMiddleware, allowRole("user", "admin"), createContactController);
router.get("/", authMiddleware, allowRole("user", "admin"), getUserContactsController);
router.get("/check/:targetId", authMiddleware, allowRole("user", "admin"), checkContactByTargetIdController);
router.delete("/:targetId", authMiddleware, allowRole("user", "admin"), deleteContactByTargetIdController);

export default router;
