import { createProfile, deleteProfileByUserId, getProfileByUserId } from "../repositories/profile.repository.js";
import validateUtil from "../utils/validate.util.js";
import { responseProfileSchema } from "../schemas/profile.schema.js";

/**
 * Creates a new profile if one does not already exist for the user.
 * @param {object} data Profile fields, must include user_id.
 * @param {object} options For passing some option like transaction
 * @returns {Promise<object>} The created profile instance.
 * @throws {Error} 409 if a profile already exists.
 */
export const createProfileService = async (data, options = {}) => {
  const existing = await getProfileByUserId(data.user_id, options);

  if (existing) {
    const error = new Error("Profile already exists");
    error.status = 409;
    throw error;
  }

  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });

  const profile = await createProfile(data);
  return validateUtil(responseProfileSchema, profile.toJSON());
};

/**
 * retrieve a profile by user_id
 * @param {number} user_id
 * @param {Object} options
 * @returns {Promise<Object>}
 */
export const getProfileByUserIdService = async (user_id, options = {}) => {
  const profile = await getProfileByUserId(user_id, options);
  if (!profile) return null;
  return validateUtil(responseProfileSchema, profile.toJSON());
};

/**
 * retrieve a profile by user_id
 * @param {number} user_id
 * @param {Object} options
 * @returns {Promise<Number>}
 */
export const deleteProfileByUserIdService = async (user_id, options = {}) => {
  return await deleteProfileByUserId(user_id, options);
};
