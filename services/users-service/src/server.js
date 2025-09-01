import "module-alias/register.js";
import sequelize from "./config/postgres.js";
import app from "./app.js";

console.log("Database connected!");

(async () => {
  try {
    sequelize.authenticate();
    await sequelize.sync({ alter: true });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Unable to connect to database:", err);
  }
})();
