import TelegramBot, { Message } from "node-telegram-bot-api";
import { ma_search_in } from "./search.markup";
import BotResponse from "src/types/bot-response.type";
import { search_text } from "./search.text";

export default async (bot: TelegramBot, message: Message, response: BotResponse) => {
  try {
    const chatId = message.chat.id;

    const options = {
      reply_markup: ma_search_in,
    };

    await bot.sendMessage(chatId, search_text, options);
  } catch (error) {
    console.error("Error in main search:", error);
  }
};
