import {
  createContactService,
  deleteContactByTargetIdService,
  checkContactByTargetIdService,
  getUserContactsService,
} from "../services/contacts.service.js";

export async function createContactController(req, res, next) {
  try {
    const requesterId = req.params.user_id || req.user?.user_id;
    const targetId = req.body.targetId;

    const newContact = await createContactService(requesterId, targetId);
    return res.status(201).json({
      message: "Contact created successfully",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserContactsController(req, res, next) {
  try {
    const userId = req.params.user_id || req.user?.user_id;

    const contacts = await getUserContactsService(userId);
    return res.status(200).json({
      message: "Contacts fetched successfully",
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteContactByTargetIdController(req, res, next) {
  try {
    const requesterId = req.params.user_id || req.user?.user_id;
    const targetId = req.params.targetId;

    await deleteContactByTargetIdService(requesterId, targetId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function checkContactByTargetIdController(req, res, next) {
  try {
    const requesterId = req.params.user_id || req.user?.user_id;
    const targetId = req.params.targetId;

    const isContact = await checkContactByTargetIdService(requesterId, targetId);

    return res.status(200).json({
      isContact: isContact,
      message: isContact ? "User is a contact" : "User is not a contact",
    });
  } catch (error) {
    next(error);
  }
}
