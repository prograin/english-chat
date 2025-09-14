import express from "express";
import { createPresencesSchema } from "../schemas/presence.schema.js";
import { postPresenceController } from "../controllers/presence.controller.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", validate(createPresencesSchema), postPresenceController);

export default router;
