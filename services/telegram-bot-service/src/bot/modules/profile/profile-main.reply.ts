import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import { ma_profile_in } from "./profile.markup";
import BotResponse from "src/bot/types/bot-response.type";

const profileMainReplyCallback = async (bot: TelegramBot, callbackQuery: CallbackQuery, response: BotResponse) => {
  const chatId = callbackQuery.message?.chat.id as number;
  const options = {
    reply_markup: ma_profile_in,
  };
  await bot.sendMessage(chatId, "This is your profile", options);
};

export const profileMainReplyMessage = async () => {};

export default async (bot: TelegramBot, callback: CallbackQuery | Message, response: BotResponse) => {
  if ("data" in callback) {
    profileMainReplyCallback(bot, callback, response);
  } else if ("text" in callback) {
    profileMainReplyMessage();
  }
};
