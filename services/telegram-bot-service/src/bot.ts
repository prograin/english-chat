import { Message } from "node-telegram-bot-api";

require("module-alias/register");
require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
import { ManageHandlers } from "src/handlers/handlers";

const token = process.env.BOT_TOKEN;
console.log(token);

const bot = new TelegramBot(token, { polling: true });

new ManageHandlers(bot);
