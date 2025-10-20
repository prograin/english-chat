import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import BotResponse from "src/bot/types/bot-response.type";
import { RelationSelfController } from "./relations.controller";
import { ProfileSelfController } from "../profile/profile.controller";

export async function relationsListContactsReply(bot: TelegramBot, callback: CallbackQuery, response: BotResponse) {
  const userId = response.user.id;
  const userContacts = await RelationSelfController.userContacts(response.user.token as string);
  let userContactsIds = [];
  for (let userContact of userContacts.contacts) {
    userContactsIds.push(userContact.contact_user_id);
  }

  const profilesData = await ProfileSelfController.getProfiles(response.user.token || "", userContactsIds);
}
