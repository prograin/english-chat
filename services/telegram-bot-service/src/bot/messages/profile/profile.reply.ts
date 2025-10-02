import TelegramBot, { Message } from "node-telegram-bot-api";
import { ma_profile_in } from "./profile.markup";

export default async (bot: TelegramBot, message: Message) => {
  const chatId = message.chat.id;
  const options = {
    reply_markup: ma_profile_in,
  };
  await bot.sendMessage(chatId, "This is your profile", options);
};
