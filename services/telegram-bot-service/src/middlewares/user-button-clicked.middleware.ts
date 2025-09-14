import { Message } from "node-telegram-bot-api";
import BotResponse from "src/types/bot-response.type";
import { Next } from "src/types/next.type";
import { publishUserButtonClickedEvent } from "src/events/publishers/user-button-clicked-event.publisher";

export const userButtonClickedMiddleware = async (msg: Message, response: BotResponse, next: Next) => {
  if (response.user.exists) {
    console.log(response.user.id!);
    await publishUserButtonClickedEvent({ id: response.user.id! });
  }

  await next();
};
