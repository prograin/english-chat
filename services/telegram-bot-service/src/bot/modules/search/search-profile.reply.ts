import TelegramBot, { Message } from "node-telegram-bot-api";
import { ProfileAdminController } from "../profile/profile.controller";
import { profile_not_found_text } from "./search.text";
import { buildProfileSearch } from "./search.helper";

async function searchProfileReply(bot: TelegramBot, message: Message | undefined, username: string) {
  const profile = await ProfileAdminController.getProfileByUsername(username);
  if (!profile) {
    await bot.sendMessage(message!.chat.id, profile_not_found_text(username));
  } else {
    const profileText = buildProfileSearch(profile);
    console.log(profileText);
    bot.sendMessage(message!.chat.id, profileText, { parse_mode: "HTML" });
  }
}

export default searchProfileReply;
