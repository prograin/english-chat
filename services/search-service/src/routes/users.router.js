import { Router } from "express";
import searchRouter from "./search.router";
import { createUserByIdController, createSelfUserController } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRole } from "../middlewares/allow-role.middleware.js";

const router = Router();

router.use(authMiddleware);

router.use(
  "/search",
  (req, res, next) => {
    req.resource = "users";
    next();
  },
  searchRouter
);

router.post("/doc/:id", allowRole(["admin"]), createUserByIdController);
router.post("/doc/me", allowRole(["admin", "user"]), createSelfUserController);

export default router;

// hostname/users/doc/:id
// hostname/users/doc/me     user.data.user_id
