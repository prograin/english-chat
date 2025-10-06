import dotenv from "dotenv";
dotenv.config({ path: ".telegram.env" });

import { ManageHandlers } from "src/api/handlers/bot.handler";
import TelegramBot from "node-telegram-bot-api";

const proxy = process.env.PROXY;
if (proxy) {
  process.env.HTTP_PROXY = proxy ?? undefined;
  process.env.HTTPS_PROXY = proxy ?? undefined;
}
const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is not set in .env");

export const bot = new TelegramBot(token, { polling: true });

const runBot = async () => {
  new ManageHandlers(bot);
};

export default runBot;
