import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { TelegramSearchData } from "src/bot/types/bot-telgram-search-data.type";
import { no_search_found_text, search_start_text } from "./search.text";
import { buildSearchQueryOptions, buildUserSearchMessage } from "./search.helper";
import { UserAdminController } from "../users/user.controller";
import { ma_search_start_all_in, ma_search_start_next_in, ma_search_start_previous_in } from "./search.markup";

async function searchStartReply(
  bot: TelegramBot,
  callbackQuery: CallbackQuery,
  telegramSearchData: TelegramSearchData,
  userProfile: Record<string, any> | any
) {
  const selectedFields = telegramSearchData?.selected_fields;
  const page = telegramSearchData?.page as number;

  const query = buildSearchQueryOptions(selectedFields || [], userProfile);
  const data = await UserAdminController.searchUsersByQuery(page, query);

  if (!data.result) {
    await bot.editMessageText(no_search_found_text, {
      chat_id: callbackQuery.message?.chat.id,
      message_id: callbackQuery.message?.message_id,
    });
  } else {
    let reply_markup = [];

    if (page === 0) {
      reply_markup = data.is_next_page ? ma_search_start_next_in : [];
    } else {
      reply_markup = data.is_next_page ? ma_search_start_all_in : ma_search_start_previous_in;
    }

    let messageText = "🔎 <b>Search Results</b>\n\n";
    for (const user of data.result) {
      if (user.user_id != userProfile.user_id) messageText += buildUserSearchMessage(user);
    }
    messageText += search_start_text;

    await bot.editMessageText(messageText, {
      chat_id: callbackQuery.message?.chat.id,
      message_id: callbackQuery.message?.message_id,
      reply_markup: { inline_keyboard: reply_markup },
      parse_mode: "HTML",
    });
  }
}

export default searchStartReply;
