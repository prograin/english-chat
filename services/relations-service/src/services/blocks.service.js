import { ErrorUtil } from "../utils/error.util.js";
import { createBlock, getBlock, deleteBlock, getUserBlocks } from "../repositories/blocks.repository.js";
import blocksCache from "../cache/blocks.cache.js";

/**
 * Create a new block relationship
 */
export async function createBlockService(requesterId, targetId) {
  if (!requesterId || !targetId) {
    throw new ErrorUtil("Missing user or target ID", 400);
  }

  if (requesterId == targetId) {
    throw new ErrorUtil("You cannot block yourself", 400);
  }

  const existing = await getBlock(requesterId, targetId);
  if (existing) {
    throw new ErrorUtil("User is already blocked", 409);
  }

  const newBlock = await createBlock(requesterId, targetId);
  await blocksCache.setBlock(requesterId, targetId, true);
  return newBlock;
}

/**
 * Get all user contacts
 */
export async function getUserBlocksService(userId) {
  if (!userId) {
    throw new ErrorUtil("Missing user ID", 400);
  }

  return await getUserBlocks(userId);
}

/**
 * Remove a block relationship
 */
export async function deleteBlockByTargetIdService(requesterId, targetId) {
  if (!requesterId || !targetId) {
    throw new ErrorUtil("Missing user or target ID", 400);
  }

  if (requesterId == targetId) {
    throw new ErrorUtil("You cannot unblock yourself", 400);
  }

  const existing = await getBlock(requesterId, targetId);
  if (!existing) {
    throw new ErrorUtil("Block record not found", 404);
  }

  await deleteBlock(requesterId, targetId);
  await blocksCache.setBlock(requesterId, targetId, false);
  return true;
}

/**
 * Check if a user has blocked another
 */
export async function checkBlockByTargetIdService(requesterId, targetId) {
  if (!requesterId || !targetId) {
    throw new ErrorUtil("Missing user or target ID", 400);
  }

  const cached = await blocksCache.getBlock(requesterId, targetId);
  if (cached !== null) return cached;

  const existing = await getBlock(requesterId, targetId);
  await blocksCache.setBlock(requesterId, targetId, !!existing);
  return !!existing;
}
