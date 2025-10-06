import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { ma_search_base_in } from "./search.markup";

async function searchBaseReply(bot: TelegramBot, callbackQuery: CallbackQuery, searchTelegramData: object) {
  if (searchTelegramData.action === null) {
    await bot.sendMessage("", ma_search_base_in);
  } else if (searchTelegramData.action === "add") {
  }
}

export default searchBaseReply;
