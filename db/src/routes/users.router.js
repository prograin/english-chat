import express from "express";
import schemaUsers from "../schemas/users.schema.js";
import validate from "../middlewares/validate.js";

import {
  getAllUsersController,
  getUserController,
  postUserController,
  getUserByExternalIdController,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/", validate(schemaUsers), postUserController);
router.get("/all", getAllUsersController);
router.get("/:id", getUserController);
router.get("/", getUserByExternalIdController);

export default router;
