import RequestsModel from "../models/requests.model.js";

export const createRequest = async (sender_user_id, reciever_user_id) => {
  const request = await RequestsModel.create({
    sender_user_id,
    reciever_user_id,
    status: "pending",
  });

  return request;
};

export const updateRequestStatus = async (sender_user_id, reciever_user_id, status) => {
  const [affectedCount, updatedRows] = await RequestsModel.update(
    { status },
    {
      returning: true,
      where: {
        sender_user_id,
        reciever_user_id,
      },
    }
  );
  return updatedRows[0] || null;
};

export const getRequestByTarget = async (sender_user_id, reciever_user_id) => {
  return await RequestsModel.findOne({
    where: {
      sender_user_id,
      reciever_user_id,
    },
  });
};

export const getRequestsBySenderId = async (sender_user_id) => {
  return await RequestsModel.findAll({
    where: {
      sender_user_id,
    },
  });
};
