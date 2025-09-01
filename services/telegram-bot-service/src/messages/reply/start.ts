import TelegramBot, { Message } from "node-telegram-bot-api";
import axios from "axios";
import { ma_main_in } from "src/markups/inline.markup";
import UsersCache from "src/cache/user.cache";

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
    // --- 1. Try cache first ---
    const userId = await UsersCache.getUserIdByTelegramId(userTelegramId);
    if (userId) {
      const { data } = await axios.get(`http://localhost:3000/users/${userId}`);
      await bot.sendMessage(chatId, `Welcome Back ${firstName}`, options);
      console.log(`✅ User exists (cache): ${data.id}`);
      return;
    }

    // --- 2. Try fetch user by telegram_id ---
    const existingUser = await axios.get(
      `http://localhost:3000/users/?telegram_id=${userTelegramId}`,
      { validateStatus: (status) => status < 500 }
    );
    if (existingUser.status === 200 && existingUser.data?.id) {
      await UsersCache.setUserIdByTelegramId(
        existingUser.data.telegram_id,
        existingUser.data.id
      );
      await bot.sendMessage(chatId, `Welcome Back ${firstName}`, options);
      console.log(`✅ User exists (API): ${existingUser.data.id}`);
      return;
    } else if (existingUser.status === 400) {
      console.warn(
        `⚠️ Bad request when fetching user by telegram_id: ${userTelegramId}`
      );
      return;
    } else if (existingUser.status === 404) {
      console.log(`ℹ️ User not found by telegram_id: ${userTelegramId}`);
    } else {
      throw new Error(
        `❌ Unexpected response status when fetching user: ${existingUser.status}`
      );
    }

    // --- 3. Create new user ---
    const response = await axios.post(
      "http://localhost:3000/users/",
      usersTelegramData,
      { validateStatus: (status) => status < 500 }
    );

    if ([201, 409].includes(response.status)) {
      await UsersCache.setUserIdByTelegramId(userTelegramId, response.data.id);
      await bot.sendMessage(chatId, `Welcome ${firstName}`, options);
      console.log(`🆕 User created: ${response.data.id}`);
      return;
    }

    console.error(
      `❌ Unexpected status when creating user: ${response.status}`
    );
  } catch (error: any) {
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
