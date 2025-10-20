import TelegramBot, { Message } from "node-telegram-bot-api";
import { ProfileAdminController } from "../profile/profile.controller";
import { profile_not_found_text } from "./search.text";
import { buildProfileSearch } from "./search.helper";
import { ma_search_profile_in } from "./search.markup";
import User from "src/bot/types/user.type";
import { RelationSelfController } from "../relations/relations.controller";

async function searchProfileReply(bot: TelegramBot, message: Message | undefined, fromUser: User, username: string) {
  const toProfile = await ProfileAdminController.getProfileByUsername(username);
  if (!toProfile) {
    await bot.sendMessage(message!.chat.id, profile_not_found_text(username));
  } else {
    const blockResponse = await RelationSelfController.checkBlockByTargetId(fromUser.token || "", toProfile.user_id);
    const contactResponse = await RelationSelfController.checkContactByTargetId(fromUser.token || "", toProfile.user_id);

    const profileText = buildProfileSearch(toProfile);
    bot.sendMessage(message!.chat.id, profileText, {
      reply_markup: {
        inline_keyboard: ma_search_profile_in(String(toProfile.user_id), blockResponse.isBlocked, contactResponse.isContact),
      },
      parse_mode: "HTML",
    });
  }
}

export default searchProfileReply;
