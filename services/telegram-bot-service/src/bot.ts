require("dotenv").config();
import { ManageHandlers } from "src/handlers/handlers";

const TelegramBot = require("node-telegram-bot-api");

const runBot = async () => {
  const token = process.env.BOT_TOKEN;
  const bot = new TelegramBot(token, { polling: true });

  new ManageHandlers(bot);
};

export default runBot;
