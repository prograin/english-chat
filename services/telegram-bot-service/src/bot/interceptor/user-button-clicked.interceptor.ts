import BotResponse from "src/shared/types/bot-response.type";
import { Next } from "src/shared/types/next.type";
import { publishUserButtonClickedEvent } from "src/shared/events/publishers/user-button-clicked-event.publisher";
import { BotEvent } from "src/shared/types/bot-event.type";

export const userButtonClickedInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  if (response.user.exists) {
    console.log("User last active event was Published", response.user.id!);
    await publishUserButtonClickedEvent({ id: response.user.id! });
  }

  await next();
};
