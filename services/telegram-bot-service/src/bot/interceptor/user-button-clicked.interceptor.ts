import BotResponse from "src/bot/types/bot-response.type";
import { Next } from "src/bot/types/next.type";
import { publishUserButtonClickedEvent } from "src/shared/events/publishers/user-button-clicked-event.publisher";
import { BotEvent } from "src/bot/types/bot-event.type";

export const userButtonClickedInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  if (response.user.exists) {
    await publishUserButtonClickedEvent({ id: response.user.id! });
  }

  await next();
};
