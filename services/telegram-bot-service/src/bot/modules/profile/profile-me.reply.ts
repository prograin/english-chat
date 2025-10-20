import TelegramBot, { CallbackQuery, ParseMode } from "node-telegram-bot-api";
import BotResponse from "src/bot/types/bot-response.type";
import { ProfileSelfController } from "./profile.controller";
import { buildProfileText } from "./profile.helper";
import { ma_profile_in } from "./profile.markup";

async function profileMe(bot: TelegramBot, callbackQuery: CallbackQuery, response: BotResponse) {
  const chatId = callbackQuery.message?.chat.id as number;
  const profileResponse = await ProfileSelfController.getProfile(response.user.token || "");
  const text = buildProfileText(profileResponse.data.profile);
  const options = {
    reply_markup: ma_profile_in,
    parse_mode: "HTML" as ParseMode,
  };
  await bot.sendMessage(chatId, text, options);
}

export default profileMe;
