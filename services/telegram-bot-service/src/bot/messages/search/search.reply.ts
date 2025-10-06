import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";
import BotResponse from "src/shared/types/bot-response.type";
import { search_text, profile_not_found } from "./search.text";
import { ProfileSelfController } from "src/bot/messages/profile/profile.controller";
import { getUserTelegramSearch } from "./search.cache";
import searchBaseReply from "./search-base.reply";

export default async (bot: TelegramBot, callbackQuery: CallbackQuery, response: BotResponse) => {
  try {
    const chatId = callbackQuery.message?.chat.id as number;
    const token = response.user.token;
    let telegramSearchData;

    const profile = await ProfileSelfController.getProfile(token as string);
    if (profile.error) {
      await bot.answerCallbackQuery(callbackQuery.id, { text: profile_not_found, show_alert: true });
      await bot.sendMessage(chatId, "/start");
    }

    response.user.profile = profile.data;
    telegramSearchData = await getUserTelegramSearch(Number(response.user.id));

    if (telegramSearchData === null) {
      telegramSearchData = {
        state: "search-base",
      };
    }

    await searchBaseReply(bot, callbackQuery, telegramSearchData);
  } catch (error) {
    console.error("Error in main search:", error);
  }
};
