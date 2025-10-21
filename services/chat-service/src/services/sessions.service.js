import { ErrorUtil } from "../utils/error.util.js";
import {
  createSession,
  getSessionsByFilter,
  getSessionsByUserId,
  getSessionsByTargetId,
  updateSessionStatus,
} from "../repositories/sessions.repository.js";

export const createSessionService = async (userId, partnerId) => {
  const existing = await getSessionsByFilter({ userId, partnerId, status: "active" });
  if (existing.length !== 0) throw new ErrorUtil("Session already exists", 409);

  const session = await createSession(userId, partnerId, "active");
  return session;
};

export const getActiveSessionService = async (userId) => {
  return await getSessionsByFilter({ userId, status: "active" });
};

export const getSessionsService = async (userId) => {
  return await getSessionsByUserId(userId);
};

export const getSessionByTargetService = async (userId, partnerId) => {
  return await getSessionsByTargetId(userId, partnerId);
};

export const updateSessionService = async (userId, partnerId, status) => {
  const updated = await updateSessionStatus(userId, partnerId, status);
  if (!updated) throw new ErrorUtil("Session not found", 404);
  return updated;
};
