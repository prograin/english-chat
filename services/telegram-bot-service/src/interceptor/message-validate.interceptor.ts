import { Message } from "node-telegram-bot-api";
import BotResponse from "src/types/bot-response.type";
import { Next } from "src/types/next.type";
import { BotEvent } from "src/types/bot-event.type";

export const messageValidateInterceptor = async (
  event: BotEvent,
  response: BotResponse,
  next: Next
) => {
  if (!event.from) return;
  await next();
};
