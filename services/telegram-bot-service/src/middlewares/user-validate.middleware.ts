import { Message } from "node-telegram-bot-api";
import { getUserByTelegramIdService } from "src/services/user.service";
import axios from "axios";
import BotResponse from "src/types/bot-response.type";
import { Next } from "src/types/next.type";

export const userValidateMiddleware = async (
  message: Message,
  response: BotResponse,
  next: Next
) => {
  const userTelegramId = message.from!.id;

  try {
    const result = await getUserByTelegramIdService(BigInt(userTelegramId));

    if (!result.error) {
      response.user.exists = true;
      response.user.id = result.data.id;
      console.log(`✅ User exists : ${result.data.id}`);
    } else if (result.error) {
      if (result.status === 404) {
        response.user.exists = false;
        console.log(`ℹ️ User not found : ${userTelegramId}`);
      }
    }
  } catch (error: any) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(
        `❌ Axios error: ${JSON.stringify(error.response?.status)} → ${
          JSON.stringify(error.response?.data) || error.message
        }`
      );
    } else {
      console.error(`❌ Unexpected error:`, error);
    }
    return;
  }

  await next();
};
