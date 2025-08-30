import { DataTypes } from "sequelize";
import sequelize from "../config/postgres.js";

const UsersRating = sequelize.define(
  "UsersRating",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    rater_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    rated_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },

    recommendation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "users_rating",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["rater_id", "rated_id"],
      },
      {
        fields: ["rated_id"],
      },
    ],
  }
);

export default UsersRating;
