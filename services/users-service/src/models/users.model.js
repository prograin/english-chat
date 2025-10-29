import { DataTypes } from "sequelize";
import dotenv from "dotenv";
import sequelize from "../config/postgres.js";
import { removeAllContraints } from "../utils/sequelize.util.js";

dotenv.config({ path: ".users.env" });

// removeAllContraints("users");

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
    telegram_chat_id: {
      type: DataTypes.BIGINT,
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
    is_bot: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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
