import { DataTypes } from "sequelize";
import sequelize from "../config/postgres.js";

const usersTelegramModel = sequelize.define(
  "UsersTelegram",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    last_active: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "users_telegram",
    timestamps: true,
  }
);

export default usersTelegramModel;
