import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { setUserToken, setUserTelegramToken } from "src/cache/auth.cache";
import { PayloadType } from "src/types/payload.type";

import dotenv from "dotenv";

dotenv.config();

export const generateUserToken = async (payload: PayloadType) => {
  const secret = process.env.JWT_SECRET as Secret;
  if (!secret) throw new Error("JWT_SECRET is missing");

  const token = jwt.sign(payload, secret, { expiresIn: "30d" });
  await setUserToken(payload.user_id, token);
  await setUserTelegramToken(payload.telegram_id, token);

  console.log(token);
  return token;
};

export const verifyUserToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
};
