import {
  createSessionService,
  getSessionsService,
  getSessionsByTargetService,
  updateSessionService,
  getActiveSessionService,
  checkActiveSessionService,
} from "../services/sessions.service.js";

export const createSessionController = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user.user_id;
    const partnerId = req.body.partner_id;

    const session = await createSessionService(userId, partnerId);
    return res.status(201).json({
      message: "Session created successfully",
      session,
    });
  } catch (error) {
    next(error);
  }
};

export const getSessionsController = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user.user_id;
    let sessions;

    if (req.query.active === "true") {
      sessions = await getActiveSessionService(userId);
    } else {
      sessions = await getSessionsService(userId);
    }

    return res.status(200).json({ sessions });
  } catch (error) {
    next(error);
  }
};

export const getSessionsByTargetController = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const partnerId = req.params.targetId;

    const session = await getSessionsByTargetService(userId, partnerId);
    return res.status(200).json({ session });
  } catch (error) {
    next(error);
  }
};

export const updateSessionController = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const partnerId = req.body.partner_id;
    const { status } = req.body;

    const session = await updateSessionService(userId, partnerId, status);
    return res.status(200).json({
      message: "Session updated successfully",
      session,
    });
  } catch (error) {
    next(error);
  }
};

export const checkActiveSessionController = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const isActive = await checkActiveSessionService(userId);

    res.status(200).json({
      message: "Session status checked successfully",
      isActive,
    });
  } catch (error) {
    next(error);
  }
};
