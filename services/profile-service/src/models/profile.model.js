import sequelize from "../config/postgres.js";
import { CAREERS, INTERESTS } from "../config/constants.js";
import { DataTypes } from "sequelize";

const ProfileModel = sequelize.define(
  "Profiles",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0, max: 120 },
    },
    gender: {
      type: DataTypes.STRING,
      validate: { isIn: ["male", "female", "other"] },
      allowNull: true,
    },
    career: {
      type: DataTypes.STRING,
      validate: { isIn: [...CAREERS] },
      allowNull: true,
    },
    interests: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "profiles",
    timestamps: true,
    indexes: [
      { fields: ["user_id"], name: "index_user_id" },
      { fields: ["career"], name: "index_career" },
      { fields: ["age"], name: "index_age" },
    ],
  }
);

export default ProfileModel;
