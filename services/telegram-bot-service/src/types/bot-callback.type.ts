import TelegramBot, { Message } from "node-telegram-bot-api";
import BotResponse from "./bot-response.type";
import { BotEvent } from "./bot-event.type";

export type BotCallback = (bot: TelegramBot, msg: BotEvent, response: BotResponse) => Promise<void>;
