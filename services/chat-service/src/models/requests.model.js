import { DataTypes } from "sequelize";
import sequelize from "../config/postgres.js";
import { CHAT_REQUEST_STATUS } from "../../../../shared/constants/status.js";

const RequestsModel = sequelize.define(
  "Requests",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    reciever_user_id: {
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
    rejected_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(...CHAT_REQUEST_STATUS),
      defaultValue: "pending",
    },
  },
  {
    tableName: "requests",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["sender_user_id", "reciever_user_id"],
        name: "idx_sender_receiver",
      },
    ],
  }
);

RequestsModel.beforeUpdate((request) => {
  if (request.changed("status")) {
    switch (request.status) {
      case "accepted":
        request.answered_count += 1;
        break;
      case "pending":
        request.request_count += 1;
        break;
      case "rejected":
        request.rejected_count += 1;
        break;
    }
  }
});

export default RequestsModel;
