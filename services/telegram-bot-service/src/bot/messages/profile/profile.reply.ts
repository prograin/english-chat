import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import { ma_profile_in } from "./profile.markup";

export default async (bot: TelegramBot, callbackQuery: CallbackQuery) => {
  const chatId = callbackQuery.message?.chat.id as number;
  const options = {
    reply_markup: ma_profile_in,
  };
  await bot.sendMessage(chatId, "This is your profile", options);
};
