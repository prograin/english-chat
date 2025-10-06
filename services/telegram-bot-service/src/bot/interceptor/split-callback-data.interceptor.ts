import BotResponse from "src/shared/types/bot-response.type";
import { Next } from "src/shared/types/next.type";
import { BotEvent } from "src/shared/types/bot-event.type";
import { CallbackQuery } from "node-telegram-bot-api";

export const splitCallbackDataInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  const callbackQuery = event as CallbackQuery;
  const callbackData = callbackQuery.data;
  if (!callbackData) {
    await next();
  }

  const parts = callbackData?.split("::");
  response.callback = { data: { parts: parts ?? [], raw: callbackData || null } };

  await next();
};
