import { DataTypes } from "sequelize";
import dotenv from "dotenv";
import sequelize from "../config/postgres.js";

dotenv.config({ path: ".users.env" });

const usersModel = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    telegram_id: {
      type: DataTypes.BIGINT,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    indexes: [
      { fields: ["email"], unique: true, name: "unique_email" },
      { fields: ["telegram_id"], unique: true, name: "unique_telegram_id" },
    ],
  }
);

export default usersModel;
