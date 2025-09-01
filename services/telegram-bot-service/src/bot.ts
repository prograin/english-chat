require("module-alias/register");
require("dotenv").config();
import { ManageHandlers } from "src/handlers/handlers";

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
console.log(token);

const bot = new TelegramBot(token, { polling: true });

new ManageHandlers(bot);
