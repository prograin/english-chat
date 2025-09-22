import { useEffect, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TelegramLoginWidget() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleTelegramAuth = async (user) => {
    try {
      const res = await fetch("/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Auth failed: ${res.status} ${errText}`);
      }

      const { data } = await res.json();
      login(data.token, data.user);
      navigate("/user/profile");
    } catch (err) {
      console.error("Telegram login failed", err);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute("data-telegram-login", "ENGLISH_CHAT_AI_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-request-access", "write");

    window.handleTelegramAuth = handleTelegramAuth;
    script.setAttribute("data-onauth", "handleTelegramAuth(user)");

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      delete window.handleTelegramAuth;
    };
  }, []);

  return <div ref={containerRef}></div>;
}
