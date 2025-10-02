import { Sequelize } from "sequelize";

const sequelize = new Sequelize();

sequelize.define(
  "Test",
  {
    users: {
      primaryKey: true,
      //It for constraint and rules
      unique: true,
    },
  },
  {
    //It for indexes andfaster query
    indexes: [{ fields: ["users"], unique: true, name: "unique_username" }],
  }
);

// When alter is true every time "unique users" will be made
sequelize.sync({ alter: true });
