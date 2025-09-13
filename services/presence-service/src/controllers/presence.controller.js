import { createPresenceService } from "../services/presence.service";
export const postPresenceController = async (req, res, next) => {
  try {
    const data = req.validateBody;
    const presence = await createPresenceService(data);

    res.status(201).json(presence);
  } catch (err) {
    next(err);
  }
};
