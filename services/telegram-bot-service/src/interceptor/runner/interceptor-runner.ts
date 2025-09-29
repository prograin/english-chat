import TelegramBot, { Message } from "node-telegram-bot-api";
import { BotCallback } from "src/types/bot-callback.type";
import { Interceptors } from "src/types/interceptor.type";
import { botResponseDefault } from "src/types/bot-response.type";

export const middlewareRunner = (
  bot: TelegramBot,
  middlewares: Interceptors,
  callback: BotCallback
) => {
  return async (msg: Message) => {
    let index = -1;
    const response = botResponseDefault;
    const next = async () => {
      index++;
      if (index < middlewares.length) {
        middlewares[index](msg, response, next);
      } else {
        await callback(bot, msg, response);
      }
    };
    await next();
  };
};
