import presenceModel from "../models/presence.model.js";
import { cleanUndefinedFields } from "../utils/clean-data.util.js";

// Create Presence
export const createPresenceRepository = async (data) => {
  const clean_data = cleanUndefinedFields(data);
  const presence = await presenceModel.create(clean_data);
  console.log(`Successfully presence for ${presence.user_id} was created:`);
  return presence;
};

// Update Multi Presence
export const bulkUpdatePresenceRepository = async (data) => {
  const update_promises = data.map((item) => {
    const clean_data = cleanUndefinedFields(item);
    return presenceModel.update(clean_data, { where: { user_id: clean_data.user_id } });
  });

  await Promise.all(update_promises);
  console.log("Bulk update completed for presences.");
};

// get Presence
export const getPresenceByUserIdRepository = (user_id) => {
  return presenceModel.findOne({ where: { user_id: user_id } });
};
