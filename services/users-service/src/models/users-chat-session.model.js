import sequelize from "../config/postgres";

sequelize.define(
  "UsersChatSession",
  {
    id: {},
    user_a_id: {
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    user_b_id: {
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    is_active: {},
    blocked_by: {},
  },
  {
    timestamp: true,
    tableName: "users_chat_session",
  }
);
