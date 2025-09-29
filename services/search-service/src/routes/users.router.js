import { Router } from "express";
import searchRouter from "./search.router";

const router = Router();

router.use(
  "/search",
  (req, res, next) => {
    req.resource = "users";
    next();
  },
  searchRouter
);
