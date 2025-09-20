import ProfileModel from "../models/profile.model.js";

/**
 * Creates a new user profile.
 * @param {object} data - The profile data to create.
 * @param {object} [options] - Optional Sequelize options (e.g., transaction).
 * @returns {Promise<ProfileModel>} The created profile instance.
 */
export const createProfile = async (data, options = {}) => {
  return await ProfileModel.create(data, options);
};

/**
 * Retrieves a user profile by user ID.
 * @param {number} user_id - The ID of the user.
 * @param {object} [options] - Optional Sequelize options (e.g., transaction).
 * @returns {Promise<ProfileModel|null>} The found profile instance or null.
 */
export const getProfileByUserId = async (user_id, options = {}) => {
  return await ProfileModel.findOne({
    where: { user_id },
    ...options,
  });
};

/**
 * Deletes a user profile by user ID.
 * @param {number} user_id - The ID of the user whose profile should be deleted.
 * @param {object} [options] - Optional Sequelize options (e.g., transaction).
 * @returns {Promise<number>} The number of deleted rows.
 */
export const deleteProfileByUserId = async (user_id, options = {}) => {
  return await ProfileModel.destroy({
    where: { user_id },
    ...options,
  });
};
