import { ErrorUtil } from "../utils/error.util.js";
import { createContact, getContact, deleteContact } from "../repositories/contacts.repository.js";
import contactsCache from "../cache/contacts.cache.js";
/**
 * Create a new Contact relationship
 */
export async function createContactService(requesterId, targetId) {
  if (!requesterId || !targetId) {
    throw new ErrorUtil("Missing user or target ID", 400);
  }

  if (requesterId === targetId) {
    throw new ErrorUtil("You cannot add yourself to contact", 400);
  }

  const existing = await getContact(requesterId, targetId);
  if (existing) {
    throw new ErrorUtil("User is already added to contact", 409);
  }

  const newContact = await createContact(requesterId, targetId);
  await contactsCache.setContact(requesterId, targetId, true);
  return newContact;
}

/**
 * Remove a Contact relationship
 */
export async function deleteContactByTargetIdService(requesterId, targetId) {
  if (!requesterId || !targetId) {
    throw new ErrorUtil("Missing user or target ID", 400);
  }

  if (requesterId === targetId) {
    throw new ErrorUtil("You cannot removed yourself from contact", 400);
  }

  const existing = await getContact(requesterId, targetId);
  if (!existing) {
    throw new ErrorUtil("Contact record not found", 404);
  }

  await deleteContact(requesterId, targetId);
  await contactsCache.setContact(requesterId, targetId, false);
  return true;
}

/**
 * Check if a user has blocked another
 */
export async function checkContactByTargetIdService(requesterId, targetId) {
  if (!requesterId || !targetId) {
    throw new ErrorUtil("Missing user or target ID", 400);
  }

  const cached = await contactsCache.getContact(requesterId, targetId);
  if (cached !== null) return cached;

  const existing = await getContact(requesterId, targetId);
  await contactsCache.setContact(requesterId, targetId, !!existing);
  return !!existing;
}
