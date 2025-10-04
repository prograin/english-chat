import express from "express";
import { allowRole } from "../middlewares/allow-role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getMyUserController } from "../controllers/users.controller.js";
import { userProfileRouter } from "./profile.router.js";
import { getUserController, postUserController, getUserByTelegramIdController, deleteUserController } from "../controllers/users.controller.js";

const router = express.Router();

router.use("/:userId/profile", userProfileRouter);

// --------------------------

// GET    /users/me
// GET    /users/:id
// GET    /users/exetrnal
// POST    /users
// DELET    /users/:id

router.get("/me", authMiddleware, allowRole(["user", "admin"]), getMyUserController);
router.get("/:id", authMiddleware, allowRole("admin"), getUserController);
router.get("/telegram/:id", authMiddleware, allowRole("admin"), getUserByTelegramIdController);
router.post("/", authMiddleware, allowRole("admin"), validateMiddleware(schemaUsers), postUserController);
router.delete("/:id", authMiddleware, allowRole("admin"), deleteUserController);

export default router;
