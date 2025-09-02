import TelegramBot, { Message } from "node-telegram-bot-api";
import axios from "axios";
import { ma_main_in } from "src/markups/inline.markup";
import UsersCache from "src/cache/user.cache";
import {
  createUserService,
  getUserByTelegramIdService,
} from "src/services/user.service";

export default async (bot: TelegramBot, message: Message) => {
  if (!message.from) return;

  const userTelegramId = message.from.id;
  const chatId = message.chat.id;
  const { username, first_name: firstName, last_name: lastName } = message.chat;

  const usersTelegramData = {
    telegram_id: userTelegramId,
    username,
    first_name: firstName,
    last_name: lastName,
  };

  const options = { reply_markup: ma_main_in };

  try {
    // --- 1. Try get user ---
    const result = await getUserByTelegramIdService(BigInt(userTelegramId));

    if (!result.error) {
      await bot.sendMessage(chatId, `Welcome Back ${firstName}`, options);
      console.log(`✅ User exists : ${result.data.id}`);
      return;
    } else if (result.error) {
      if (result.status === 404) {
        console.log(`ℹ️ User not found : ${userTelegramId}`);
      }
    }

    // --- 2. Create new user ---
    const response = await createUserService(usersTelegramData);

    await bot.sendMessage(chatId, `Welcome ${firstName}`, options);
    console.log(`🆕 User created: ${response.data.id}`);
    return;
  } catch (error: any) {
    await console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(
        `❌ Axios error: ${error.response?.status} → ${
          error.response?.data || error.message
        }`
      );
    } else {
      console.error(`❌ Unexpected error:`, error);
    }
  }
};
