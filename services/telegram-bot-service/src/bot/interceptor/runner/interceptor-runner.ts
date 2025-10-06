import TelegramBot from "node-telegram-bot-api";
import { BotCallback } from "src/shared/types/bot-callback.type";
import { Interceptors } from "src/shared/types/interceptor.type";
import { botResponseDefault } from "src/shared/types/bot-response.type";
import { BotEvent } from "src/shared/types/bot-event.type";

export const interceptorRunner = (bot: TelegramBot, middlewares: Interceptors, callback: BotCallback) => {
  return async (event: BotEvent) => {
    console.log(event);
    let index = -1;
    const response = botResponseDefault;
    const next = async () => {
      index++;
      if (index < middlewares.length) {
        middlewares[index](event, response, next);
      } else {
        await callback(bot, event, response);
      }
    };
    await next();
  };
};
