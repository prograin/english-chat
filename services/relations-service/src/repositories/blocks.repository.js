import BlocksModel from "../models/blocks.model.js";

export async function createBlock(userId, targetId) {
  return await BlocksModel.create({
    user_id: userId,
    block_user_id: targetId,
  });
}

export async function getUserBlocks(userId) {
  return await contactsModel.findAll({
    where: {
      user_id: userId,
    },
    attributes: ["id", "block_user_id", "createdAt"],
    order: [["createdAt", "DESC"]],
  });
}

export async function getBlock(userId, targetId) {
  return await BlocksModel.findOne({
    where: {
      user_id: userId,
      block_user_id: targetId,
    },
  });
}

export async function deleteBlock(userId, targetId) {
  return await BlocksModel.destroy({
    where: {
      user_id: userId,
      block_user_id: Number(targetId),
    },
  });
}
