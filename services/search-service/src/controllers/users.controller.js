import {
  createUserService,
  createUserByIdService,
  getUserByIdService,
  updateUserService,
  bulkUpdateUsersService,
} from "../services/users.service.js";

export const createUserController = async (req, res, next) => {
  try {
    const doc = req.body;
    const result = await createUserService(doc);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

export const createSelfUserController = async (req, res, next) => {
  try {
    const { id } = req.user.user_id;
    const data = req.body;
    const result = await createUserByIdService(id, data);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

export const createUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await createUserByIdService(id, data);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await getUserByIdService(id);
    res.status(200).json({ doc });
  } catch (err) {
    next(err);
  }
};

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
    const { data } = req.body;
    // users: [{ id: "1", fields: { last_active: "2025-09-29T10:00:00Z" } }, ...]

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "data must be a non-empty array" });
    }

    const result = await bulkUpdateUsersService(users);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
