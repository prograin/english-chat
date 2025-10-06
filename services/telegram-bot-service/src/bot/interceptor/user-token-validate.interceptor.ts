import BotResponse from "src/shared/types/bot-response.type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Next } from "src/shared/types/next.type";
import { BotEvent } from "src/shared/types/bot-event.type";
import { getUserTelegramToken } from "src/api/cache/auth.cache";

export const userTokenValidateInterceptor = async (event: BotEvent, response: BotResponse, next: Next) => {
  const token = await getUserTelegramToken(Number(event.from?.id));
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      response.user.token = token;
      response.user.id = decoded.user_id;
      response.user.telegram_id = decoded.telegram_id;
      response.user.exists = true;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        console.log("Token has expired");
      } else {
        console.log("Token is invalid:", err.message);
      }
    }
  }

  next();
};
