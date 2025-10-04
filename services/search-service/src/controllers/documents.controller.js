import { createDocService, createDocByIdService, getDocByIdService, updateDocService, bulkUpdateDocsService } from "../services/documents.service.js";

export const createDocController = async (req, res, next) => {
  try {
    const doc = req.body;
    const result = await createDocService(doc);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

export const createSelfDocController = async (req, res, next) => {
  try {
    const { id } = req.user.user_id;
    const data = req.body;
    const result = await createDocByIdService(id, data);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

export const createDocByIdController = async (req, res, next) => {
  try {
    const { id, index } = req.params;
    const data = req.body;
    const result = await createDocByIdService(index, id, data);
    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

export const getDocByIdController = async (req, res, next) => {
  try {
    const { id, index } = req.params;
    const doc = await getDocByIdService(index, id);
    res.status(200).json({ doc });
  } catch (err) {
    next(err);
  }
};

export const updateDocController = async (req, res, next) => {
  try {
    const { id, index } = req.params;
    const fieldsToUpdate = req.body; // partial fields to update
    const result = await updateDocService(index, id, fieldsToUpdate);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

export const bulkUpdateDocsController = async (req, res, next) => {
  try {
    const { data } = req.body;
    // users: [{ id: "1", fields: { last_active: "2025-09-29T10:00:00Z" } }, ...]

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "data must be a non-empty array" });
    }

    const result = await bulkUpdateDocsService(data);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
