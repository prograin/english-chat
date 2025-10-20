import TelegramBot, { CallbackQuery, Message, ParseMode } from "node-telegram-bot-api";
import { ma_profile_in } from "./profile.markup";
import BotResponse from "src/bot/types/bot-response.type";
import { BotEvent } from "src/bot/types/bot-event.type";
import { ProfileSelfController } from "./profile.controller";
import { buildProfileText } from "./profile.helper";
import profileMe from "./profile-me.reply";

const profileMainReplyCallback = async (bot: TelegramBot, callbackQuery: CallbackQuery, response: BotResponse) => {
  const lastPart = response.callback?.data.parts.at(-1);

  switch (lastPart) {
    case "me":
      await profileMe(bot, callbackQuery, response);
  }
};

export const profileMainReplyMessage = async () => {};

export default async (bot: TelegramBot, event: BotEvent, response: BotResponse) => {
  const chatId = "chat" in event ? event.chat.id : event.message?.chat.id;
  try {
    if ("data" in event) {
      await profileMainReplyCallback(bot, event, response);
    } else if ("text" in event) {
      await profileMainReplyMessage();
    }
  } catch (error) {
    if (chatId) {
      await bot.sendMessage(chatId, "Something went wrong while processing your profile. Please try again.");
    }
  }
};
