import { Router } from "express";
import schemaUsersTelegram from "../schemas/users-telegram.schema.js";
import modelUsersTelegram from "../models/users-telegram.model.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.post("/", validate(schemaUsersTelegram), async (req, res) => {
  try {
    const data = req.validatedBody;
    const existsUser = await modelUsersTelegram.findOne({
      where: { id: data.id },
    });

    if (existsUser) {
      return res.status(400).json({ message: "User Telegram already exists" });
    }

    const userTelegram = await modelUsersTelegram.create(data);

    res.status(202).json(userTelegram);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export default router;
