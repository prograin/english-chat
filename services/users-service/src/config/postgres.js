import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: ".users.env" });
console.log("---------------------");
console.log(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false, // true if you want SQL logging
});

export default sequelize;
