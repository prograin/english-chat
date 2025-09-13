import {
  getUserByTelegramIdService,
  createUserService,
  getAllUsersService,
  getUserService,
} from "../services/users.service.js";

//Create New User When User Start Telegram -->> If exists, it will be returned
export const postUserController = async (req, res, next) => {
  try {
    const data = req.validatedBody;
    const user = await createUserService(data);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

// Get user
export const getUserController = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await getUserService(id);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Get user by external id
export const getUserByExternalIdController = async (req, res, next) => {
  const { telegram_id } = req.query;

  if (!telegram_id) {
    return res.status(400).json({ message: "You have to define external id like telegram_id" });
  }

  try {
    const data = await getUserByTelegramIdService(telegram_id);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
