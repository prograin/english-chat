import sequelize from "../config/postgres.js";
import { DataTypes } from "sequelize";

const presenceModel = sequelize.define(
  "Presence",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    last_active: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "presence",
    timestamps: true,
    indexes: [{ fields: ["user_id"], unique: true, name: "unique_user_id" }],
    defaultScope: {
      order: [["last_active", "DESC"]],
    },
  }
);

export default presenceModel;
