import BlocksModel from "../models/blocks.model.js";

export async function createBlock(userId, targetId) {
  return await BlocksModel.create({
    user_id: userId,
    block_user_id: targetId,
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
