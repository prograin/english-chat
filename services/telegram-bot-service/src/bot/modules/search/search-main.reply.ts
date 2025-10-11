import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";
import BotResponse from "src/bot/types/bot-response.type";
import { TelegramSearchData } from "src/bot/types/bot-telgram-search-data.type";
import { getUserTelegramSearch, setUserTelegramSearch } from "./search.cache";
import searchBaseReply from "./search-base.reply";
import searchStartReply from "./search-start.reply";

const searchMainReply = async (bot: TelegramBot, callbackQuery: CallbackQuery, response: BotResponse) => {
  try {
    const searchPermission = response.user.permissions.search;
    const userProfile = response.user.profile;
    const callbackDataPart = response.callback!.data.parts;
    const callbackDataRaw = response.callback!.data.raw;

    let telegramSearchData: TelegramSearchData = (await getUserTelegramSearch(Number(response.user.id))) as TelegramSearchData;

    if (telegramSearchData === null) {
      telegramSearchData = {
        state: "search-base",
        action: null,
        selected_fields: [],
        selected_fields_raw: [],
      };
    }

    const lastPart = callbackDataPart[callbackDataPart.length - 1];
    switch (lastPart) {
      case "":
        await searchBaseReply(bot, callbackQuery, telegramSearchData, searchPermission);
        await setUserTelegramSearch(Number(response.user.id), telegramSearchData);
        break;

      case "start":
        await searchStartReply(bot, callbackQuery, telegramSearchData, userProfile);
        break;

      default:
        if (telegramSearchData.selected_fields?.includes(lastPart)) {
          telegramSearchData.selected_fields = telegramSearchData.selected_fields.filter((i: any) => i !== lastPart);
          telegramSearchData.selected_fields_raw = telegramSearchData.selected_fields_raw?.filter((i: any) => i !== callbackDataRaw);
        } else {
          telegramSearchData.selected_fields?.push(lastPart);
          telegramSearchData.selected_fields_raw.push(callbackDataRaw);
        }
        await setUserTelegramSearch(Number(response.user.id), telegramSearchData);
        await searchBaseReply(bot, callbackQuery, telegramSearchData, searchPermission);
        break;
    }
  } catch (error) {
    console.error("Error in main search:", error);
  }
};

export default searchMainReply;
