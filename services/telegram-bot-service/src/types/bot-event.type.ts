import { Message, CallbackQuery } from "node-telegram-bot-api";

export type BotEvent = Message | CallbackQuery;
