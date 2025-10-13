import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";
import BotResponse from "src/bot/types/bot-response.type";
import { TelegramSearchData } from "src/bot/types/bot-telgram-search-data.type";
import { getUserTelegramSearch, setUserTelegramSearch } from "./search.cache";
import searchBaseReply from "./search-base.reply";
import searchStartReply from "./search-start.reply";

const searchMainReplyMessage = async (
  bot: TelegramBot,
  message: Message,
  response: BotResponse,
  telegramSearchData: TelegramSearchData,
  searchPermission: object | null
) => {
  await searchBaseReply(bot, message, telegramSearchData, searchPermission);
  await setUserTelegramSearch(Number(response.user.id), telegramSearchData);
};

const searchMainReplyCallback = async (
  bot: TelegramBot,
  callbackQuery: CallbackQuery,
  response: BotResponse,
  telegramSearchData: TelegramSearchData,
  userProfile: object | null | undefined,
  searchPermission: object | null
) => {
  try {
    const callbackDataPart = response.callback!.data.parts;
    const callbackDataRaw = response.callback!.data.raw;

    const lastPart = callbackDataPart[callbackDataPart.length - 1];
    switch (lastPart) {
      case "":
        await searchBaseReply(bot, callbackQuery.message, telegramSearchData, searchPermission);
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
        await searchBaseReply(bot, callbackQuery.message, telegramSearchData, searchPermission);
        break;
    }
  } catch (error) {
    console.error("Error in main search:", error);
  }
};

export const searchMainReplyInit = async (bot: TelegramBot, callback: CallbackQuery | Message, response: BotResponse) => {
  const searchPermission = response.user.permissions.search;
  const userProfile = response.user.profile;

  let telegramSearchData: TelegramSearchData = (await getUserTelegramSearch(Number(response.user.id))) as TelegramSearchData;

  if (telegramSearchData === null) {
    telegramSearchData = {
      state: "search-base",
      action: null,
      page: 0,
      selected_fields: [],
      selected_fields_raw: [],
    };
  }

  if ("data" in callback) {
    searchMainReplyCallback(bot, callback, response, telegramSearchData, userProfile, searchPermission);
  } else if ("text" in callback) {
    searchMainReplyMessage(bot, callback, response, telegramSearchData, searchPermission);
  }
};

export default searchMainReplyInit;
