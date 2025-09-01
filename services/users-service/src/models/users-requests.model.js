import { DataTypes } from "sequelize";
import sequelize from "../config/postgres.js";

export default sersRequestsModel = sequelize.define(
  "UsersRequests",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    receiver_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    request_count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    answered_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected", "blocked"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "users_requests",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["sender_id", "receiver_id"],
      },
    ],
  }
);
