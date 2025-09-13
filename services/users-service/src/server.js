import "module-alias/register.js";
import sequelize from "./config/postgres.js";
import app from "./app.js";
import eventbus from "./events/bus/eventbus.js";

console.log("Database connected!");

(async () => {
  try {
    await eventbus.init();

    await sequelize.authenticate();
    console.log("✅ Database connected!");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized!");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to database:", err);
  }
})();
