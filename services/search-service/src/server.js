import "module-alias/register.js";
import dotenv from "dotenv";
import { initIndexes } from "./indexes/indexManager.js";
import app from "./app.js";

dotenv.config({ path: ".search.env" });

(async () => {
  try {
    await initIndexes();
    console.log("✅ Elasticsearch indexes initialized");

    const port = process.env.PORT || 3005;
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start the server:", err);
    process.exit(1);
  }
})();
