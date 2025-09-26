import {
  createProfileService,
  deleteProfileByUserIdService,
  getProfileByUserIdService,
  updateProfileByUserIdService,
} from "../services/profile.service.js";

export const createProfileController = async (req, res, next) => {
  try {
    const body = req.validatedBody;
    const profile = await createProfileService(body);

    res.status(201).json({ profile: profile });
  } catch (error) {
    next(error);
  }
};

export const getProfileController = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const profile = await getProfileByUserIdService(user_id);

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
    const user_id = Number(req.params.user_id);
    const profile = await getProfileByUserIdService(user_id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile: profile });
  } catch (error) {
    next(error);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    const body = req.validatedBody;
    const user_id = req.user.user_id;
    const profile = await updateProfileByUserIdService(user_id, body);
    await res.status(200).json({ status: "success", profile });
  } catch (error) {
    next(error);
  }
};

export const deleteProfileByUserIdController = async (req, res, next) => {
  try {
    const user_id = Number(req.query.user_id);
    if (!user_id) {
      return res.status(400).json({ message: "User id has not been defined" });
    }

    await deleteProfileByUserIdService(user_id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};
