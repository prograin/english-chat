import {
  createPresenceRepository,
  getPresenceByUserIdRepository,
  bulkUpdatePresenceRepository,
} from "../repositories/presence.repository.js";
import { responsePresencesSchema } from "../schemas/presence.schema.js";
import { validateSchemaUtil } from "../utils/validate.util.js";

// Create Presence
export const createPresenceService = async (data) => {
  try {
    const existing = await getPresenceByUserIdRepository(data.user_id);
    if (existing) {
      const error = new Error("Presence already exists for this user");
      error.statusCode = 409;
      throw error;
    }

    const presence = await createPresenceRepository(data);
    const value = await validateSchemaUtil(responsePresencesSchema, presence.toJSON(), false, true);

    return value;
  } catch (error) {
    console.error("Failed to create user presence data:", error);
    throw error;
  }
};

// Update Presences
export const bulkUpdatePresenceService = async (data) => {
  try {
    await bulkUpdatePresenceRepository(data);
  } catch (error) {
    throw error;
  }
};
