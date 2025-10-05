import { Router } from "express";
import searchRouter from "./search.router.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createDocByIdController, updateDocByIdController } from "../controllers/documents.controller.js";
import { usersSchema } from "../schemas/users.schema.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { allowRole } from "../middlewares/allow-role.middleware.js";

export const topLevelUsersRouter = Router();
export const documentsUsersRouter = Router();

topLevelUsersRouter.use(authMiddleware);
documentsUsersRouter.use(authMiddleware);

topLevelUsersRouter.use(
  "/search",
  (req, res, next) => {
    req.params.reference = "users"; // add the param manually
    next();
  },
  searchRouter
);

documentsUsersRouter.use("/", (req, res, next) => {
  req.params.index = "users";
  next();
});

documentsUsersRouter.post("/:id", allowRole("admin"), validateMiddleware(usersSchema), createDocByIdController);
documentsUsersRouter.put("/:id", allowRole("admin"), validateMiddleware(usersSchema), updateDocByIdController);
