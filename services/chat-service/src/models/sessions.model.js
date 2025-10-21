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
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    partner_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
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
      { fields: ["user_id"], name: "idx_user_id" },
      { fields: ["partner_id"], name: "idx_partner_id" },
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
