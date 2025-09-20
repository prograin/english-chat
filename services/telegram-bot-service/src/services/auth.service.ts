import crypto from "crypto";
import { getUserByTelegramIdService } from "./user.service";
import dotenv from "dotenv";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

dotenv.config();

export const authService = async (data: Record<string, string | number>) => {
  if (!verifyTelegramAuth(data)) {
    const error = new Error("Invalid telegram data") as Error & { statusCode?: number };
    error.statusCode = 400;
    throw error;
  }

  const telegram_id = BigInt(data.id.toString());
  const user = await getUserByTelegramIdService(telegram_id);
  if (!user.error) throw new Error(`User with ${telegram_id} is not found`);

  const user_id = user.data.id;
  const payload = {
    user_id,
    telegram_id,
  };

  const secret = process.env.JWT_SECRET as Secret;
  if (!secret) throw new Error("JWT_SECRET is missing");

  const token = jwt.sign(payload, secret, { expiresIn: "30d" });

  console.log(token);
  return token;
};

const verifyTelegramAuth = (data: Record<string, string | number>) => {
  const bot_token = process.env.BOT_TOKEN;
  if (!bot_token) throw new Error("BOT_TOKEN is missing");

  const { hash, ...checkData } = data;
  const dataCheckString = Object.keys(checkData)
    .sort()
    .map((key) => `${key}=${checkData[key]}`)
    .join("\n");

  const secretKey = crypto.createHash("sha256").update(bot_token).digest();
  const hmac = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

  return hmac === hash;
};
