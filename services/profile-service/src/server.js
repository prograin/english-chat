import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import sequelize from "./config/postgres.js";

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    await sequelize.sync({ alter: true });
    console.log("✅ Profile Database synchronized!");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Profile Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to run profile service:", err);
  }
};

main();
