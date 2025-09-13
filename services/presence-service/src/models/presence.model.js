import sequelize from "../config/postgres";
import { DataTypes } from "sequelize";

export default presenceModel = sequelize.define(
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
        model: "Users",
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
    tableName: "Presence",
    timestamps: true,
    indexes: [{ fields: ["user_id"], unique: true }],
    defaultScope: {
      order: [["last_active", "DESC"]],
    },
  }
);
