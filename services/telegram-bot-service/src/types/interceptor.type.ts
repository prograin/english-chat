import { Message } from "node-telegram-bot-api";
import { Next } from "./next.type";
import BotResponse from "./bot-response.type";
import { BotEvent } from "./bot-event.type";

export type Interceptors = ((
  event: BotEvent,
  response: BotResponse,
  next: Next
) => Promise<void>)[];
