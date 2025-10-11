import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { ma_search_base_in } from "./search.markup";
import { TelegramSearchData } from "src/bot/types/bot-telgram-search-data.type";
import { QueryFilter } from "./search.type";
import { AdminAxiosInstance } from "src/shared/utils/axios.util";

async function searchStartReply(
  bot: TelegramBot,
  callbackQuery: CallbackQuery,
  telegramSearchData: TelegramSearchData,
  userProfile: Record<string, any> | any
) {
  const selected_fields = telegramSearchData?.selected_fields;
  const must_clauses = [];

  for (const fieldData of selected_fields || []) {
    const f: QueryFilter = JSON.parse(fieldData) as QueryFilter;
    if (["term", "terms"].includes(f.op)) {
      must_clauses.push({ [f.op]: { [f.field]: f.value ?? userProfile[f.field] } });
    } else if (["gt", "gte", "lt", "lte", "eq"].includes(f.op)) {
      if (f.op === "eq") {
        must_clauses.push({ term: { [f.field]: f.value ?? userProfile[f.field] } });
      } else {
        must_clauses.push({ range: { [f.field]: { [f.op]: f.value ?? userProfile[f.field] } } });
      }
    } else {
      return { error: `Unsupported operator: ${f.op}` };
    }
  }
  const query = { bool: { must: must_clauses } };

  await AdminAxiosInstance.post(`http://localhost:3005/users/search/query`, query);
}

export default searchStartReply;
