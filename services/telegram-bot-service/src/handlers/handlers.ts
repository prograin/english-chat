import TelegramBot, { Message } from "node-telegram-bot-api";
import start from "src/messages/reply/start";
import profile from "src/messages/reply/profile";
import { userButtonClickedMiddleware } from "src/middlewares/user-button-clicked.middleware";
import { messageValidateMiddleware } from "src/middlewares/message-validate.middleware";
import { userValidateMiddleware } from "src/middlewares/user-validate.middleware";
import { middlewareRunner } from "src/middlewares/runner/middleware-runner";

export class ManageHandlers {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.commandHandler();
    this.callbackHandler();
  }

  async commandHandler() {
    this.bot.onText(
      /\/start/,
      middlewareRunner(
        this.bot,
        [messageValidateMiddleware, userValidateMiddleware, userButtonClickedMiddleware],
        start
      )
    );
  }

  async callbackHandler() {
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
