import BotResponse from "src/bot/types/bot-response.type";
import { Next } from "src/bot/types/next.type";
import { BotEvent } from "src/bot/types/bot-event.type";
import { CallbackQuery } from "node-telegram-bot-api";

export const splitCallbackDataInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  const callbackQuery = event as CallbackQuery;
  const callbackData = callbackQuery.data;
  if (!callbackData) {
    await next();
  }

  const parts = callbackData?.split("::");
  response.callback = { data: { parts: parts ?? [], raw: callbackData || "" } };

  await next();
};
