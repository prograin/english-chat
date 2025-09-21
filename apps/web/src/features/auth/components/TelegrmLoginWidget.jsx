import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function TelegramLoginWidget() {
  const { login } = useAuthContext();

  const handleTelegramAuth = (user) => {
    fetch("/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        login(data.token, data.user);
      })
      .catch((err) => console.error("Telegram login failed", err));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute("data-telegram-login", "ENGLISH_CHAT_AI_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-request-access", "write");

    // Expose handleTelegramAuth globally so Telegram can call it
    window.handleTelegramAuth = handleTelegramAuth;
    script.setAttribute("data-onauth", "handleTelegramAuth(user)");

    document.getElementById("telegram-button-container").appendChild(script);

    return () => {
      document.getElementById("telegram-button-container").innerHTML = "";
      delete window.handleTelegramAuth;
    };
  }, []);

  return <div id="telegram-button-container"></div>;
}
