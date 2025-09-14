import TelegramBot, { Message } from "node-telegram-bot-api";

import { ma_main_in } from "src/markups/inline.markup";
import Response from "src/types/bot-response.type";
import { createUserService } from "src/services/user.service";
import axios from "axios";

export default async (bot: TelegramBot, message: Message, response: Response) => {
  const userTelegramId = message.from!.id;
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
    if (response.user.exists) {
      await bot.sendMessage(chatId, `Welcome Back ${firstName}`, options);
    } else {
      // --- Create new user ---
      const response = await createUserService(usersTelegramData);

      console.log(`🆕 User created: ${response.data.id}`);
      await bot.sendMessage(chatId, `Welcome ${firstName}`, options);
      return;
    }
  } catch (error: any) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(
        `❌ Axios error: ${error.response?.status} → ${JSON.stringify(error.response?.data) || error.message}`
      );
    } else {
      console.error(`❌ Unexpected error:`, error);
    }
  }
};
