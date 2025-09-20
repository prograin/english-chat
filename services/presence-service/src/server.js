import app from "../src/app.js";
import dotenv from "dotenv";
import eventBus from "./events/bus/event.bus.js";
import { initUserButtonClickedSubscriber } from "./events/subscribers/user-button-clicked.subscriber.js";
import { syncPresenceCacheJob } from "./jobs/sync-cache.job.js";
import sequelize from "./config/postgres.js";

dotenv.config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized!");

    // Pub/Sub
    await eventBus.init();
    await initUserButtonClickedSubscriber();

    // Jobs
    syncPresenceCacheJob.start();

    // Express
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
  }
})();
