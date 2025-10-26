import dotenv from "dotenv";
dotenv.config();

export async function telegramLogin(data) {
  const res = await fetch(`http://${process.env.API_URL}:3003/auth/telegram`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login Failed");
  return res.json();
}
