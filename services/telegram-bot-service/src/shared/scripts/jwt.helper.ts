import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".telegram.env" });

function generateUserToken(userId: Number, telegramId: Number) {
  console.log(jwt.sign({ user_id: userId, telegram_id: telegramId, role: "user" }, process.env.JWT_SECRET as Secret));
}

generateUserToken(42, 6608912631);
