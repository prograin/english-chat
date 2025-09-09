import { Message } from "node-telegram-bot-api";
import { Next } from "./next.type";
import BotResponse from "./bot-response.type";

export type Middlewares = ((msg: Message, response: BotResponse, next: Next) => Promise<void>)[];
