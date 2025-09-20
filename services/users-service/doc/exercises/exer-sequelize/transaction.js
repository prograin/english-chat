import sequelize from "../../../src/config/postgres";
import usersModel from "../../../src/models/users.model";

// if errro throw all things roll backup
// We use for get because transaction is isolated and if we create user and
// get it without tranasction , it return nothing or old data
sequelize.transaction((t) => {
  usersModel.findOne({ where: {} }, (options = { transaction: t }));
  usersModel.create({}, (options = { transaction: t }));
});
