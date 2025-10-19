import redis from "../config/redis.js";
import { PREFIX_KEY } from "../../../../shared/constants/redis.js";

class ContactsCache {
  CONTACT_TTL = 60;

  async setContact(userId, targetId, value = true) {
    try {
      const key = PREFIX_KEY.relations.contacts.key(userId, targetId);
      const stringValue = value ? "1" : "0";
      await redis.set(key, stringValue, "EX", this.CONTACT_TTL);
    } catch (error) {
      console.error(`[ContactsCache] Error setting contact cache:`, error);
    }
  }

  async getContact(userId, targetId) {
    try {
      const key = PREFIX_KEY.relations.contacts.key(userId, targetId);
      const cached = await redis.get(key);

      if (cached === null) return null;

      await redis.expire(key, this.CONTACT_TTL);

      return cached === "1";
    } catch (error) {
      console.error(`[ContactsCache] Error fetching contact from cache:`, error);
      return null;
    }
  }

  async deleteContact(userId, targetId) {
    try {
      const key = PREFIX_KEY.relations.contacts.key(userId, targetId);
      await redis.del(key);
    } catch (error) {
      console.error(`[ContactsCache] Error deleting contact cache:`, error);
    }
  }
}

export default new ContactsCache();
