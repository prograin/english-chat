import dotenv from "dotenv";
dotenv.config({ path: ".telegram.env" });

import { ManageHandlers } from "src/bot/handlers/bot.handler";
import TelegramBot from "node-telegram-bot-api";
import { execPath } from "process";

const proxy = process.env.PROXY;
if (proxy) {
  process.env.HTTP_PROXY = proxy ?? undefined;
  process.env.HTTPS_PROXY = proxy ?? undefined;
}
const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is not set in .env");

export const bot = new TelegramBot(token, { polling: true });

const runBot = async () => {
  try {
    new ManageHandlers(bot);
  } catch (error) {
    console.error("🔥 Critical error occurred while starting the bot!", error);

    try {
      const adminId = Number(process.env.ADMIN_CHAT_ID);

      if (!adminId) {
        console.error("ADMIN_CHAT_ID is not set or invalid.");
        return;
      }

      await bot.sendMessage(adminId, `🔥 Critical error occurred while starting the bot!\n\n${error instanceof Error ? error.stack : error}`);
    } catch (sendError) {
      console.error("Failed to send critical error message to admin:", sendError);
    }
  }
};

export default runBot;
