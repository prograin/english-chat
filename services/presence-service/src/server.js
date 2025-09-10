import app from "../src/app.js";
import dotenv from "dotenv";
import eventBus from "./events/bus/event.bus.js";
import { initUserButtonClickedSubscriber } from "./events/subscribers/user-button-clicked.subscriber.js";
import { syncUsersPresenceCacheJob } from "./jobs/sync-cache.job.js";

dotenv.config();

(async () => {
  try {
    // Pub/Sub
    await eventBus.init();
    await initUserButtonClickedSubscriber();

    // Jobs
    syncUsersPresenceCacheJob.start();

    // Express
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
  }
})();
