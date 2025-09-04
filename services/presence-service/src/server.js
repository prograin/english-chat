import app from "../src/app.js";
import dotenv from "dotenv";
import eventBus from "./events/bus/event.bus.js";
import { initUserClickedSubscriber } from "./events/subscribers/user-clicked.subscriber.js";

dotenv.config();

(async () => {
  try {
    await eventBus.init();
    await initUserClickedSubscriber();
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
  }
})();
