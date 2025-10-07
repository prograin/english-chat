import { BotEvent } from "src/bot/types/bot-event.type";

export const getMessageFromEvent = async (event: BotEvent) => {
  if ("message" in event && event.message?.chat?.id) {
    return event.message.chat.id;
  }
  if ("chat" in event && event.chat?.id) {
    return event.chat.id;
  }
  return null;
};
