import crypto from "crypto";
import dotenv from "dotenv";

import { UserAdminController } from "src/bot/messages/users/user.controller";
import { getUserToken } from "src/api/cache/auth.cache";
import { generateUserToken, verifyUserToken } from "src/shared/utils/auth.util";

dotenv.config({ path: ".telegram.env" });

/**
 * Authenticates a user via Telegram data.
 * - Verifies Telegram auth data integrity
 * - Fetches the user from database by telegram_id
 * - Generates a JWT token if one does not exist in cache
 */
export const authService = async (data: Record<string, string | number>) => {
  if (!verifyTelegramAuth(data)) {
    const error = new Error("Invalid telegram data") as Error & { statusCode?: number };
    error.statusCode = 400;
    throw error;
  }

  const telegram_id = BigInt(data.id.toString());
  const user = await UserAdminController.getUserByTelegramId(telegram_id);
  if (user.error) throw new Error(`User with ${telegram_id} is not found`);

  const user_id = user.data.id;
  const payload = {
    user_id: user_id,
    telegram_id: Number(telegram_id),
    role: "user",
  };

  let token;
  token = await getUserToken(user_id);
  if (token) {
    try {
      await verifyUserToken(token);
    } catch {
      token = await generateUserToken(payload);
    }
  } else {
    token = await generateUserToken(payload);
  }
  return { token, user: user.data };
};

/**
 * Verifies Telegram login data according to Telegram's secure authentication algorithm.
 * - Creates a HMAC hash of the sorted data (excluding `hash` itself)
 * - Compares it to the `hash` provided by Telegram
 */
const verifyTelegramAuth = (data: Record<string, string | number>) => {
  const bot_token = process.env.BOT_TOKEN;
  if (!bot_token) throw new Error("BOT_TOKEN is missing");

  const { hash, ...checkData } = data;
  const dataCheckString = Object.keys(checkData)
    .sort()
    .map((key) => `${key}=${checkData[key]}`)
    .join("\n");

  const secretKey = crypto.createHash("sha256").update(bot_token).digest();
  const hmac = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex").toLowerCase();

  return hmac === hash;
};
