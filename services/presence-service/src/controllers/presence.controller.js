import { createPresenceService, getPresenceByUserIdService } from "../services/presence.service.js";

export const postPresenceController = async (req, res, next) => {
  try {
    const data = req.validatedBody;
    const presence = await createPresenceService(data);

    res.status(201).json({ data: presence });
  } catch (err) {
    next(err);
  }
};

export const getPresenceByUserIdController = async (req, res, next) => {
  try {
    const query = req.query;

    if (query.user_id) {
      const presence = await getPresenceByUserIdService(query.user_id);
      if (!presence) return res.status(404).json({ message: "Presence not found" });
    } else {
      return res.status(400).json({ message: "(user_id) is required" });
    }

    res.status(200).json({ data: presence });
  } catch (err) {
    next(err);
  }
};
