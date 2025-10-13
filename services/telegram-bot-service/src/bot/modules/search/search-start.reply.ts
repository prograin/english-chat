import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { ma_search_base_in } from "./search.markup";
import { TelegramSearchData } from "src/bot/types/bot-telgram-search-data.type";
import { QueryFilter } from "./search.type";
import { AdminAxiosInstance } from "src/shared/utils/axios.util";
import { no_search_found_text } from "./search.text";
import { buildSearchQueryOptions, buildUserSearchMessage } from "./search.helper";
import { UserAdminController } from "../users/user.controller";

async function searchStartReply(
  bot: TelegramBot,
  callbackQuery: CallbackQuery,
  telegramSearchData: TelegramSearchData,
  userProfile: Record<string, any> | any
) {
  const selectedFields = telegramSearchData?.selected_fields;
  const page = telegramSearchData?.page as number;

  const query = buildSearchQueryOptions(selectedFields || [], userProfile);

  const users = await UserAdminController.searchUsersByQuery(page, query);
  if (!users) {
    await bot.editMessageText(no_search_found_text, {
      chat_id: callbackQuery.message?.chat.id,
      message_id: callbackQuery.message?.message_id,
    });
  } else {
    let messageText = "🔎 <b>Search Results</b>\n\n";

    for (const user of users) {
      messageText += buildUserSearchMessage(user);
    }

    const now = new Date();
    messageText += `<i>Search performed on ${now.toLocaleDateString("en-US")} ${now.toLocaleTimeString("en-US")}</i>`;

    await bot.editMessageText(messageText, {
      chat_id: callbackQuery.message?.chat.id,
      message_id: callbackQuery.message?.message_id,
      parse_mode: "HTML",
    });
  }
}

export default searchStartReply;
