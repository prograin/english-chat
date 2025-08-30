import express from "express";
import schemaUsers from "../schemas/users.schema.js";
import validate from "../middlewares/validate.js";

import {
  getAllUsersController,
  getUserController,
  postUserTelegram,
} from "../controllers/users.controller.js";
import { postUsersController } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/users-telegram", validate(schemaUsers), postUserTelegram);
router.post("/", validate(schemaUsers), getAllUsersController);
router.get("/all", postUsersController);
router.get("/:id", getUserController);

export default router;
