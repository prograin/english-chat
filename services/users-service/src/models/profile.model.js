import sequelize from "../config/postgres.js";
import { DataTypes } from "sequelize";
import { GENDER_VALUES } from "../../../../shared/constants/genders.js";
import { CAREER_VALUES } from "../../../../shared/constants/careers.js";
import { INTEREST_VALUES } from "../../../../shared/constants/interests.js";

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
      onDelete: "CASCADE",
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
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    career: {
      type: DataTypes.STRING,
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
    state: {
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
