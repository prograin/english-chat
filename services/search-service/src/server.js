import "module-alias/register.js";
import dotenv from "dotenv";
dotenv.config({ path: ".search.env" });

import { initIndexes } from "./indexes/indexManager.js";
import app from "./app.js";
import { profileConsumer } from "./event/consumers/profile.consumer.js";

(async () => {
  try {
    await initIndexes();
    console.log("✅ Elasticsearch indexes initialized");

    profileConsumer.init();

    const port = process.env.PORT || 3005;
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start the server:", err);
    process.exit(1);
  }
})();
