import "module-alias/register.js";
import sequelize from "./config/postgres.js";
import app from "./app.js";

console.log("Database connected!");

(async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized!");

    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to database:", err);
  }
})();
