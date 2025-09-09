import TelegramBot, { Message } from "node-telegram-bot-api";
import BotResponse from "./bot-response.type";

export type BotCallback = (bot: TelegramBot, msg: Message, response: BotResponse) => Promise<void>;
