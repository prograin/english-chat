import TelegramBot, { Message } from "node-telegram-bot-api";
import axios from "axios";
import { ma_main_in } from "src/markups/inline.markup";

export default async (bot: TelegramBot, message: Message) => {
  if (!message.from) {
    return;
  }
  const userTelegramId = message.from.id;
  const chatiD = message.chat.id;
  const username = message.chat.username;
  const firstName = message.chat.first_name;
  const lastName = message.chat.last_name;

  const usersTelegramData = {
    id: userTelegramId,
    username: username,
    first_name: firstName,
    last_name: lastName,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/users-telegram/",
      usersTelegramData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      }
    );

    if (response.status == 400) {
      const options = {
        reply_markup: ma_main_in,
      };

      await bot.sendMessage(chatiD, "Welcome Back" + firstName, options);
      console.log("✅ User Exist:", response.data);
      return;
    } else if (response.status == 202) {
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
