import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import start from "src/bot/messages/start/start.reply";
import search from "src/bot/messages/search/search.reply";
import profile from "src/bot/messages/profile/profile.reply";
import { CommandExpression } from "src/bot/buttons/command.button";
import { InlineCallback } from "../../bot/buttons/inline.button";
import { userButtonClickedInterceptor } from "src/bot/interceptor/user-button-clicked.interceptor";
import { messageValidateInterceptor } from "src/bot/interceptor/message-validate.interceptor";
import { authInterceptor } from "src/bot/interceptor/auth.interceptor";
import { userValidateInterceptor } from "src/bot/interceptor/user-validate.interceptor";
import { interceptorRunner } from "src/bot/interceptor/runner/interceptor-runner";
import { BotEvent } from "src/shared/types/bot-event.type";
import { userTokenValidateInterceptor } from "src/bot/interceptor/user-token-validate.interceptor";
import { splitCallbackDataInterceptor } from "../interceptor/split-callback-data.interceptor";

export class ManageHandlers {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
    this.commandHandler();
    this.callbackHandler();
  }

  async commandHandler() {
    this.bot.onText(
      CommandExpression.c_start_exp,
      interceptorRunner(
        this.bot,
        [messageValidateInterceptor, userTokenValidateInterceptor, userValidateInterceptor, userButtonClickedInterceptor],
        start
      )
    );
  }

  async callbackHandler() {
    this.bot.on(
      "callback_query",
      interceptorRunner(
        this.bot,
        [messageValidateInterceptor, authInterceptor, userButtonClickedInterceptor, splitCallbackDataInterceptor],
        async (bot, event: BotEvent, response) => {
          const callbackQuery = event as CallbackQuery;

          const message = callbackQuery.message;
          const data = callbackQuery.data;
          const chatId = message?.chat.id;

          if (!chatId) {
            return;
          }

          switch (data) {
            case InlineCallback.in_profile_c:
              await profile(this.bot, callbackQuery);
              break;

            case InlineCallback.in_random_chat_c:
              console.log("start search");
              break;

            case InlineCallback.in_edit_c:
              console.log("edit profile");
              break;

            case InlineCallback.in_search_c:
              await search(this.bot, callbackQuery, response);
              break;
          }
        }
      )
    );
  }
}
