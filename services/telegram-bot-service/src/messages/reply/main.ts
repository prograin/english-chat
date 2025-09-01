import TelegramBot, { Message } from "node-telegram-bot-api";
import { ma_main_in } from "src/markups/inline.markup";

export const main = async (bot: TelegramBot, message: Message) => {
  try {
    const chatId = message.chat.id;
    const full_name = message.chat.first_name + " " + message.chat.last_name;

    const options = {
      reply_markup: ma_main_in,
    };

    await bot.sendMessage(chatId, "Welcome" + full_name, options);
  } catch (error) {
    console.error("Error in main handler:", error);
  }
};
