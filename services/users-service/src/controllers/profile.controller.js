import {
  createProfileService,
  deleteProfileByUserIdService,
  getProfileByUserIdService,
  updateProfileByUserIdService,
  getProfilesByUserIdsService,
  getProfileByUsernameService,
} from "../services/profile.service.js";

export const createProfileByUserIdController = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const body = req.validatedBody;
    body.id = userId;

    const profile = await createProfileService(body);

    res.status(201).json({ profile: profile });
  } catch (error) {
    next(error);
  }
};

export const getMyProfileController = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const profile = await getProfileByUserIdService(userId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile: profile });
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

export const getProfileByUserIdController = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const profile = await getProfileByUserIdService(userId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile: profile });
  } catch (error) {
    next(error);
  }
};

export const getProfilesByUserIdsController = async (req, res, next) => {
  try {
    const userIds = req.query.userIds;

    if (!userIds) {
      return res.status(400).json({ message: "userIds query parameter is required" });
    }

    const idsArray = userIds.split(",").map((id) => Number(id.trim()));
    if (idsArray.some(isNaN)) {
      return res.status(400).json({ message: "All userIds must be valid numbers" });
    }

    const profiles = await getProfilesByUserIdsService(idsArray);

    return res.json(profiles);
  } catch (err) {
    next(err);
  }
};

export const getProfileByUsernameController = async (req, res, next) => {
  try {
    const username = req.params.username;
    const profile = await getProfileByUsernameService(username);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfileController = async (req, res, next) => {
  try {
    const body = req.validatedBody;
    const userId = req.user.user_id;
    const profile = await updateProfileByUserIdService(userId, body);
    await res.status(200).json({ status: "success", profile });
  } catch (error) {
    next(error);
  }
};

export const deleteProfileByUserIdController = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      return res.status(400).json({ message: "User id has not been defined" });
    }

    await deleteProfileByUserIdService(userId);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};
