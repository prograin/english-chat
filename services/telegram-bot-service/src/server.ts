import "module-alias/register";

import app from "./app";
import runBot from "./bot-entry";
import dotenv from "dotenv";

dotenv.config({ path: ".telegram.env" });

const startServer = async () => {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3003;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    runBot();
    console.log("Telegram bot started successfully");
  } catch (error) {
    console.error("Failed to start server or bot:", error);
    process.exit(1);
  }
};

startServer();
