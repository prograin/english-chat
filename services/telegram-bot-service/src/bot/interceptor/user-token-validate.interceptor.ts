import BotResponse from "src/bot/types/bot-response.type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Next } from "src/bot/types/next.type";
import { BotEvent } from "src/bot/types/bot-event.type";
import { getUserTelegramToken } from "src/api/cache/auth.cache";
import { bot } from "src/bot-entry";

export const userTokenValidateInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  const token = await getUserTelegramToken(Number(event.from?.id));
  const chatId = "chat" in event ? event.chat.id : event.message?.chat.id;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      response.user.token = token;
      response.user.id = decoded.user_id;
      response.user.telegram_id = decoded.telegram_id;
      response.user.exists = true;
    } catch (err: any) {
      // await bot.sendMessage(chatId as number, "Please /start and try again");
      if (err.name === "TokenExpiredError") {
      } else {
      }
      // return;
    }
  } else {
    // await bot.sendMessage(chatId as number, "Please /start in bot and try again");
    // return;
  }

  next();
};
