import TelegramBot, { Message } from "node-telegram-bot-api";
import start from "src/bot/messages/reply/start";
import profile from "src/bot/messages/reply/profile";
import { userButtonClickedInterceptor } from "src/interceptor/user-button-clicked.interceptor";
import { messageValidateInterceptor } from "src/interceptor/message-validate.interceptor";
import { userValidateInterceptor } from "src/interceptor/user-validate.interceptor";
import { middlewareRunner } from "src/interceptor/runner/interceptor-runner";

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
        [messageValidateInterceptor, userValidateInterceptor, userButtonClickedInterceptor],
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

        case "EDIT::":
          console.log("edit profile");
          break;
      }
    });
  }
}
