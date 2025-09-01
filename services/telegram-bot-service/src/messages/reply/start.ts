import TelegramBot, { Message } from "node-telegram-bot-api";
import axios from "axios";
import { ma_main_in } from "src/markups/inline.markup";
import {
  getUserIdByTelegramId,
  setUserIdByTelegramId,
} from "src/cache/user.cache";

export default async (bot: TelegramBot, message: Message) => {
  if (!message.from) {
    return;
  }
  const userTelegramId = BigInt(message.from.id);
  const chatiD = message.chat.id;
  const username = message.chat.username;
  const firstName = message.chat.first_name;
  const lastName = message.chat.last_name;

  const usersTelegramData = {
    telegram_id: userTelegramId,
    username: username,
    first_name: firstName,
    last_name: lastName,
  };

  const userId = await getUserIdByTelegramId(userTelegramId);
  if (userId) {
    return;
  }

  const user = await axios.get("http://localhost:3000/users/");

  try {
    const response = await axios.post(
      "http://localhost:3000/users/",
      usersTelegramData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      }
    );

    if (response.status == 400) {
      /**400 men exists and we renew expire time*/
      await setUserIdByTelegramId(userTelegramId, response.data.id);

      const options = {
        reply_markup: ma_main_in,
      };

      await bot.sendMessage(chatiD, "Welcome Back" + firstName, options);
      console.log("✅ User Exist:", response.data);
      return;
    } else if (response.status == 201) {
      /**201 mean new user was created*/
      await setUserIdByTelegramId(userTelegramId, response.data.id);

      const options = {
        reply_markup: ma_main_in,
      };

      await bot.sendMessage(chatiD, "Welcome " + firstName, options);
      console.log("✅ User created:", response.data);
      return;
    }
  } catch (error) {
    console.error("❌ Error creating user:", error);
  }
};
