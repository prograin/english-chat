import sequelize from "../config/postgres.js";
import { DataTypes } from "sequelize";

const Contacts = sequelize.define(
  "Contacts",
  {
    id: {
      type: DataTypes.BIGINT,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    contact_user_id: {
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: "contacts",
    timestamps: true,
    indexes: [
      { fields: ["user_id"], name: "idx_contacts_user_id" },
      { fields: ["user_id", "contact_user_id"], unique: true, name: "idx_contacts_user_id_contact_user_id" }, // composite unique
    ],
  }
);

export default Contacts;
