import dotenv from "dotenv";
dotenv.config({ path: ".chat.env" });

import sequelize from "./config/postgres.js";
import app from "./app.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized!");

    const port = process.env.PORT || 3006;
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to database:", err);
  }
})();
