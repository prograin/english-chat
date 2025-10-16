import { createOrUpdateService, getRequestByTargetService } from "../services/requests.service.js";
import requestsCache from "../cache/requests.cache.js";

export const createOrUpdateController = async (req, res, next) => {
  try {
    const { sender_user_id, reciever_user_id, status } = req.body;

    if (!sender_user_id || !reciever_user_id) {
      return res.status(400).json({
        success: false,
        message: "Both sender_user_id and reciever_user_id are required.",
      });
    }

    await createOrUpdateService(sender_user_id, reciever_user_id, status);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getRequestsController = async () => {}; // result is a list

export const getRequestByTargetController = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { targetId } = req.params;

    const request = await getRequestByTargetService(userId, targetId);

    if (!request) {
      return res.status(404).json({ error: true, message: "Request not found" });
    }

    return res.status(200).json({ request });
  } catch (error) {
    next(error);
  }
};
