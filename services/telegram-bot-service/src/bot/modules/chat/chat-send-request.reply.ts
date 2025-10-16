import TelegramBot, { CallbackQuery, Message } from "node-telegram-bot-api";
import { UserAdminController } from "../users/user.controller";
import { ChatSelfController } from "./chat.controller";
import User from "src/bot/types/user.type";
import { recieved_request, requests_was_sent_text, send_request_text } from "./chat.text";

const THRESHOLD = 4 * 60 * 1000;

async function chatSendRequestReply(bot: TelegramBot, callbackQuery: CallbackQuery, from_user: User, to_user_id: number) {
  const to_user_response = await UserAdminController.getUserById(to_user_id);
  const to_user = to_user_response.data;
  const to_telegram_chat_id = to_user.telegram_chat_id;

  const from_user_id = from_user.id;
  const from_token = from_user.token;
  const from_username = from_user.profile?.username;
  const from_telegram_chat_id = callbackQuery.message!.chat.id;

  const data = await ChatSelfController.getRequestByTarget(from_token || "", to_user_id);
  let request;
  if (!data.error) {
    request = data.request;
    const updated_at = new Date(request.updatedAt).getTime();
    const now = Date.now();

    const elapsed = now - updated_at;

    if (elapsed < THRESHOLD) {
      await bot.answerCallbackQuery(callbackQuery.id, { text: requests_was_sent_text(elapsed), show_alert: true });
    } else {
      await bot.sendMessage(to_telegram_chat_id, recieved_request(from_username));
      await bot.sendMessage(from_telegram_chat_id, send_request_text);
      await ChatSelfController.createRequest(from_token || "", Number(from_user_id), to_user_id);
    }
  } else {
    if (data.status === 404) {
      await bot.sendMessage(to_telegram_chat_id, recieved_request(from_username));
      await bot.sendMessage(from_telegram_chat_id, send_request_text);
      await ChatSelfController.createRequest(from_token || "", Number(from_user_id), to_user_id);
    }
  }
}

export default chatSendRequestReply;
