import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".telegram.env" });

function generateUserToken(userId: Number, telegramId: Number) {
  console.log(jwt.sign({ user_id: userId, telegram_id: telegramId, role: "admin" }, process.env.JWT_SECRET as Secret, { expiresIn: "365d" }));
}

// generateUserToken(1, 111111111111);
// generateUserToken(59, 6608912631);
// generateUserToken(60, 1221951839);
