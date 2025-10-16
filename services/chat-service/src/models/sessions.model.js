import { DataTypes } from "sequelize";
import sequelize from "../config/postgres.js";

const SessionsModel = sequelize.define(
  "Sessions",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_1: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    user_2: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    started_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ended_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "ended"),
      defaultValue: "active",
    },
  },
  {
    tableName: "sessions",
    timestamps: true,

    indexes: [
      { fields: ["user_1"], name: "idx_user_1" },
      { fields: ["user_2"], name: "idx_user_2" },
      { fields: ["status"], name: "idx_status" },
    ],
  }
);

SessionsModel.beforeUpdate((session) => {
  if (session.changed("status") && session.status === "ended") {
    session.ended_at = new Date();
  }
});

export default SessionsModel;
