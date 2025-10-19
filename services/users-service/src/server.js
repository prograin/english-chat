import "module-alias/register.js";
import sequelize from "./config/postgres.js";
import app from "./app.js";
import { userConsumer } from "./events/consumers/user.consumer.js";

console.log("Database connected!");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized!");

    await userConsumer.init();

    const port = process.env.PORT || 3004;
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to database:", err);
  }
})();
