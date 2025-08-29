import TelegramBot, { Message } from "node-telegram-bot-api";
import start from "src/messages/reply/start";
import profile from "src/messages/reply/profile";

export class ManageHandlers {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.commandHandler();
    this.callbackHandler();
  }

  commandHandler() {
    this.bot.onText(/\/start/, async (msg: Message) => start(this.bot, msg));
  }

  callbackHandler() {
    this.bot.on("callback_query", async (callbackQuery) => {
      const message = callbackQuery.message;
      const data = callbackQuery.data;
      const chatId = message?.chat.id;

      if (!chatId) {
        return;
      }

      switch (data) {
        case "PROFILE::":
          await profile(this.bot, message);
          break;

        case "RANDOMSEARCH::":
          console.log("start search");
          break;
      }
    });
  }
}
