import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserTelegramToken } from "src/cache/auth.cache";
import { BotEvent } from "src/types/bot-event.type";
import BotResponse from "src/types/bot-response.type";
import { Next } from "src/types/next.type";
import { bot } from "src/bot-entry";
import { getMessageFromEvent } from "src/utils/telegram.util";
import { verifyUserToken } from "src/utils/auth.util";

export const authInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  try {
    const telegram_id = Number(event.from?.id);
    const token = await getUserTelegramToken(telegram_id);

    if (token) {
      const decoded = await verifyUserToken(token);

      response.user.id = decoded.user_id;
      response.user.telegram_id = decoded.telegram_id;
      response.user.token = token;
      response.user.exists = true;

      return next();
    }
  } catch (err: any) {
    const chat_id = await getMessageFromEvent(event);
    if (chat_id) {
      await bot.sendMessage(chat_id, "❌ You are not authenticated. Please log in first.");
    } else {
      console.error("Failed to extract chat ID from event for unauthenticated user");
    }
  }

  return;
};
