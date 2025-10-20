import TelegramBot, { Message, CallbackQuery } from "node-telegram-bot-api";
import BotResponse from "src/bot/types/bot-response.type";
import { BotEvent } from "src/bot/types/bot-event.type";
import relationsBlockReply from "./relations-block.reply";
import relationsContactReply from "./relations-contact.reply";
import { relationsListContactsReply } from "./relations-list-contacts.reply";
import { relationsListBlocksReply } from "./relations-list-blocks.reply";

const relationsMainReplyMessage = async (bot: TelegramBot, message: Message, response: BotResponse) => {};

const relationsMainReplyCallback = async (bot: TelegramBot, callbackQuery: CallbackQuery, response: BotResponse) => {
  const callbackDataPart = response.callback!.data.parts;
  const lastPart = callbackDataPart[callbackDataPart.length - 1];

  switch (lastPart) {
    case "unblock":
    case "block":
      await relationsBlockReply(bot, callbackQuery, response.user, callbackDataPart[callbackDataPart.length - 2], lastPart);
      break;

    case "addContact":
    case "removeContact":
      await relationsContactReply(bot, callbackQuery, response.user, callbackDataPart[callbackDataPart.length - 2], lastPart);
      break;

    case "listContacts":
      await relationsListContactsReply(bot, callbackQuery, response);
      break;

    case "listBlocks":
      await relationsListBlocksReply(bot, callbackQuery, response);
      break;
  }
};

export const relationsMainReplyInit = async (bot: TelegramBot, event: BotEvent, response: BotResponse) => {
  const chatId = "chat" in event ? event.chat.id : event.message?.chat.id;

  try {
    if ("data" in event) {
      await relationsMainReplyCallback(bot, event, response);
    } else if ("text" in event) {
      await relationsMainReplyMessage(bot, event, response);
    }
  } catch (error) {
    if (chatId) {
      await bot.sendMessage(chatId, "Something went wrong while processing your relation. Please try again.");
    }
  }
};

export default relationsMainReplyInit;
