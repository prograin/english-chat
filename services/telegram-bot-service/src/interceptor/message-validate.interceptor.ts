import { Message } from "node-telegram-bot-api";
import BotResponse from "src/types/bot-response.type";
import { Next } from "src/types/next.type";

export const messageValidateInterceptor = async (
  msg: Message,
  response: BotResponse,
  next: Next
) => {
  if (!msg.from) return;
  await next();
};
