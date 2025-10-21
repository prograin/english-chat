import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import { ma_search_base_in } from "./search.markup";
import { fix_ma_search_base_in } from "./search.markup";
import { TelegramSearchData } from "src/bot/types/bot-telgram-search-data.type";
import { need_complete_profile, search_base } from "./search.text";

async function searchBaseReply(
  bot: TelegramBot,
  message: Message | undefined,
  editable = true,
  telegramSearchData: TelegramSearchData,
  searchPermission: any
) {
  const selectedFieldsRaw = telegramSearchData?.selected_fields_raw;

  const filteredReply = [];
  const ma_search_base_in_clone = structuredClone(ma_search_base_in);

  for (const row of ma_search_base_in_clone) {
    const fliteredRow = [];
    for (const field of row) {
      if (searchPermission.includes(field.meta.value)) {
        if (selectedFieldsRaw?.includes(field.callback_data)) {
          field.text = `Selected :${field.text}`;
        }
        fliteredRow.push(field);
      }
    }
    if (fliteredRow.length !== 0) {
      filteredReply.push(fliteredRow);
    }
  }

  if (filteredReply.length === 0) {
    if (editable) {
      await bot.editMessageText(need_complete_profile, {
        chat_id: message!.chat.id,
        message_id: message!.message_id,
      });
    } else {
      await bot.sendMessage(message!.chat.id, need_complete_profile);
    }
  }

  const finalReply = [...filteredReply, ...fix_ma_search_base_in];

  if (editable) {
    await bot.editMessageText(search_base, {
      chat_id: message!.chat.id,
      message_id: message!.message_id,
      reply_markup: {
        inline_keyboard: finalReply,
      },
    });
  } else {
    await bot.sendMessage(message!.chat.id, search_base, {
      reply_markup: {
        inline_keyboard: finalReply,
      },
    });
  }
}

export default searchBaseReply;
