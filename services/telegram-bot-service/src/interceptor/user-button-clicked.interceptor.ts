import BotResponse from "src/types/bot-response.type";
import { Next } from "src/types/next.type";
import { publishUserButtonClickedEvent } from "src/events/publishers/user-button-clicked-event.publisher";
import { BotEvent } from "src/types/bot-event.type";

export const userButtonClickedInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  if (response.user.exists) {
    console.log("User last active event was Published", response.user.id!);
    await publishUserButtonClickedEvent({ id: response.user.id! });
  }

  await next();
};
