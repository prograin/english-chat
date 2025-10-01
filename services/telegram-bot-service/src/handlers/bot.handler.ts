import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import start from "src/bot/messages/start/start.reply";
import search from "src/bot/messages/search/search.reply";
import profile from "src/bot/messages/profile/profile.reply";
import { CommandExpression } from "src/bot/buttons/command.button";
import { InlineCallback } from "../bot/buttons/inline.button";
import { userButtonClickedInterceptor } from "src/interceptor/user-button-clicked.interceptor";
import { messageValidateInterceptor } from "src/interceptor/message-validate.interceptor";
import { authInterceptor } from "src/interceptor/auth.interceptor";
import { userValidateInterceptor } from "src/interceptor/user-validate.interceptor";
import { interceptorRunner } from "src/interceptor/runner/interceptor-runner";
import { BotEvent } from "src/types/bot-event.type";
import { searchInterestsReply } from "src/bot/messages/search/search-interests.reply";
import { userTokenValidateInterceptor } from "src/interceptor/user-token-validate.interceptor";

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
        [messageValidateInterceptor, authInterceptor, userButtonClickedInterceptor],
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
              await profile(this.bot, message);
              break;

            case InlineCallback.in_random_chat_c:
              console.log("start search");
              break;

            case InlineCallback.in_edit_c:
              console.log("edit profile");
              break;

            case InlineCallback.in_search_c:
              await search(this.bot, message, response);
              break;

            case InlineCallback.in_search_interests_c:
              await searchInterestsReply(this.bot, message, response);
              break;
          }
        }
      )
    );
  }
}
