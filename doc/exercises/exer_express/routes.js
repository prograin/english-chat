import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { allowRole } from "../../middlewares/role.middleware.js";
import commentsRouter from "../comments/comments.routes.js";

const router = Router();

router.get("/", authMiddleware); // Get all posts
router.get("/:id", authMiddleware); // Get single post
router.post("/", authMiddleware, allowRole(["admin", "author"]));
router.put("/:id", authMiddleware, allowRole(["admin", "author"]));
router.delete("/:id", authMiddleware, allowRole(["admin"]));

// Mount nested comments router under /:postId/comments
router.use(
  "/:postId/comments",
  (req, res, next) => {
    req.postId = req.params.postId; // Pass postId to nested router
    next();
  },
  commentsRouter
);

export default router;

// ---------------------------------

import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router({ mergeParams: true }); // Important for nested params

router.get("/", authMiddleware);                // Get all comments for a post
router.get("/:id", authMiddleware);            // Get single comment
router.post("/", authMiddleware);              // Create comment
router.put("/:id", authMiddleware);            // Update comment
router.delete("/:id", authMiddleware);         // Delete comment

export default router;

// ---------------------------------

import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import postsRouter from "../posts/posts.routes.js";

const router = Router();

router.get("/", authMiddleware);
router.get("/:id", authMiddleware);
router.post("/", authMiddleware);

// Mount nested posts router under /:userId/posts
router.use("/:userId/posts", (req, res, next) => {
  req.userId = req.params.userId; // Pass userId to nested router
  next();
}, postsRouter);

export default router;