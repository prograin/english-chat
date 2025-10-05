import express from "express";
import { allowRole } from "../middlewares/allow-role.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getMyUserController } from "../controllers/users.controller.js";
import usersSchema from "../schemas/users.schema.js";
import { userProfileRouter } from "./profile.router.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { getUserController, postUserController, getUserByTelegramIdController, deleteUserController } from "../controllers/users.controller.js";

const router = express.Router();

router.use("/:userId/profile", userProfileRouter);

// --------------------------

// GET    /users/me
// GET    /users/:id
// GET    /users/telegram/:id
// POST    /users
// DELET    /users/:id

router.get("/me", authMiddleware, allowRole("user", "admin"), getMyUserController);
router.get("/:id", authMiddleware, allowRole("admin"), getUserController);
router.get("/telegram/:id", authMiddleware, allowRole("admin"), getUserByTelegramIdController);
router.post("/", authMiddleware, allowRole("admin"), validateMiddleware(usersSchema), postUserController);
router.delete("/:id", authMiddleware, allowRole("admin"), deleteUserController);

export default router;
