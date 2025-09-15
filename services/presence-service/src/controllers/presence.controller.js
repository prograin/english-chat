import {
  createPresenceService,
  getPresenceByUserIdService,
  deletePresenceByUserIdService,
} from "../services/presence.service.js";

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
    const user_id = Number(req.query.user_id);

    if (user_id) {
      const presence = await getPresenceByUserIdService(user_id);
      if (!presence) return res.status(404).json({ message: "Presence not found" });
    } else {
      return res.status(400).json({ message: "(user_id) is required" });
    }

    res.status(200).json({ data: presence });
  } catch (err) {
    next(err);
  }
};

export const deletePresenceByUserIdController = async (req, res, next) => {
  try {
    const user_id = Number(req.query.user_id);

    if (!user_id) {
      return res.status(400).json({ message: "user_id is required" });
    }

    await deletePresenceByUserIdService(user_id);

    res.status(200).json({ message: `Presence with ${user_id} has been deleted` });
  } catch (error) {
    next(error);
  }
};
