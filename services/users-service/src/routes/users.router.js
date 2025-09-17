import express from "express";
import schemaUsers from "../schemas/users.schema.js";
import validate from "../middlewares/validate.js";

import {
  getAllUsersController,
  getUserController,
  postUserController,
  getUserByExternalIdController,
  deleteUserController,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/", validate(schemaUsers), postUserController);
router.get("/all", getAllUsersController);
router.get("/:id", getUserController);
router.get("/", getUserByExternalIdController);
router.delete("/:id", deleteUserController);

export default router;
