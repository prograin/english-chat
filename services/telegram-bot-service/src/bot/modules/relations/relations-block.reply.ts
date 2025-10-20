import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import { RelationSelfController } from "./relations.controller";
import User from "src/bot/types/user.type";
import { user_is_blocked_text, user_is_unblocked_text } from "./relations.text";

async function relationsBlockReply(bot: TelegramBot, callback: CallbackQuery, fromUser: User, targetUserId: string, operation: string) {
  if (operation == "block") {
    await RelationSelfController.createBlock(fromUser.token || "", targetUserId);
    await bot.sendMessage(callback.message!.chat.id, user_is_blocked_text);
  } else if (operation == "unblock") {
    await RelationSelfController.deleteBlockByTargetId(fromUser.token || "", targetUserId);
    await bot.sendMessage(callback.message!.chat.id, user_is_unblocked_text);
  }
}

export default relationsBlockReply;
