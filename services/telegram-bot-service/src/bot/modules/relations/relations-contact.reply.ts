import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { RelationSelfController } from "./relations.controller";
import User from "src/bot/types/user.type";
import { contact_is_added, contact_is_removed } from "./relations.text";

async function relationsContactReply(bot: TelegramBot, callback: CallbackQuery, fromUser: User, targetUserId: string, operation: string) {
  if (operation == "addContact") {
    await RelationSelfController.createContact(fromUser.token || "", targetUserId);
    await bot.sendMessage(callback.message!.chat.id, contact_is_added);
  } else if (operation == "removeContact") {
    await RelationSelfController.deleteContactByTargetId(fromUser.token || "", targetUserId);
    await bot.sendMessage(callback.message!.chat.id, contact_is_removed);
  }
}

export default relationsContactReply;
