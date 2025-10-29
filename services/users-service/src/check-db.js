// src/check-db.js
import sequelize from "./config/postgres.js";
import usersModel from "./models/users.model.js";

(async () => {
  try {
    await sequelize.authenticate();
    await usersModel.findOne();
    console.log("✅ Database ready and users table exists");
    process.exit(0);
  } catch (err) {
    console.error("❌ Database not ready or users table missing:", err.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();
