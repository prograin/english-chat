import sequelize from "../config/postgres.js";
import { DataTypes } from "sequelize";

const Blocks = sequelize.define(
  "Blocks",
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
    block_user_id: {
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: "blocks",
    timestamps: true,
    indexes: [
      { fields: ["user_id"], name: "idx_blocks_user_id" },
      { fields: ["user_id", "block_user_id"], unique: true, name: "idx_blocks_user_id_block_user_id" }, // composite unique
    ],
  }
);

export default Blocks;
