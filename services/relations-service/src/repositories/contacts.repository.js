import contactsModel from "../models/contacts.model.js";

export async function createContact(userId, contactId) {
  await contactsModel.create({
    user_id: userId,
    contact_user_id: contactId,
  });
}

export async function getUserContacts(userId) {
  return await contactsModel.findAll({
    where: {
      user_id: userId,
    },
    attributes: ["id", "contact_user_id", "createdAt"],
    order: [["createdAt", "DESC"]],
  });
}

export async function getContact(userId, contactId) {
  return await contactsModel.findOne({
    where: {
      user_id: userId,
      contact_user_id: contactId,
    },
  });
}

export async function deleteContact(userId, contactId) {
  return contactsModel.destroy({
    where: {
      user_id: userId,
      contact_user_id: contactId,
    },
  });
}
