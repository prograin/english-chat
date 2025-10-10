import dotenv from "dotenv";
dotenv.config({ path: ".presence.env" });

import app from "../src/app.js";
import eventBus from "./events/bus/event.bus.js";
import { initUserButtonClickedSubscriber } from "./events/subscribers/user-button-clicked.subscriber.js";
import sequelize from "./config/postgres.js";
import { clearInactiveUsersPresenceCacheJob, syncUsersPresenceCacheJob } from "./jobs/users-cache.job.js";

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
    syncUsersPresenceCacheJob.start();
    clearInactiveUsersPresenceCacheJob.start();

    // Express
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
  }
})();
