import requestsCache from "../cache/requests.cache.js";
import { ErrorUtil } from "../utils/error.util.js";
import { getRequestByTarget, updateRequestStatus, createRequest, getRequestsBySenderId } from "../repositories/requests.repository.js";

export const createOrUpdateService = async (sender_user_id, reciever_user_id, status) => {
  let request;
  const existing = await getRequestByTarget(sender_user_id, reciever_user_id);
  if (existing) {
    request = await updateRequestStatus(sender_user_id, reciever_user_id, status);
  } else {
    request = await createRequest(sender_user_id, reciever_user_id, status);
  }
  await requestsCache.addNewRequest(sender_user_id, reciever_user_id, request.toJSON());
};

export const getRequestByTargetService = async (userId, targetId) => {
  let request;

  request = await requestsCache.getRequestByTarget(userId, targetId);
  if (!request) {
    request = await getRequestByTarget(userId, targetId);
    request = request ? request.toJSON() : null;
  }

  return request || null;
};

export const getRequestsBySenderIdService = async (senderId) => {
  const requests = await getRequestsBySenderId(senderId);
  if (!requests || requests.length == 0) {
    throw new ErrorUtil("No requests found", 404);
  }
  return requests;
}; // return list, we have to set another cahce
