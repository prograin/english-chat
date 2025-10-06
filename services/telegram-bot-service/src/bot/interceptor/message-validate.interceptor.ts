import { Message } from "node-telegram-bot-api";
import BotResponse from "src/shared/types/bot-response.type";
import { Next } from "src/shared/types/next.type";
import { BotEvent } from "src/shared/types/bot-event.type";

export const messageValidateInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  if (!event.from) return;
  await next();
};
