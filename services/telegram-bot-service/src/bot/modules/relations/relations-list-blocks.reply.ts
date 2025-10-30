import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import BotResponse from "src/bot/types/bot-response.type";
import { RelationSelfController } from "./relations.controller";
import { ProfileSelfController } from "../profile/profile.controller";
import { buildProfileRelation } from "./relations.helper";

export async function relationsListBlocksReply(bot: TelegramBot, message: Message, response: BotResponse) {
  const userBlocks = await RelationSelfController.userBlocks(response.user.token as string);
  let userBlocksIds = [];
  for (let userBlock of userBlocks.blocks) {
    userBlocksIds.push(userBlock.block_user_id);
  }

  const profilesData = userBlocks ? await ProfileSelfController.getProfiles(response.user.token || "", userBlocksIds) : null;
  const profiles = profilesData?.data?.data || [];

  let messageText = "🔎 <b>Your Blocks</b>\n";
  if (profiles.length === 0) {
    messageText += "<blockquote>No blocks found.</blockquote>";
  } else {
    for (const profile of profiles) {
      messageText += buildProfileRelation(profile);
    }
  }

  await bot.sendMessage(message?.chat.id, messageText, { parse_mode: "HTML" });
}
