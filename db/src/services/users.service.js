import { Op } from "sequelize";
import usersModel from "../models/users.model.js";
// import redis from "../config/redis.js";

// Get all users
export const getAllUsersService = async () => {
  return await usersModel.findAll();
};

// Get user by its id
export const getUserService = async (id) => {
  try {
    const user = await usersModel.findByPk(id);

    if (!user) {
      return { error: true, message: "User not found" };
    }

    return { error: false, data: user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: true, message: "Server error" };
  }
};

//Create New User  -->>  If Exists ,it will bre returned
export const createUserService = async (date) => {
  const existsUser = await usersModel.findOne({
    where: {
      [Op.or]: [{ email: date.email }, { username: DataTransfer.username }],
    },
  });

  if (existsUser) {
    return { error: true, message: "User already exists" };
  }

  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });

  const user = await modelUsers.create(data);
  return { error: false, data: user };
};
