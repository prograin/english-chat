require("tsconfig-paths/register");

import { bot } from "../../bot-entry";

async function sendMsg() {
  await bot.sendMessage(6608912631, "Hi");
}

sendMsg();
