import presenceModel from "../models/presence.model.js";
import { cleanUndefinedFields } from "../utils/clean-data.util.js";

/**
 * Create a new presence record.
 * @param {Object} data - Presence data.
 * @param {number} data.user_id - ID of the user.
 * @param {boolean} [data.is_online] - Optional online status.
 * @param {Date|string} [data.last_active] - Optional last active timestamp.
 * @returns {Promise<Object>} The created presence instance.
 */
export const createPresenceRepository = async (data) => {
  const clean_data = cleanUndefinedFields(data);
  const presence = await presenceModel.create(clean_data);
  console.log(`Successfully presence for ${presence.user_id} was created:`);
  return presence;
};

/**
 * Bulk update multiple presence records.
 * @param {Array<Object>} data - Array of presence objects to update.
 * @returns {Promise<void>} Resolves when all updates are completed.
 */
export const bulkUpdatePresenceRepository = async (data) => {
  const update_promises = data.map((item) => {
    const clean_data = cleanUndefinedFields(item);
    return presenceModel.update(clean_data, { where: { user_id: clean_data.user_id } });
  });

  await Promise.all(update_promises);
  console.log("Bulk update completed for presences.");
};

/**
 * Retrieve a presence record by user ID.
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<Object|null>} The presence instance if found, otherwise null.
 */
export const getPresenceByUserIdRepository = async (user_id) => {
  return await presenceModel.findOne({ where: { user_id: user_id } });
};

/**
 * Delete a presence record by user ID.
 * @param {number} user_id - The ID of the user whose presence should be deleted.
 * @returns {Promise<number>} The number of rows deleted (0 if not found, 1 if deleted).
 */
export const deletePresenceByUserIdRepository = async (user_id) => {
  return await presenceModel.destroy({ where: { user_id } });
};
