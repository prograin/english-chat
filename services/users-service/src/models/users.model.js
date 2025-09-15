import { DataTypes } from "sequelize";
import dotenv from "dotenv";
import sequelize from "../config/postgres.js";

dotenv.config();

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
    username: {
      type: DataTypes.STRING,
      allowNull: true,
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
      { fields: ["username"], unique: true, name: "unique_username" },
      { fields: ["email"], unique: true, name: "unique_email" },
      { fields: ["telegram_id"], unique: true, name: "unique_telegram_id" },
    ],
  }
);

export default usersModel;
