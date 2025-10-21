import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import BotResponse from "src/bot/types/bot-response.type";
import { RelationSelfController } from "./relations.controller";
import { ProfileSelfController } from "../profile/profile.controller";
import { buildProfileRelation } from "./relations.helper";

export async function relationsListContactsReply(bot: TelegramBot, message: Message, response: BotResponse) {
  const userContacts = await RelationSelfController.userContacts(response.user.token as string);
  let userContactsIds = [];
  for (let userContact of userContacts.contacts) {
    userContactsIds.push(userContact.contact_user_id);
  }

  const profilesData = userContactsIds ? await ProfileSelfController.getProfiles(response.user.token || "", userContactsIds) : null;
  const profiles = profilesData?.data?.data || [];

  let messageText = "🔎 <b>Contacts</b>\n";
  if (profiles.length === 0) {
    messageText += "<blockquote>No contacts found.</blockquote>";
  } else {
    for (const profile of profiles) {
      messageText += buildProfileRelation(profile);
    }
  }

  await bot.sendMessage(message?.chat.id, messageText, { parse_mode: "HTML" });
}
