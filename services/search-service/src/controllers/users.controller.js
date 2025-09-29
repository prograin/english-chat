import {
  createUserService,
  createUserByIdService,
  getUserByIdService,
  deleteUserService,
  updateUserService,
} from "../services/users.service.js";

// Create new user
export const createUserController = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await createUserService(user);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

// Create/update by ID
export const createUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const result = await createUserByIdService(id, user);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

// Get user by ID
export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteUserService(id);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

// Update user partially
export const updateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fieldsToUpdate = req.body; // partial fields to update
    const result = await updateUserService(id, fieldsToUpdate);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const bulkUpdateUsersController = async (req, res, next) => {
  try {
    const { users } = req.body;
    // users: [{ id: "1", fields: { last_active: "2025-09-29T10:00:00Z" } }, ...]

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ error: "users must be a non-empty array" });
    }

    const result = await bulkUpdateUsersService(users);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
