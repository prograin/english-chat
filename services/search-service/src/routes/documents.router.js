import { Router } from "express";
import searchRouter from "./search.router.js";
import { createDocByIdController } from "../controllers/documents.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRole } from "../middlewares/allow-role.middleware.js";

const router = Router();

router.use(authMiddleware);

router.use("/:index/search", searchRouter);

router.post("/:index/:id", authMiddleware, allowRole(["admin"]), createDocByIdController);

export default router;

// hostname/users/doc/:id
// hostname/users/doc/me           user.data.user_id
// hostname/users/:user_id/doc     user.data.user_id
