import {
  getUserByTelegramIdService,
  createUserService,
  getAllUsersService,
  getUserService,
} from "../services/users.service.js";

//Create New User When User Start Telegram -->> If exists, it will be returned
export const postUserController = async (req, res) => {
  try {
    const data = req.validatedBody;
    const result = await createUserService(data);
    if (result.error) {
      return res.status(400).json({ message: result.message });
    }

    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message, server: "server error" });
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
export const getUserController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const result = await getUserService(id);

  if (result.error) {
    return res.status(404).json({ message: result.message });
  }

  return res.status(200).json(result.data);
};

// Get user by external id
export const getUserByExternalIdController = async (req, res) => {
  const { telegram_id } = req.query;

  if (!telegram_id) {
    return res
      .status(400)
      .json({ message: "You have to define external id like telegram_id" });
  }

  try {
    const result = await getUserByTelegramIdService(telegram_id);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    if (result.error) {
      return res.status(500).json({ message: result.error });
    }

    return res.status(200).json(result.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
