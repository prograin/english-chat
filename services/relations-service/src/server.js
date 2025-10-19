import dotenv from "dotenv";
dotenv.config({ path: ".relation.env" });

(async () => {
  const { default: sequelize } = await import("./config/postgres.js");
  const { default: app } = await import("./app.js");

  try {
    await sequelize.authenticate();
    console.log("✅ Database connected!");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized!");

    const port = process.env.PORT || 3007;
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to database:", err);
  }
})();
