import { createBlockService, deleteBlockByTargetIdService, checkBlockByTargetIdService } from "../services/blocks.service.js";

/**
 * POST /users/:userId/relations/blocks
 * POST /relations/blocks/:targetId
 */
export async function createBlockController(req, res, next) {
  try {
    const requesterId = req.params.user_id || req.user?.user_id;
    const targetId = req.body.targetId;

    const newBlock = await createBlockService(requesterId, targetId);
    return res.status(201).json({
      message: "Block created successfully",
      data: newBlock,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /users/:userId/relations/blocks/:targetId
 * DELETE /relations/blocks/:targetId
 */
export async function deleteBlockByTargetIdController(req, res, next) {
  try {
    const requesterId = req.params.user_id || req.user?.user_id;
    const targetId = req.params.targetId;

    await deleteBlockByTargetIdService(requesterId, targetId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

/**
 * GET /users/:userId/relations/blocks/:targetId/check
 * GET /relations/blocks/:targetId/check
 */
export async function checkBlockByTargetIdController(req, res, next) {
  try {
    const requesterId = req.params.user_id || req.user?.user_id;
    const targetId = req.params.targetId;

    const isBlocked = await checkBlockByTargetIdService(requesterId, targetId);

    return res.status(200).json({
      blocked: isBlocked,
      message: isBlocked ? "User is blocked" : "User is not blocked",
    });
  } catch (error) {
    next(error);
  }
}
