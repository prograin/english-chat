import BotResponse from "src/bot/types/bot-response.type";
import { Next } from "src/bot/types/next.type";
import { BotEvent } from "src/bot/types/bot-event.type";
import { UserAdminController, UserSelfController } from "src/bot/modules/users/user.controller";
import { generateUserToken } from "src/api/utils/auth.util";
import { setUserTelegramToken, setUserToken } from "src/api/cache/auth.cache";

export const userValidateInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  if (response.user.exists) {
    await next();
    return;
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
