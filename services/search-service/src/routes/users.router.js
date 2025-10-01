import { Router } from "express";
import searchRouter from "./search.router";
import { createUserByIdController } from "../controllers/users.controller";

const router = Router();

router.use(
  "/search",
  (req, res, next) => {
    req.resource = "users";
    next();
  },
  searchRouter
);

router.post("/:id", createUserByIdController);

export default router;
