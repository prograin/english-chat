import BotResponse from "src/shared/types/bot-response.type";
import { Next } from "src/shared/types/next.type";
import { BotEvent } from "src/shared/types/bot-event.type";
import { UserAdminController, UserSelfController } from "src/bot/messages/users/user.controller";
import { generateUserToken } from "src/shared/utils/auth.util";
import { setUserTelegramToken, setUserToken } from "src/api/cache/auth.cache";

export const userValidateInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  if (response.user.exists) {
    await next();
  }

  const userTelegramId = event.from!.id;
  let result;
  try {
    result = await UserAdminController.getUserByTelegramId(BigInt(userTelegramId));

    if (!result.error) {
      response.user.exists = true;
      response.user.id = result.data.id;
      const token = await generateUserToken({
        user_id: Number(response.user.id),
        telegram_id: userTelegramId,
        role: "user",
      });
      await setUserToken(Number(response.user.id), token);
      await setUserTelegramToken(userTelegramId, token);

      console.log(`✅ User exists : ${result.data.id}`);
    } else if (result.error) {
      if (result.status === 404) {
        response.user.exists = false;
        console.log(`ℹ️ User not found : ${userTelegramId}`);
      }
    }
  } catch (error: any) {
    console.error(error);
    return;
  }

  await next();
};
