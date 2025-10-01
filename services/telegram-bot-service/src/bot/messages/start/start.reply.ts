import TelegramBot, { Message } from "node-telegram-bot-api";

import { ma_main_in } from "./start.markup";
import Response from "src/types/bot-response.type";
import { AdminController } from "src/controllers/bot.user.controller";
import axios from "axios";
import { BotEvent } from "src/types/bot-event.type";
import { generateUserToken } from "src/utils/auth.util";
import { setUserToken, setUserTelegramToken } from "src/cache/auth.cache";

export default async (bot: TelegramBot, event: BotEvent, response: Response) => {
  const message = event as Message;

  const userTelegramId = message.from!.id;
  const chatId = message.chat.id;
  const { first_name: firstName } = message.chat;

  const usersTelegramData = {
    telegram_id: userTelegramId,
  };

  const options = { reply_markup: ma_main_in };

  try {
    if (response.user.exists) {
      await bot.sendMessage(chatId, `Welcome Back ${firstName}`, options);
    } else {
      const user = await AdminController.createUser(usersTelegramData);
      console.log(`🆕 User created: ${user.data.id}`);
      await bot.sendMessage(chatId, `Welcome ${firstName}`, options);
      const token = await generateUserToken({
        user_id: user.data.id,
        telegram_id: userTelegramId,
        role: "user",
      });
      await setUserToken(user.data.id, token);
      await setUserTelegramToken(userTelegramId, token);
    }
  } catch (error: any) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(`❌ Axios error: ${error.response?.status} → ${JSON.stringify(error.response?.data) || error.message}`);
    } else {
      console.error(`❌ Unexpected error:`, error);
    }
  }
};
